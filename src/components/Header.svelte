<script>
    import I18n from "i18n-js";
    import {link, navigate} from "svelte-routing";
    import {clickOutside} from "../util/clickOutside.js";
    import logo from "../img/logo.svg";
    import {chevronDown, chevronUp} from "../icons";
    import {role} from "../util/role";
    import {config} from "../util/config";
    import question from "../icons/question.svg";
    import {
        authToken,
        redirectPath,
        userImpersonated,
        userLoggedIn,
        userName,
        userRole,
        validatedUserName
    } from "../stores/user";
    import {getProfile, logoutCurrentUser, requestLoginToken} from "../api";
    import Modal from "./forms/Modal.svelte";
    import Feedback from "./shared/Feedback.svelte";
    import {onMount} from "svelte";

    const doLogOut = () => {
        $userLoggedIn = "";
        $userRole = "";
        $userName = "";
        $validatedUserName = "";
        $userImpersonated = "";
        $authToken = "";
        $redirectPath = "";
    }

    const logoutUser = () => {
        logoutCurrentUser()
            .then(() => {
                doLogOut();
                navigate("/login");
            }).catch(() => {
            doLogOut()
            navigate("/login");
        });
    }

    const clearImpersonation = () => {
        doLogOut();
        $redirectPath = "/";
        $userRole = role.TEACHER;
        requestLoginToken(config.teacherDomain);
    }

    let menuOpen = false;
    let showModal = false;
    let showFeedback = false;
    let profile = {};
    const uaLower = window.navigator.userAgent.toLowerCase();

    onMount(() => {
        if ($userRole === role.TEACHER && $authToken) {
            getProfile().then(res => {
                profile = res;
            }).catch(() => {
                doLogOut();
            });
        }
    });


</script>

<style lang="scss">
    header {
        display: flex;
        align-items: center;

        padding-top: var(--ver-padding-header);
        padding-bottom: var(--ver-padding-header);
        padding-right: var(--hor-padding-s);

        span.demo {
            padding: 0 var(--hor-padding-s);
            color: var(--red-dark);
            display: inline-block;
            font-weight: bold;
            font-size: 20px;
            cursor: pointer;
            text-decoration: underline;
        }
    }

    :global(span.demo svg circle, span.demo svg path  ) {
        color: var(--red-dark);
        fill: var(--red-dark);
    }


    .slot-container {
        margin-left: 24px;
        flex: 1;
    }

    a {
        margin-left: var(--hor-padding-s);
        width: calc(var(--width-side-bar) - var(--hor-padding-s));

        &.demo {
            width: 150px;
            padding-right: 5px;
        }

    }

    a img.logo {
        vertical-align: middle;
        width: 150px;
    }

    a :global(svg.edubadges-logo) {
        vertical-align: middle;
        width: 150px;
    }

    .expand-menu {
        position: relative;

        :global(svg.chevron-down), :global(svg.chevron-up) {
            width: 28px;
            fill: var(--purple);
        }

        div.menu.show {
            display: block;
            position: absolute;
            right: 0;
            min-width: 180px;
            z-index: 99;

        }

        div.menu:not(.show) {
            display: none;
        }
    }

    .profile-menu {
        color: var(--text-grey-dark);
        padding: var(--ver-padding-m) var(--hor-padding-m);

        &:not(:last-child) {
            border-bottom: 2px solid var(--grey-4);
        }

    }

    .profile-menu:hover {
        background-color: var(--grey-2);
        color: var(--grey-10);
    }
</style>

<header>
    <a href="/" use:link class:demo={config.isDemoEnvironment}>
        {#if uaLower.indexOf("safari") > -1 && uaLower.indexOf("chrome") < 0}
            <img class="logo" src="img/logo.png" alt="logo"/>
        {:else}
            {@html logo}
        {/if}
    </a>

    {#if config.isDemoEnvironment}
    <span class="demo" on:click={() => showModal = true}>
      {I18n.t("header.demo")}{@html question}
    </span>
    {/if}

    <div class="slot-container">
        <slot/>
    </div>

    {#if $userLoggedIn}
        <div
                class="expand-menu click"
                on:click={() => (menuOpen = !menuOpen)}
                use:clickOutside
                on:clickOutside={() => (menuOpen = false)}>
            {@html menuOpen ? chevronUp : chevronDown}
            <div class="menu card" class:show={menuOpen}>
                {#if $userRole === role.STUDENT}
                    <div class="profile-menu" on:click={() => navigate("/")}>{I18n.t('header.home')}</div>
                {/if}
                <div class="profile-menu" on:click={() => navigate("/profile")}>{I18n.t('header.profile')}</div>
                {#if $userRole === role.TEACHER}
                    <div class="profile-menu"
                         on:click={() => navigate("/permissions/institution")}>{I18n.t('header.permissions')}</div>
                {/if}
                {#if $userRole === role.TEACHER}
                    <div class="profile-menu"
                         on:click={() => navigate("/notifications")}>{I18n.t('header.notifications')}</div>
                    <div class="profile-menu"
                         on:click={() => navigate("/management-queries")}>{I18n.t('header.queries')}</div>
                {/if}
                {#if profile.is_superuser}
                    <div class="profile-menu"
                         on:click={() => navigate("/impersonate")}>{I18n.t('header.impersonate')}</div>
                {:else if $userImpersonated === "true"}
                    <div class="profile-menu"
                         on:click={clearImpersonation}>{I18n.t('header.clearImpersonation')}</div>
                {/if}
                {#if $userRole === role.STUDENT}
                    <div class="profile-menu" on:click={() => navigate("/catalog")}>{I18n.t('header.nav.catalog')}</div>
                {/if}
                <div class="profile-menu" on:click={() => showFeedback = true}>{I18n.t('header.feedback')}</div>
                <div class="profile-menu" on:click={logoutUser}>{I18n.t('header.logout')}</div>
            </div>
        </div>
    {/if}
</header>
{#if showModal}
    <Modal
            submit={() => showModal = false}
            question={I18n.t("header.demo")}
            title={I18n.t("header.demo")}>
        <span>{@html I18n.t("demo.info")}</span>
    </Modal>
{/if}

{#if showFeedback}
    <Feedback close={() => showFeedback = false}/>
{/if}
