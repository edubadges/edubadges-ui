<script>
    import {onMount} from "svelte";
    import {Button, Spinner} from "../components";
    import I18n from "i18n-js";
    import {ModalTerms} from "../components/forms";
    import termsIcon from "../icons/voorwaarden-icon1.svg";
    import {fetchMarkdown} from "../api/markdown";

    export let userHasAgreed;
    export let userDisagreed;
    export let badgeClass;

    let loaded = false;
    let showModalTerms = false;
    let termsUrl;
    let termsTitle;

    let excerptMarkDown;
    let statementRawUrl;

    onMount(() => {
        const currentLanguage = I18n.locale;
        let termsUrl = badgeClass.terms.termsUrl.find(({language}) => language.toLowerCase() === currentLanguage.toLowerCase());
        if (!termsUrl && badgeClass.terms.termsUrl.length > 0) {
            termsUrl = badgeClass.terms.termsUrl[0];
        }
        if (!termsUrl) {
            userHasAgreed();
            return;
        }
        const url = termsUrl.url;
        fetchMarkdown(url).then(res => {
            excerptMarkDown = res;
            loaded = true;
        });
    });

    const showTerms = (title, url) => () => {
        showModalTerms = true;
        termsUrl = url;
        termsTitle = title;
    };

    const closeTerms = () => showModalTerms = false;

    const setButtonText = badgeClass => {
        if (badgeClass.formal) {
            switch (badgeClass.issuer.faculty.institution.grondslagFormeel) {
                case "UITVOERING_OVEREENKOMST":
                    return I18n.t(`acceptTerms.student.accept`);
                case "GERECHTVAARDIGD_BELANG":
                    return I18n.t(`acceptTerms.student.read`);
                case "WETTELIJKE_VERPLICHTING":
                    return I18n.t(`acceptTerms.student.read`);
            }
        } else {
            switch (badgeClass.issuer.faculty.institution.grondslagInformeel) {
                case "UITVOERING_OVEREENKOMST":
                    return I18n.t(`acceptTerms.student.accept`);
                case "GERECHTVAARDIGD_BELANG":
                    return I18n.t(`acceptTerms.student.read`);
                case "WETTELIJKE_VERPLICHTING":
                    return I18n.t(`acceptTerms.student.read`);
            }
        }
    }
</script>

<style lang="scss">
  .page-container {
    display: flex;
    flex: 1;
    @media (max-width: 820px) {
      flex-direction: column;
    }

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

  div.actions {
    margin-top: 35px;
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
                <h3>{badgeClass.formal ? I18n.t("acceptTerms.badgeClassEnrollmentTerms.formalBadges") :
                    I18n.t("acceptTerms.badgeClassEnrollmentTerms.inFormalBadges")}</h3>
                <img width="100px" src={badgeClass.issuer.faculty.institution.image} alt="Logo">
            </div>
            <div class="markdown-body">
                {@html excerptMarkDown}
            </div>
            <div class="actions">
                <div class="cancel">
                    <Button secondary={true} text={I18n.t(`modal.cancel`)} action={userDisagreed}/>
                </div>
                <Button text={setButtonText(badgeClass)} action={userHasAgreed}/>
            </div>
        {:else}
            <Spinner/>
        {/if}
</div>


{#if showModalTerms}
    <ModalTerms
            title={termsTitle}
            cancel={closeTerms}
            url={termsUrl}/>
{/if}
