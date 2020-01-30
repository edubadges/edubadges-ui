<script>
    import I18n from "i18n-js";
    import {navigate} from "svelte-routing";
    import Button from "../components/Button.svelte";
    import ModalImage from "../components/ModalImage.svelte";

    const src = "img/WAYF.png";

    const proceed = () => navigate("/");

</script>

<style>
    .migration {
        width: 100%;
        height: 100%;
    }

    .inner {
        height: 100%;
        margin: 0 auto;
        padding: 15px 0;
        display: flex;
    }

    h3 {
        margin: 15px 0 30px 0;
    }

    p.info {
        font-weight: 300;
        margin-bottom: 30px;
    }

    .options {
        margin-top: 60px;
    }

    :global(.options a:not(:first-child)) {
        margin-left: 25px;
    }

    div.right {
        margin: 0 0 0 30px;
    }

    @media (max-width: 1250px) {
        .inner {
            flex-direction: column;
        }

        div.right {
            margin: 30px 0 0 0;
        }
    }


</style>
<div class="migration">
    <div class="inner">
        <div class="left">
            <h3>{I18n.ts("migration.header")}</h3>
            <p class="info">{I18n.t("migration.info")}</p>
            <p class="info">{I18n.t("migration.info2")}</p>
            <p class="info">{I18n.t("migration.info3")}
                <a href="/security" on:click|preventDefault|stopPropagation={() => navigate("/security")}
                >{I18n.t("migration.securityLink")}</a></p>
            <div class="options">
                <Button label={I18n.ts("migration.link")} className="full" onClick={proceed}/>
            </div>
        </div>
        <div class="right">
            <ModalImage src={src} alt="WAYF"/>
        </div>
    </div>

</div>