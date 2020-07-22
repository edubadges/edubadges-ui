<script>
  import {onMount} from "svelte";
  import {Button, Spinner} from "../components";
  import I18n from "i18n-js";
  import ModalTerms from "../components/forms/FancyMarkdownModalTermsViewer.svelte";
  import {institutionDetail} from "../api";
  import termsIcon from "../icons/voorwaarden-icon1.svg";
  import terms2Icon from "../icons/voorwaarden-icon2.svg";
  import {fetchMarkdown} from "../api/markdown";

  export let userHasAgreed;
  export let userDisagreed;
  export let badgeClass;
  export let institution;

  let loaded = false;
  let showModalTerms = false;
  let termsUrl;
  let termsTitle;

  let excerptMarkDown;
  let statementRawUrl;

  onMount(() => {
    institutionDetail(badgeClass.issuer.faculty.institution.identifier)
      .then(res => {
        institution = res;
        statementRawUrl = institution[`${badgeClass.formal ? "formal" : "informal"}_edubadges_agreement_${I18n.locale}_url`];

        const excerptRawUrl = institution[`${badgeClass.formal ? "formal" : "informal"}_edubadges_excerpt_${I18n.locale}_url`];
        fetchMarkdown(excerptRawUrl).then(res => {
          excerptMarkDown = res;
          loaded = true;

        });
      })

  })

  const showTerms = (title, url) => () => {
    showModalTerms = true;
    termsUrl = url;
    termsTitle = title;
  };

  const closeTerms = () => showModalTerms = false;

</script>

<style lang="scss">
  .page-container {
    display: flex;
    flex: 1;
  }

  .content {
    padding: 40px;
    flex: 1;
  }
  div.header {
    display: flex;
    align-items: center;
    img {
      margin-left: auto;
    }
  }

  h3 {
    color: var(--grey-9);
    font-size: 22px;
    margin: 35px 0 20px 0;
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
    display: flex;
    width: 100%;
    div.cancel {
      margin-right: 25px;
    }
  }


</style>

<div class="page-container">
  <p class="content">
  {#if loaded}
    <div class="header">
    <h3>{badgeClass.informal ? I18n.t("acceptTerms.badgeClassEnrollmentTerms.inFormalBadges") :
    I18n.t("acceptTerms.badgeClassEnrollmentTerms.formalBadges")}</h3>
      <img width="100px" src={institution.logo_url} alt="Logo">
      </div>
    <div class="markdown-body">
      {@html excerptMarkDown}
    </div>
    <div class="agree">
      {@html termsIcon}
      <p>
        <span>{I18n.t(`acceptTerms.badgeClassEnrollmentTerms.statementLinkPre`)}</span>
        <a href="/terms"
           on:click|preventDefault|stopPropagation={showTerms(
                I18n.t(`acceptTerms.badgeClassEnrollmentTerms.statementTitle`),
                statementRawUrl)}>
          {I18n.t(`acceptTerms.badgeClassEnrollmentTerms.statementLink`)}
        </a>
        <span>{I18n.t(`acceptTerms.badgeClassEnrollmentTerms.statementLinkPost`)}</span>
      </p>
    </div>
    <div class="agree">
      {@html terms2Icon}
      <p>
        <span>{I18n.t(`acceptTerms.badgeClassEnrollmentTerms.privacyLinkPre`)}</span>
        <a href="/terms"
           on:click|preventDefault|stopPropagation={showTerms(
                I18n.t(`acceptTerms.badgeClassEnrollmentTerms.privacyTitle`),
                I18n.t(`terms.student.privacyPolicyRaw`))}>
          {I18n.t(`acceptTerms.badgeClassEnrollmentTerms.privacyLink`)}
        </a>
        <span>{I18n.t(`acceptTerms.badgeClassEnrollmentTerms.privacyLinkPost`)}</span>
      </p>
    </div>
    <div class="actions">
      <div class="cancel">
        <Button secondary={true} text={I18n.t(`modal.cancel`)} action={userDisagreed} />
      </div>
      <Button text={I18n.t(`acceptTerms.student.accept`)} action={userHasAgreed} />
    </div>
  {:else}
    <Spinner/>
  {/if}
</div>


{#if showModalTerms}
  <ModalTerms title={termsTitle}
              submit={closeTerms}
              cancel={closeTerms}
              url={termsUrl}>
  </ModalTerms>
{/if}
