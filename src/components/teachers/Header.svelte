<script>
    import {link} from "svelte-routing";
    import I18n from "i18n-js";
    import {currentPath} from "../../stores/currentPath";
    import {userLoggedIn} from "../../stores/user";
    import {ltiContext} from "../../stores/lti";

    import {Header} from "../../components";

    $: tabs = [
        {
            path: "/",
            active: $currentPath && !$currentPath.includes("/manage") && !$currentPath.includes("/users") && !$currentPath.includes("/catalog")
                && !$currentPath.includes("/profile") && !$currentPath.includes("/permissions")
                && !$currentPath.includes("/public") && !$currentPath.includes("/insights") && !$currentPath.includes("/lti"),
            name: "badgeclasses"
        },
        {
            path: "/manage/institution/issuers",
            active: $currentPath && $currentPath.includes("/manage"),
            name: "manage"
        },
        {
            path: "/users",
            active: $currentPath && $currentPath.includes("/users"),
            name: "users"
        },
        {
            path: "/catalog",
            active: $currentPath && ($currentPath.includes("/catalog") || $currentPath.includes("/public")),
            name: "catalog"
        },
        {
            path: "/insights",
            active: $currentPath && $currentPath.includes("/insights"),
            name: "insights"
        },
        {
            path: "/lti/context",
            active: $currentPath && $currentPath.includes("/lti") && !$currentPath.includes("/manage"),
            name: "lti",
            excluded: !$ltiContext.launchId
        }
    ];
</script>

<style>
    nav {
        white-space: nowrap;
    }

    nav a {
        font-weight: var(--medium);
        font-size: 18px;
        letter-spacing: 0.34px;
        font-family: "Proxima Nova", sans-serif;

        padding: 4px 0;
        margin-right: 30px;

        border-bottom-width: 3px;
        border-bottom-style: solid;
    }

    nav a:not(.active) {
        color: var(--text-grey-dark);
        border-color: transparent;
    }

    nav a.active {
        color: var(--purple);
        border-color: var(--purple);
    }
</style>

<Header logout>
    <nav>
        {#if $userLoggedIn && $userLoggedIn !== "false"}
            {#each tabs as {path, active, name, excluded} (path)}
                {#if !excluded}
                    <a href={path} use:link class="button" class:active>
                        {I18n.t(['header', 'nav', name])}
                    </a>
                {/if}
            {/each}
        {/if}
    </nav>
</Header>
