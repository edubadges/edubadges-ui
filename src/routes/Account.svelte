<script>
    import {user} from "../stores/user";
    import I18n from "i18n-js";
    import {navigate} from "svelte-routing";

    import Modal from '../components/Modal.svelte';
    import {deleteUser} from "../api";
    import Button from "../components/Button.svelte";

    let showModal = false;

    const deleteUserAction = showConfirmation => () => {
        if (showConfirmation) {
            showModal = true
        } else {
            deleteUser($user).then(() => {
                $user = {
                    id: "",
                    email: "",
                    givenName: "",
                    familyName: "",
                    guest: true,
                    usePassword: false
                };
                navigate("/landing?delete=true");
            });
        }
    }

</script>

<style>
    .account {
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

    .options {
        margin-top: 60px;
    }

    :global(a svg.menu-link) {
        fill: var(--color-primary-green);
    }


</style>

<div class="account">

    <div class="inner">
        <h2>{I18n.t("account.title")}</h2>
        <p class="info">{I18n.ts("account.info")}</p>
        <h3>{I18n.t("profile.profile")}</h3>
        <table cellspacing="0">
            <thead></thead>
            <tbody>
            <tr>
                <td class="attr">{I18n.ts("security.useMagicLink")}</td>
                <td class="value">{$user.email}</td>
            </tr>
            </tbody>
        </table>
        <div class="options">
            <Button href="/delete" label={I18n.ts("account.deleteAccount")}
                    onClick={deleteUserAction(true)} className="full cancel"/>
        </div>
    </div>

</div>

{#if showModal}
    <Modal submit={deleteUserAction(false)}
           cancel={() => showModal = false}
           question={I18n.ts("account.deleteAccountConfirmation")}
                   title={I18n.ts("account.deleteAccount")}></Modal>
{/if}