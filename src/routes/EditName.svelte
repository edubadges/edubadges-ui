<script>
    import {user, flash} from "../stores/user";
    import I18n from "i18n-js";
    import {me, updateUser} from "../api";
    import {navigate} from "svelte-routing";
    import chevron_left from "../icons/chevron-left.svg";
    import Button from "../components/Button.svelte";

    const update = () => {
        if ($user.familyName && $user.givenName) {
            updateUser($user).then(() => {
                navigate("/profile");
                flash.setValue(I18n.ts("edit.updated"));
            });
        }
    };

    const cancel = () => {
        me().then(json => {
            $user = {$user, ...json};
            navigate("/profile");
        });
    }

</script>

<style>
    .profile {
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

    .options {
        margin-top: 60px;
    }

    :global(.options a:not(:first-child)) {
        margin-left: 25px;
    }


</style>
<div class="profile">
    <div class="left"></div>
    <div class="inner">
        <div class="header">
            <a href="/back" on:click|preventDefault|stopPropagation={cancel}>
                {@html chevron_left}
            </a>
            <h2>{I18n.ts("edit.title")}</h2>
        </div>
        <p class="info">{I18n.t("edit.info")}</p>
        <label for="givenName">{I18n.ts("edit.givenName")}</label>
        <input id="givenName" type="text" bind:value={$user.givenName}/>
        <label for="familyName">{I18n.ts("edit.familyName")}</label>
        <input id="familyName" type="text" bind:value={$user.familyName}/>

        <div class="options">
            <Button className="cancel" label={I18n.ts("edit.cancel")} onClick={cancel}/>

            <Button label={I18n.ts("edit.update")} onClick={update}
                    disabled={!($user.familyName && $user.givenName)}/>
        </div>
    </div>

</div>