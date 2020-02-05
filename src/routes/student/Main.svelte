<script>
    export let bookmark;

	import { onMount } from 'svelte';
	import { SideMenu } from '../../components';
    import {
        Backpack,
        BadgeRequests,
        Collections,
        Profile
    } from '../student'

    const pages = [
        {path: "backpack", name: "Backpack", component: Backpack},
        {path: "badge-requests", name: "Requested", component: BadgeRequests},
        {path: "collections", name: "Collections", component: Collections},
        {path: "profile", name: "Profile", component: Profile}
    ];

    let currentPage = pages[0];

    onMount(() => {
        currentPage = pages.find(({path}) => path === bookmark) || pages[0]
    });
</script>

<SideMenu {pages} {currentPage} />
<svelte:component this={currentPage.component}/>
