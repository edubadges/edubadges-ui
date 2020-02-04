<script>
    import logo from "../img/logo.svg";
    import {link} from "svelte-routing";
    import Button from "./Button.svelte";
</script>

<style>
    header {
        background-color: var(--color-background-grey-dark);
        padding-top: 4px;
        padding-bottom: 4px;
    }
</style>

<header class="header">
    <a href="/" use:link>
        {@html logo}
    </a>
</header>
