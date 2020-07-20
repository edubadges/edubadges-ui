<script>
  import {onMount} from "svelte";
  import * as jwt_decode from "jwt-decode";
  import {config} from "../util/config";
  import info from "../icons/informational.svg";
  import {Button, Spinner} from "../components";
  import I18n from "i18n-js";
  import ToggleSwitch from "../components/ToggleSwitch.svelte";
  import ModalTerms from "../components/forms/FancyMarkdownModalTermsViewer.svelte";
  import {userRole} from "../stores/user";
  import {role as roleConstants} from "../util/role";
  import {institutionDetail, requestLoginToken, validateInstitutions} from "../api";
  import Modal from "../components/forms/Modal.svelte";
  import {getService} from "../util/getService";
  import RadioButton from "../components/forms/RadioButton.svelte";

  let idToken;
  let state;
  let claims;
  let provider;
  let resign = false;
  let role;
  let loaded = false;
  let termsOfUseAccepted = false;
  let badgeAwardTermsAccepted = false;
  let showModalTerms = false;
  let termsUrl;
  let termsTitle;
  let whichTerms;

  let validInstitutions = [];
  let noValidInstitution = false;
  let multipleValidInstitutions = false;
  let allValidInstitutions = [];
  let homeInstitution = {};
  let schacHomeOrganisations = [];

  let choosenSchacHome;

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    idToken = urlParams.get("id_token");
    state = urlParams.get("state");
    provider = urlParams.get("provider");
    resign = urlParams.get("resign") === "True";
    role = urlParams.get("role");
    claims = jwt_decode(idToken);

    schacHomeOrganisations = claims.eduperson_scoped_affiliation.map(aff => aff.substring(aff.indexOf("@") + 1));
    validateInstitutions(schacHomeOrganisations)
      .then(res => {
        let validSchacHomeOrganisations = schacHomeOrganisations
          .filter(orgName => res.find(validatedOrg => validatedOrg.schac_home_organisation === orgName && validatedOrg.valid));
        if (validSchacHomeOrganisations.length === 0) {
          noValidInstitution = true;
          loaded = true;
        } else if (validSchacHomeOrganisations.length > 1) {
          Promise.all(validSchacHomeOrganisations.map(orgName => institutionDetail(orgName)))
            .then(results => {
              allValidInstitutions = results;
              multipleValidInstitutions = true;
              choosenSchacHome = allValidInstitutions[0].name;
              loaded = true;
            });
        } else {
          institutionDetail(validSchacHomeOrganisations[0])
            .then(res => {
              homeInstitution = res;
              loaded = true;
            });
        }
      });
  });

  const agree = () => {
    window.location.href = `${config.serverUrl}/account/${provider}/login/terms_accepted/${encodeURIComponent(state)}/${idToken}/`;
  }

  const showTerms = (title, url, whichTermsToAgree) => () => {
    showModalTerms = true;
    termsUrl = url;
    termsTitle = title;
    whichTerms = whichTermsToAgree
  };

  const agreeWithTerms = value => () => {
    showModalTerms = false;
    if (whichTerms === "termsOfUseAccepted") {
      termsOfUseAccepted = value;
    } else {
      badgeAwardTermsAccepted = value;
    }
  }

  const logInForceAuthn = () => {
    const service = getService($userRole);
    debugger;
    requestLoginToken(service, true);
  };

  const refreshInstitution = () => {
    homeInstitution = allValidInstitutions.filter(institution => institution.identifier === choosenSchacHome);
    multipleValidInstitutions = false;
  }

</script>

<style lang="scss">
  .page-container {
    display: flex;
    flex: 1;
  }

  .content {
    flex: 1;
    padding: 40px;
  }

  div.info {
    display: flex;
    align-items: center;
    width: 50%;
    background-color: var(--blue-light);
    padding: 15px 25px;
    margin: 25px 0;
    border-radius: 8px;
    line-height: 18px;

    span:first-child {
      margin-right: 15px;
    }

    span:last-child {
      line-height: 20px;
    }
  }

  h1.edubadges {
    color: var(--grey-8);
  }

  p.terms {
    margin: 25px 0;
  }

  :global(p.terms a) {
    color: var(--blue-link);
    text-decoration: underline;
  }

  div.agree {
    display: flex;
    align-items: center;
    width: 50%;
    background-color: var(--grey-3);
    padding: 15px 25px;
    margin: 25px 0;
    border-radius: 8px;

    span:first-child {
      margin-right: 15px;
      color: var(--purple);
    }

    .toggle {
      margin-left: auto;
    }
  }

  @media (max-width: 820px) {
    div.agree {
      width: 100%;
    }
    div.info {
      width: 100%;
    }
  }

  div.actions {
    margin-top: 20px;
    display: inline-block;
    width: 100%;
  }

  div.slots {
    display: flex;
    flex-direction: column;

    div.institution-chooser {
      padding: 0 0 20px 15px;
    }
  }


