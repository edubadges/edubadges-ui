<script>
    import {user, config, flash} from "../stores/user";
    import I18n from "i18n-js";
    import security from "../icons/security.svg";
    import data_activity from "../icons/data_activity.svg";
    import personal_info from "../icons/personal_info.svg";
    import chevron_left from "../icons/chevron-left.svg";
    import chevron_right from "../icons/chevron-right.svg";
    import {navigate} from "svelte-routing";
    import {onMount} from "svelte";

    import Profile from "./Profile.svelte";
    import Security from "./Security.svelte";
    import Account from "./Account.svelte";
    import Migration from "./Migration.svelte";
    import Flash from "../components/Flash.svelte";

    export let bookmark;

    const tabs = [
        {name: "profile", component: Profile, icon: personal_info},
        {name: "security", component: Security, icon: security},
        {name: "account", component: Account, icon: data_activity},
        {name: "migration", component: Migration, icon: data_activity, ignore: true}
    ];

    let currentTab = tabs[0];
    let displayMenu = false;
    let menuIcon = chevron_right;

    onMount(() => currentTab = bookmark ? currentTab = tabs.find(tab => tab.name === bookmark) : tabs[0]);

    const switchTab = name => () => navigate(`/${name}`);

    const showMenu = () => {
        displayMenu = !displayMenu;
        menuIcon = displayMenu ? chevron_left : chevron_right;
    }

</script>

<style>
    .home {
        height: 100%;
        display: flex;
        position: relative;
    }

    nav {
        min-width: 270px;
        background-color: #f3f6f8;
        min-height: 100%;
        border-bottom-left-radius: 8px;
        padding-bottom: 400px;
    }

    nav ul {
        text-align: center;
        padding: 25px 0 0 22px;
    }

    a.menu-link {
        display: none;
    }

    @media (max-width: 820px) {
        nav {
            margin-right: 20px;
            z-index: 99;
            min-width: 50px;

        }

        nav.open {
            margin-right: 0;
            position: absolute;
            min-width: 270px;
            padding-bottom: 0;
        }

        a.menu-link {
            display: inline-block;
        }

        ul.hide {
            display: none;
        }
    }

    a.menu-link {
        padding: 10px;
    }

    nav ul li {
        display: flex;
        align-items: center;
        padding: 10px 65px 10px 15px;
    }


    nav ul li:last-child {
        border-bottom: none;
    }

    nav ul li a {
        text-decoration: none;
        display: inline-block;
        margin-left: 15px;
        font-weight: 300;
        color: black;
    }

    nav ul li {
        border-right: 2px solid var(--color-primary-grey);
        cursor: pointer;
    }

    nav ul li.active {
        border-right: 7px solid var(--color-primary-green);
        background-color: white;
        cursor: default;
    }

    nav ul li.active a {
        cursor: default;
    }

    nav ul li a {
        font-weight: 600;
    }

    nav ul li.active a {
        color: var(--color-primary-green);
    }

    :global(nav ul li.active svg) {
        fill: var(--color-primary-green);
    }

    div.component-container {
        padding: 0 50px;
        width: 100%;
    }

    @media (max-width: 820px) {
        div.component-container {
            padding: 0;
        }
    }

</style>
<div class="home">
    <nav class:open={displayMenu}>
        <a class="menu-link" href="/menu"
           on:click|preventDefault|stopPropagation={showMenu}>{@html menuIcon}</a>
        <ul class:hide={!displayMenu}>
            {#each tabs as tab}
                {#if !tab.ignore}
                    <li class:active={tab.name === currentTab.name}
                        on:click|preventDefault|stopPropagation={switchTab(tab.name)}>
                        {@html tab.icon}
                        <a href="/{tab.name}"
                           on:click|preventDefault|stopPropagation={switchTab(tab.name)}>
                            {I18n.ts(`home.${tab.name}`)}
                        </a>
                    </li>
                {/if}
            {/each}
        </ul>
    </nav>
    <div class="component-container">
        <Flash/>
        <svelte:component this={currentTab.component}/>
    </div>

</div>
