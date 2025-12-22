<script>
    import I18n from "i18n-js";
    import {authToken, redirectPath, userLoggedIn, userRole, currentInstitution} from "../stores/user";
    import {navigate} from "svelte-routing";
    import {onMount} from "svelte";
    import tip from "../icons/tip.svg";
    import Spinner from "../components/Spinner.svelte";
    import Modal from "../components/forms/Modal.svelte";
    import {role} from "../util/role";
    import {getService} from "../util/getService";
    import {fetchRawCurrentInstitution, requestLoginToken} from "../api";
    import DOMPurify from "dompurify";
    import {translatePropertiesRawQueries} from "../util/utils";

    let authError;
    let code = 1;
    let adminEmail;
    let showNoValidatedName = false;

    const goToEduId = () => {
        $userRole = role.STUDENT;
        const service = getService(role.STUDENT);
        requestLoginToken(service, true);
    };

    onMount(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        authError = urlSearchParams.get("authError");
        const role = urlSearchParams.get("role");
        if (role) {
            $userRole = role;
        }

        if (!authError) {
            const token = urlSearchParams.get("authToken");
            $authToken = token;
            $userLoggedIn = true;
            fetchRawCurrentInstitution()
                .then(res => {
                    const institution = res.current_institution;
                    institution.permissions = res.permissions;
                    $currentInstitution = translatePropertiesRawQueries(institution);
                    let revalidateName = urlSearchParams.get("revalidate-name");
                    if (revalidateName) {
                        //server side signal that the eduID account is not linked anymore
                        showNoValidatedName = true;
                    } else {
                        navigate($redirectPath || "/");
                        $redirectPath = "";
                    }
                })
        } else {
            $userLoggedIn = "";
            code = urlSearchParams.get("code") || "1";
            adminEmail = urlSearchParams.get("admin_email");
        }

    });
</script>

<style>
    .content-auth-error-container {
        display: flex;
        margin: 10vh auto;
        max-width: 420px;
    }

    .content-auth-error {
        display: flex;
        flex-direction: column;
    }

    h1 {
        color: var(--grey-9);
        margin-bottom: 25px;
    }

    div.info {
        display: flex;
        align-items: center;
        background-color: #fef49a;
        border: 1px solid #dabc28;
        border-bottom: 2px solid #dabc28;
        padding: 15px 25px;
        margin: 25px 0;
        border-radius: 8px;
    }

    span.tip {
        margin: 0 25px 0 10px;
        font-weight: bold;
        word-break: normal;
    }


</style>

{#if showNoValidatedName}
    <Modal
            submit={goToEduId}
            title={I18n.t("acceptTerms.noValidatedNameAnymoreTitle")}
            question={I18n.t("acceptTerms.noValidatedNameAnymore")}
            evaluateQuestion={true}
            cancel={() => navigate($redirectPath)    }
            submitLabel={I18n.t("publicBadge.noValidatedNameModal.goToEduID")}/>
{/if}
{#if !authError}
    <div>
        {#if !showNoValidatedName}
            <Spinner/>
        {/if}
    </div>
{:else}
    <div class="content-auth-error-container">
        <div class="content-auth-error">
            <h1>{I18n.t("authError.title")}</h1>
            <p>{I18n.t(`authError.code.${code}`)}</p>
            {#if adminEmail && code === "2"}
                <div class="info">
                    <span>{@html tip}</span>
                    <span class="tip">{I18n.t("authError.tip")}</span>
                    <span>{@html I18n.t("authError.adminEmail", {email: DOMPurify.sanitize(adminEmail)})}</span>

                </div>
            {/if}

        </div>
    </div>
{/if}
