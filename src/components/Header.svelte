<script>
    import logo from "../img/logo.svg";
    import {link} from "svelte-routing";
    import Button from "./Button.svelte";
</script>

<style>
    .header {
        width: 100%;
        max-width: var(--width-app);
        padding: 6px 13px;

        background-color: #D8D8D8;
    }
</style>

<div class="header">
    <a href="/" use:link>
        {@html logo}
    </a>
</div>
