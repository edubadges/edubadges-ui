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
    import DOMPurify from "dompurify";

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
                navigate("/login?force=true");
            }).catch(() => {
            doLogOut()
            navigate("/login?force=true");
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

    {#if config.isProdEnvironment}    
        <script type="text/javascript">
        console.log("Load Piwik")
        (function(window, document, dataLayerName, id) {
          window[dataLayerName]=window[dataLayerName]||[],window[dataLayerName].push({start:(new Date).getTime(),event:"stg.start"});var scripts=document.getElementsByTagName('script')[0],tags=document.createElement('script');
          function stgCreateCookie(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+24*c*60*60*1e3),d="; expires="+e.toUTCString();f="; SameSite=Strict"}document.cookie=a+"="+b+d+f+"; path=/"}
          var isStgDebug=(window.location.href.match("stg_debug")||document.cookie.match("stg_debug"))&&!window.location.href.match("stg_disable_debug");stgCreateCookie("stg_debug",isStgDebug?1:"",isStgDebug?14:-1);
          var qP=[];dataLayerName!=="dataLayer"&&qP.push("data_layer_name="+dataLayerName),isStgDebug&&qP.push("stg_debug");var qPString=qP.length>0?("?"+qP.join("&")):"";
          tags.async=!0,tags.src="https://surfnl.containers.piwik.pro/"+id+".js"+qPString,scripts.parentNode.insertBefore(tags,scripts);
          !function(a,n,i){a[n]=a[n]||{};for(var c=0;c<i.length;c++)!function(i){a[n][i]=a[n][i]||{},a[n][i].api=a[n][i].api||function(){var a=[].slice.call(arguments,0);"string"==typeof a[0]&&window[dataLayerName].push({event:n+"."+i+":"+a[0],parameters:[].slice.call(arguments,1)})}}(i[c])}(window,"ppms",["tm","cm"]);
          })(window, document, 'dataLayer', 'acdd132d-5eda-4edc-902a-e9eadc243391');
          </script>
    {/if}
    
    <a href="/" use:link class:demo={config.isDemoEnvironment}>
        {#if uaLower.indexOf("safari") > -1 && uaLower.indexOf("chrome") < 0}
            <img class="logo" src="img/logo.png" alt="logo"/>
        {:else}
            {@html logo}
        {/if}
    </a>

    {#if config.isDemoEnvironment}
    <span class="demo" on:click={() => showModal = true}>
      {I18n.t("header.demo")}{@html DOMPurify.sanitize(question)}
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