</style>

<div class="page-container">
  <p class="content">
  {#if loaded}
    <h1>{I18n.t("acceptTerms.welcome", {name: claims.preferred_username})}</h1>
      <h3>{resign ? I18n.t("acceptTerms.renewTerms"): I18n.t("acceptTerms.acceptTerms")}</h3>
<ul>
  {#each I18n.translations[I18n.locale].acceptTerms[$userRole].termsBullets as bullet}
    <li>{bullet}</li>
  {/each}
</ul>
    <h1 class="edubadges">{I18n.t("acceptTerms.eduBadges", {name: claims.preferred_username})}</h1>
    <p class="terms">
      <span>{I18n.t("acceptTerms.termsPre")}</span>
      <a href="/terms"
         on:click|preventDefault|stopPropagation={showTerms(
                I18n.t("acceptTerms.termsTitle"),
                $userRole === roleConstants.STUDENT ? I18n.t('terms.termsOfUseStudentRaw') : I18n.t('terms.termsOfUseTeacherRaw'),
                "termsOfUseAccepted")}>
        {I18n.t("acceptTerms.termsOfUseLink")}
      </a>
    </p>
    <div class="agree">
      <span>{I18n.t("acceptTerms.acceptTermsOfUse")}</span>
      <div class="toggle">
        <ToggleSwitch disabled={false} value={termsOfUseAccepted}
                      onChange={() => termsOfUseAccepted = !termsOfUseAccepted}/>
      </div>

    </div>
    <p class="terms">
      <span>{I18n.t("acceptTerms.termsPre")}</span>
      <a href="/terms"
         on:click|preventDefault|stopPropagation={showTerms(
                I18n.t("acceptTerms.badgeAwardTitle"),
                I18n.t('terms.badgeAwardTermsRaw'),
                "badgeAwardTermsAccepted")}>
        {I18n.t("acceptTerms.badgeAwardTerms")}
      </a>
      <span>{I18n.t("acceptTerms.badgeAwardTermsPost")}</span>
    </p>
    <div class="agree">
      <span>{I18n.t("acceptTerms.acceptBadgeAwardTerms")}</span>
      <div class="toggle">
        <ToggleSwitch disabled={false} value={badgeAwardTermsAccepted}
                      onChange={() => badgeAwardTermsAccepted = !badgeAwardTermsAccepted}/>
      </div>
    </div>
    <div class="actions">
      <Button text={I18n.t("acceptTerms.accept")} action={agree} full={true}
              disabled={!badgeAwardTermsAccepted || !termsOfUseAccepted}/>
    </div>
  {:else}
    <Spinner/>
  {/if}
</div>


{#if showModalTerms}
  <ModalTerms title={termsTitle}
              submit={agreeWithTerms(true)}
              cancel={agreeWithTerms(false)}
              url={termsUrl}>
  </ModalTerms>
{/if}

{#if noValidInstitution}
  <Modal submit={logInForceAuthn}
         title={I18n.t("acceptTerms.noValidInstitution")}
         question={I18n.t("acceptTerms.noValidInstitutionInfo", {name: schacHomeOrganisations[0]})}
         submitLabel={I18n.t("acceptTerms.goToSurfConext")}>
  </Modal>
{/if}

{#if multipleValidInstitutions}
  <Modal submit={refreshInstitution}
         title={I18n.t("acceptTerms.multipleValidInstitutions")}
         question={I18n.t("acceptTerms.multipleValidInstitutionsInfo")}>
    <div class="slots">
      {#each allValidInstitutions as institution}
        <div class="institution-chooser">
          <RadioButton bind:values={choosenSchacHome} label={institution.name} value={institution.identifier}/>
        </div>
      {/each}
    </div>
  </Modal>
{/if}
