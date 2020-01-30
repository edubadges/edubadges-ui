<script>
    import {user, flash} from "../stores/user";
    import I18n from "i18n-js";
    import {validPassword} from "../validation/regexp";
    import {forgetMe} from "../api";
    import {navigate} from "svelte-routing";
    import chevron_left from "../icons/chevron-left.svg";
    import Button from "../components/Button.svelte";
    import Modal from "../components/Modal.svelte";

    let showModal = false;

    const doForgetMe = showConfirmation => () => {
        if (showConfirmation) {
            showModal = true
        } else {
            forgetMe().then(() => {
                $user.rememberMe = false;
                navigate("/security");
                flash.setValue(I18n.ts("rememberMe.updated"));
            });
        }
    };

    const cancel = () => navigate("/security");


</script>

<style>
    .rememberMe {
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

    .options {
        margin-top: 60px;
    }

    :global(.options a:not(:first-child)) {
        margin-left: 25px;
    }


</style>
<div class="rememberMe">
    <div class="left"></div>
    <div class="inner">
        <div class="header">
            <a href="/back" on:click|preventDefault|stopPropagation={cancel}>
                {@html chevron_left}
            </a>
            <h2>{I18n.t("rememberMe.forgetMeTitle")}</h2>
        </div>
        <p class="info">{I18n.t("rememberMe.info")}</p>
        <div class="options">
            <Button className="cancel" label={I18n.ts("rememberMe.cancel")} onClick={cancel}/>

            <Button label={I18n.ts("rememberMe.update")}
                    onClick={doForgetMe(true)}/>
        </div>
    </div>

    {#if showModal}
        <Modal submit={doForgetMe(false)}
               cancel={() => showModal = false}
               question={I18n.ts("rememberMe.forgetMeConfirmation")}
                       title={I18n.ts("rememberMe.forgetMe")}></Modal>
    {/if}
</div>