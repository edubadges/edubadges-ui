<script>
    import {userRole} from "../../stores/user";

    export let bookmark;

	import { onMount } from 'svelte';
    import {
        Backpack,
        BadgeRequests,
        Collections,
        Profile
    } from '../student'

    const tabs = [
        {name: "backpack", component: Backpack},
        {name: "badge-requests", component: BadgeRequests},
        {name: "collections", component: Collections},
        {name: "profile", component: Profile}
    ];

    let currentTab = tabs[0];

    onMount(() => currentTab = bookmark ? currentTab = tabs.find(tab => tab.name === bookmark) : tabs[0]);

    const switchTab = name => () => {
        currentTab = tabs.find(tab => tab.name === name);
    };
</script>

<div>
    {#each tabs as tab}
        <button on:click={switchTab(tab.name)}>
            {tab.name}
        </button>
    {/each}

    <svelte:component this={currentTab.component}/>
</div>
