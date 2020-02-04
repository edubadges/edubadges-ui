<script>
    import logo from "../img/logo.svg";
    import {link} from "svelte-routing";
    import Button from "./Button.svelte";
</script>

<style>
    .header {
        padding: 6px 13px;
        background-color: var(--color-primary-grey);
    }
</style>

<div class="header">
    <a href="/" use:link>
        {@html logo}
    </a>
</div>
