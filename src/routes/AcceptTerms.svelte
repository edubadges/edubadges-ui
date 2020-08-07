<script>
  import {onMount} from "svelte";
  import * as jwt_decode from "jwt-decode";
  import {config} from "../util/config";
  import info from "../icons/informational.svg";
  import {Button, Spinner} from "../components";
  import I18n from "i18n-js";
  import Cookies from "js-cookie";
  import ToggleSwitch from "../components/ToggleSwitch.svelte";
  import ModalTerms from "../components/forms/FancyMarkdownModalTermsViewer.svelte";
  import {userRole} from "../stores/user";
  import {role as roleConstants} from "../util/role";
  import {eduTermsDetail, validateInstitutions} from "../api";
  import Modal from "../components/forms/Modal.svelte";
  import termsIcon from "../icons/voorwaarden-icon1.svg"
  import terms2Icon from "../icons/voorwaarden-icon2.svg"
  import {schacHomeNames} from "../util/claims";

  let idToken;
  let state;
  let claims;
  let provider;
  let reSign = false;
  let role;
  let loaded = false;
  let showModalTerms = false;
  let termsUrl;
  let termsTitle;

  let primaryTerms;
  let secondaryTerms;

  let validInstitutions = [];
  let noValidInstitution = false;
  let allValidInstitutions = [];
  let homeInstitution = {};
  let schacHomeOrganisations = [];

  let choosenSchacHome;

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    idToken = urlParams.get("id_token");
    state = urlParams.get("state");
    provider = urlParams.get("provider");
    reSign = urlParams.get("re_sign") === "True";
    role = urlParams.get("role");
    claims = jwt_decode(idToken);
    $userRole = role;
    schacHomeOrganisations = $userRole === roleConstants.STUDENT ? schacHomeNames(claims) : [claims.schac_home_organization];
    validateInstitutions(schacHomeOrganisations)
      .then(res => {
        let validSchacHomeOrganisations = schacHomeOrganisations
          .filter(orgName => res.find(validatedOrg => validatedOrg.schac_home === orgName && validatedOrg.valid));
        if (validSchacHomeOrganisations.length === 0) {
          noValidInstitution = true;
          loaded = true;
        } else {
          loaded = true;
          eduTermsDetail($userRole).then(res => {
            primaryTerms = res.find(({terms_type}) => terms_type === "terms_of_service").terms_urls.find(({language}) => language === (Cookies.get("lang") ? Cookies.get("lang") : "en")).url;
            secondaryTerms = res.find(({terms_type}) => terms_type === ($userRole === roleConstants.STUDENT ? "service_agreement_student" : "service_agreement_employee")).terms_urls.find(({language}) => language === (Cookies.get("lang") ? Cookies.get("lang") : "en")).url;
          })
        }
      });
  });

  const agree = () => {
    window.location.href = `${config.serverUrl}/account/${provider}/login/terms_accepted/${encodeURIComponent(state)}/${idToken}/`;
  };

  const showTerms = (title, url) => () => {
    showModalTerms = true;
    termsUrl = url;
    termsTitle = title;
  };

  const closeTerms = () => showModalTerms = false;

  const logInForceAuthn = () => {
    window.location.href = config.eduId
  };
</script>

<style lang="scss">
  .page-container {
    display: flex;
    flex: 1;
  }

  .content {
    padding: 40px;
  }

  h3 {
    color: var(--grey-9);
    font-size: 22px;
    margin: 35px 0 20px 0;
  }

  p.terms {
    margin: 25px 0;
  }

  ul {
    list-style: circle;
    margin-left: 30px;
  }

  @media (max-width: 820px) {
    .content {
      width: 100%;
    }
  }

  div.agree {
    display: flex;
    align-content: center;
    align-items: center;
    margin: 12px 0;
    padding: 12px;
    background-color: var(--grey-1);
    border-radius: 8px;

    p {
      margin-left: 25px;

      a {
        text-decoration: underline;
      }
    }
  }

  div.actions {
    margin-top: 20px;
    display: inline-block;
    width: 100%;
  }
</style>

<div class="page-container">
  <p class="content">
  {#if loaded}
    {#if !noValidInstitution}
      <h1>{I18n.t("acceptTerms.welcome", {name: claims.given_name + claims.family_name})}</h1>
      <h3>{reSign ? I18n.t("acceptTerms.renewTerms"): I18n.t("acceptTerms.acceptTerms")}</h3>
      <p class="terms">{I18n.translations[I18n.locale].acceptTerms[$userRole].termsInfo}</p>
      <ul>
        {#each I18n.translations[I18n.locale].acceptTerms.termsBullets[$userRole] as bullet}
          <li>{bullet}</li>
        {/each}
      </ul>
      <div class="agree">
        {@html termsIcon}
        <p>
          <span>{I18n.t(`acceptTerms.${$userRole}.serviceAgreementLinkPre`)}</span>
          <a href="/terms"
             on:click|preventDefault|stopPropagation={showTerms(
                  I18n.t(`acceptTerms.${$userRole}.serviceAgreementTitle`),
                  primaryTerms)}>
            {I18n.t(`acceptTerms.${$userRole}.serviceAgreementLink`)}
          </a>
          <span>{I18n.t(`acceptTerms.${$userRole}.serviceAgreementLinkPost`)}</span>
        </p>
      </div>
      <div class="agree">
        {@html terms2Icon}
        <p>
          <span>{I18n.t(`acceptTerms.${$userRole}.termsLinkPre`)}</span>
          <a href="/terms"
             on:click|preventDefault|stopPropagation={showTerms(
                  I18n.t(`acceptTerms.${$userRole}.termsTitle`),
                  secondaryTerms)}>
            {I18n.t(`acceptTerms.${$userRole}.termsLink`)}
          </a>
          <span>{I18n.t(`acceptTerms.${$userRole}.termsLinkPost`)}</span>
          <span>{I18n.t(`acceptTerms.${$userRole}.privacyLinkPre`)}</span>
          <a href="/terms"
             on:click|preventDefault|stopPropagation={showTerms(
                  I18n.t(`acceptTerms.${$userRole}.privacyTitle`),
                  I18n.t(`terms.${$userRole}.privacyPolicyRaw`))}>
            {I18n.t(`acceptTerms.${$userRole}.privacyLink`)}
          </a>
          <span>{I18n.t(`acceptTerms.${$userRole}.privacyLinkPost`)}</span>
        </p>
      </div>
      <div class="actions">
        <Button text={I18n.t(`acceptTerms.${$userRole}.accept`)} action={agree} full={true}/>
      </div>
    {/if}
  {:else}
    <Spinner/>
  {/if}
</div>


{#if showModalTerms}
  <ModalTerms
      title={termsTitle}
      submit={closeTerms}
      cancel={closeTerms}
      url={termsUrl}/>
{/if}

{#if noValidInstitution}
  <Modal
      submit={logInForceAuthn}
      title={I18n.t("acceptTerms.noValidInstitution")}
      question={schacHomeOrganisations[0] ? role === roleConstants.STUDENT ? I18n.t("acceptTerms.noValidInstitutionInfo.student", {name: schacHomeOrganisations[0]}) : I18n.t("acceptTerms.noValidInstitutionInfo.teacher", {name: schacHomeOrganisations[0]}) : I18n.t("acceptTerms.noValidInstitutionInfoNoInstitution")}
      submitLabel={I18n.t("acceptTerms.goToSurfConext")}/>
{/if}
