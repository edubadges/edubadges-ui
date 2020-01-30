<script>
    import {user, flash} from "../stores/user";
    import I18n from "i18n-js";
    import {navigate} from "svelte-routing";
    import chevron_right from "../icons/chevron-right.svg";
    import CheckBox from "../components/CheckBox.svelte";

    let password = $user.usePassword ? "************************" : I18n.ts("security.notSet");

</script>

<style>
    .security {
        width: 100%;
        height: 100%;
    }

    .inner {
        height: 100%;
        margin: 0 auto;
        padding: 15px 30px 15px 0;
        display: flex;
        flex-direction: column;
    }

    h2 {
        margin: 20px 0;
        color: var(--color-primary-green);
    }

    p.info {
        font-weight: 300;
        margin-bottom: 40px;
    }

    table {
        width: 100%;
    }

    tr.name, tr.rememberme {
        cursor: pointer;
    }

    td {
        border-top: 1px solid var(--color-primary-grey);
        padding: 20px;
    }

    td.attr {
        width: 30%;
    }

    td.value {
        width: 60%;
    }

    td.link {
        width: 10%;
        text-align: right;
        padding: 0;
    }

    :global(a svg.menu-link) {
        fill: var(--color-primary-green);
    }


</style>
<div class="security">
    <div class="inner">
        <h2>{I18n.ts("security.title")}</h2>
        <p class="info">{I18n.ts("security.subTitle")}</p>

        <table cellspacing="0">
            <thead></thead>
            <tbody>
            <tr>
                <td class="attr">{I18n.t("security.useMagicLink")}</td>
                <td class="value">{$user.email}</td>
                <td class="link"></td>
            </tr>
            <tr class="name" on:click={() => navigate("/password")}>
                <td class="attr">{I18n.t("security.usePassword")}</td>
                <td class="value">{password}</td>
                <td class="link">
                    <a class="menu-link" href="/password"
                       on:click|preventDefault|stopPropagation={() => navigate("/password")}>{@html chevron_right}</a>
                </td>
            </tr>
            <tr class:rememberme={$user.rememberMe} on:click={() => $user.rememberMe && navigate("/rememberme")}>
                <td class="attr">{I18n.t("security.rememberMe")}</td>
                <td class="value">{I18n.t(`security.rememberMe${$user.rememberMe}`)}</td>
                <td class="link">
                    {#if $user.rememberMe}
                    <a class="menu-link" href="/rememberme"
                       on:click|preventDefault|stopPropagation={() => navigate("/rememberme")}>{@html chevron_right}</a>
                    {/if}
                </td>
            </tr>
            </tbody>
        </table>

    </div>

</div>