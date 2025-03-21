<script>
    import {onMount} from "svelte";
    import * as jwt_decode from "jwt-decode";
    import {config} from "../util/config";
    import I18n from "i18n-js";
    import {role as roleConstants} from "../util/role";
    import {requestLoginToken, validateInstitutions} from "../api";
    import {Modal, ModalTerms} from "../components/forms";
    import terms2Icon from "../icons/voorwaarden-icon2.svg"
    import Button from "../components/Button.svelte";
    import Spinner from "../components/Spinner.svelte";
    import DOMPurify from 'dompurify';
    import {authToken, redirectPath, userLoggedIn, userRole} from "../stores/user";
    import {getService} from "../util/getService";

    let idToken;
    let accessToken;
    let state;
    let claims;
    let provider;
    let reSign = false;
    let role;
    let loaded = false;
    let showModalTerms = false;
    let termsUrl;
    let termsTitle;
    let validatedName;

    let noValidInstitution = false;
    let schacHomeOrganisations = [];

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        idToken = urlParams.get("id_token");
        accessToken = urlParams.get("access_token");
        state = urlParams.get("state");
        provider = urlParams.get("provider");
        reSign = urlParams.get("re_sign") === "True";
        role = urlParams.get("role");
        validatedName = urlParams.get("validated_name");
        claims = jwt_decode(idToken);
        $userRole = role;
        schacHomeOrganisations = $userRole === roleConstants.STUDENT ? [] : [DOMPurify.sanitize(claims.schac_home_organization)];
        if (!schacHomeOrganisations) {
            schacHomeOrganisations = [];
        }
        if ($userRole === roleConstants.TEACHER) {
            validateInstitutions(schacHomeOrganisations)
                .then(res => {
                    let validSchacHomeOrganisations = schacHomeOrganisations
                        .filter(orgName => res.find(validatedOrg => validatedOrg.schac_home === orgName && validatedOrg.valid));
                    if (validSchacHomeOrganisations.length === 0) {
                        noValidInstitution = true;
                        loaded = true;
                    } else {
                        loaded = true;
                    }
                });
        } else {
            loaded = true
        }
    });

    const agree = () => {
        window.location.href = `${config.serverUrl}/account/${encodeURIComponent(provider)}/login/terms_accepted/${encodeURIComponent(state)}/${idToken}/${accessToken}`;
    };

    const showTerms = (title, url) => () => {
        showModalTerms = true;
        termsUrl = url;
        termsTitle = title;
    };

    const closeTerms = () => showModalTerms = false;

    const logInForceAuthn = () => {
        $userLoggedIn = "";
        $userRole = "";
        $authToken = "";
        $redirectPath = window.location.pathname;
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
                <h1>{I18n.t("acceptTerms.welcome", {name: claims.given_name + " " + claims.family_name})}</h1>
                <h3>{reSign ? I18n.t("acceptTerms.renewTerms") : I18n.t("acceptTerms.acceptTerms")}</h3>
                <p class="terms">{I18n.translations[I18n.locale].acceptTerms[$userRole].termsInfo}</p>
                <ul>
                    {#each I18n.translations[I18n.locale].acceptTerms.termsBullets[$userRole] as bullet}
                        <li>{bullet}</li>
                    {/each}
                </ul>
                <div class="agree">
                    {@html terms2Icon}
                    <p>
                        <span>{I18n.t(`acceptTerms.${$userRole}.termsLinkPre`)}</span>
                        <a href="/terms"
                           oncontextmenu="return false;"
                           on:click|preventDefault|stopPropagation={showTerms(
                  I18n.t(`acceptTerms.${$userRole}.termsTitle`),
                  I18n.t(`terms.${$userRole}.termsOfUseRaw`))}>
                            {I18n.t(`acceptTerms.${$userRole}.termsLink`)}
                        </a>
                        <span>{I18n.t(`acceptTerms.${$userRole}.termsLinkPost`)}</span>
                        <span>{I18n.t(`acceptTerms.${$userRole}.privacyLinkPre`)}</span>
                        <a href="/terms"
                           oncontextmenu="return false;"
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
            question={!schacHomeOrganisations[0] ?
        I18n.t("acceptTerms.noValidInstitutionInfoNoInstitution") :
        I18n.t("acceptTerms.noValidInstitutionInfo.teacher", {name: schacHomeOrganisations[0]})}
            evaluateQuestion={true}
            submitLabel={I18n.t("acceptTerms.goToSurfConext")}
            hideSubmit={true}/>
{/if}
