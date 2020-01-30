<script>
    import {user, flash} from "../stores/user";
    import I18n from "i18n-js";
    import {validPassword} from "../validation/regexp";
    import {me, updateSecurity} from "../api";
    import {navigate} from "svelte-routing";
    import chevron_left from "../icons/chevron-left.svg";
    import Button from "../components/Button.svelte";

    let currentPassword = "";
    let newPassword = "";
    let confirmPassword = "";
    let currentPasswordInvalid = false;
    let usePassword = $user.usePassword;

    const valid = () => {
        let existingPasswordValid = usePassword && currentPassword && validPassword(newPassword) && newPassword === confirmPassword;
        let newPasswordValid = !usePassword && validPassword(newPassword) && newPassword === confirmPassword;
        return (existingPasswordValid || newPasswordValid);
    };

    const update = () => {
        if (valid()) {
            updateSecurity($user.id, currentPassword, newPassword)
                    .then(json => {
                        $user = {$user, ...json};
                        navigate("/security");
                        flash.setValue(usePassword ? I18n.ts("password.updated") : I18n.ts("password.set"));
                    })
                    .catch(() => {
                        currentPasswordInvalid = true;
                    });
        }
    };
    const cancel = () => {
        me().then(json => {
            $user = {$user, ...json};
            navigate("/security");
        });
    }


</script>

<style>
    .password {
        width: 100%;
        display: flex;
        height: 100%;
    }

    @media (max-width: 820px) {
        .left {
            display: none;
        }

        .inner {
            border-left: none;
        }
    }

    .left {
        background-color: #f3f6f8;
        width: 270px;
        height: 100%;
        border-bottom-left-radius: 8px;
    }

    .inner {
        margin: 20px 0 190px 0;
        padding: 15px 15px 0 40px;
        border-left: 2px solid var(--color-primary-grey);
        display: flex;
        flex-direction: column;
        background-color: white;
    }

    .header {
        display: flex;
        align-items: center;
        align-content: center;
        color: var(--color-primary-green);
    }

    .header a {
        margin-top: 8px;
    }

    h2 {
        margin-left: 25px;
    }

    p.info {
        margin: 12px 0 32px 0;
    }

    label {
        font-weight: bold;
        margin: 33px 0 13px 0;
        display: inline-block;
    }

    input {
        border-radius: 8px;
        border: solid 1px #676767;
        padding: 14px;
        font-size: 16px;
    }

    span.error {
        margin-top: 5px;
        display: inline-block;
        color: var(--color-primary-red);
    }

    .options {
        margin-top: 60px;
    }

    :global(.options a:not(:first-child)) {
        margin-left: 25px;
    }


</style>
<div class="password">
    <div class="left"></div>
    <div class="inner">
        <div class="header">
            <a href="/back" on:click|preventDefault|stopPropagation={cancel}>
                {@html chevron_left}
            </a>
            <h2>{usePassword ? I18n.ts("password.updateTitle") : I18n.ts("password.setTitle")}</h2>
        </div>
        <p class="info">{I18n.t("password.passwordDisclaimer")}</p>
        {#if usePassword}
            <label for="currentPassword">{I18n.ts("password.currentPassword")}</label>
            <input id="currentPassword" autocomplete="current-password" type="password" bind:value={currentPassword}/>
        {/if}
        {#if currentPasswordInvalid}
            <span class="error">{I18n.ts("password.invalidCurrentPassword")}</span>
        {/if}

        <input id="username" autocomplete="username email" type="hidden" name="username" value={$user.email}>

        <label for="newPassword">{I18n.ts("password.newPassword")}</label>
        <input id="newPassword" type="password" autocomplete="new-password" bind:value={newPassword}>

        <label for="confirmPassword">{I18n.ts("password.confirmPassword")}</label>
        <input id="confirmPassword" type="password" autocomplete="new-password" bind:value={confirmPassword}>

        <div class="options">
            <Button className="cancel" label={I18n.ts("password.cancel")} onClick={cancel}/>

            <Button label={usePassword ? I18n.ts("password.updateUpdate") : I18n.ts("password.setUpdate")}
                    onClick={update}
                    disabled={!((usePassword && currentPassword && validPassword(newPassword) && newPassword === confirmPassword) ||
                (!usePassword && validPassword(newPassword) && newPassword === confirmPassword))}/>
        </div>
    </div>


</div>