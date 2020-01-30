<script>
    import {user, flash} from "../stores/user";
    import I18n from "i18n-js";
    import {navigate} from "svelte-routing";
    import chevron_right from "../icons/chevron-right.svg";

</script>

<style>
    .profile {
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

    h3 {
        margin-bottom: 30px;
    }

    table {
        width: 100%;
    }
    tr.name {
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
<div class="profile">
    <div class="inner">
        <h2>{I18n.t("profile.title")}</h2>
        <p class="info">{I18n.ts("profile.info")}</p>
        <h3>{I18n.t("profile.profile")}</h3>
        <table cellspacing="0">
            <thead></thead>
            <tbody>
            <tr>
                <td class="attr">{I18n.ts("profile.email")}</td>
                <td class="value">{$user.email}</td>
                <td class="link"></td>
            </tr>
            <tr>
                <td class="attr">{I18n.ts("profile.schacHomeOrganization")}</td>
                <td class="value">{$user.schacHomeOrganization}</td>
                <td class="link"></td>
            </tr>
            <tr class="name" on:click={() => navigate("/edit")}>
                <td class="attr">{I18n.ts("profile.name")}</td>
                <td class="value">{`${$user.givenName} ${$user.familyName}`}</td>
                <td class="link">
                    <a class="menu-link" href="/name"
                       on:click|preventDefault|stopPropagation={() => navigate("/edit")}>{@html chevron_right}</a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

</div>