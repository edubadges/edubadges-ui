<script>
    export let pages;
    export let currentPage;

	import { link } from 'svelte-routing';
</script>

<style>
    .side-menu {
        display: flex;
        flex-direction: column;

        width: 200px;

        background-color: var(--color-background-grey-light);
    }

    a {
        padding: 14px;
        color: var(--color-text-grey);
    }

    a.active {
        background-color: white;
    }
</style>

<div class="side-menu">
    {#each pages as {path, name}}
        <a href={path} use:link class:active={path === currentPage.path}>
            {name}
        </a>
    {/each}
</div>