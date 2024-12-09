<script>
    import {onMount} from "svelte";
    import moment from "moment";
    import I18n from "i18n-js";
    import {navigate} from "svelte-routing";
    import {issuerIcon} from "../../icons";
    import StatusIndicator from "./StatusIndicator.svelte";
    import BadgeShield from "./BadgeShield.svelte";
    import {onBehalfOfDisplayName} from "../../util/onBehalfOf";
    import placeholder from "../../icons/forms/image-placeholder.svg";

    export let badge;
    export let badgeClass;
    export let standAlone = false;
    export let isPublic = false;
    export let withHeaderData;
    export let withPendingEnrollments = false;
    export let linksEnabled = true;

    const detailLink = e => {
        if (e.target && e.target.href && e.target.target && e.target.target === "_blank") {
            window.open(e.target.href, e.target.target);
            return;
        }
        if (!linksEnabled) {
            return;
        }
        if (badge && badge.isDirectAward) {
            navigate(`/direct-award/${badge.entityId}`);
        } else if (isPublic) {
            navigate(`/public/${badgeClass.entityId}`);
        } else if (badge && badge.importedBadge) {
            navigate(`/import/${badge.entity_id}`);
        } else if (!standAlone) {
            navigate(badge ? `/details/${badge.entityId}` : `/badgeclass/${badgeClass.entityId}`);
        }
    }

    onMount(() => {
        badgeClass.studyLoadValue = badgeClass.studyLoad ?
            I18n.t("teacher.badgeclasses.hours", {value: badgeClass.studyLoad}) : badgeClass.ects ?
                I18n.t("teacher.badgeclasses.ects", {value: badgeClass.ects}) : null;
        badgeClass.timeInvestmentValue = badgeClass.timeInvestment ?
            I18n.t("teacher.badgeclasses.hours", {value: badgeClass.timeInvestment}) : null;
    });
</script>

<style lang="scss">
    .badge {
        display: flex;
        flex-direction: column;
        background-color: var(--grey-2);
        position: relative;
        width: 100%;

        &:not(.stand-alone) {
            cursor: pointer;
            margin: 0;
        }

        &:not(.links-enabled) {
            cursor: default;
        }

        &.stand-alone {
            margin: auto;
        }
    }

    .header-regular-height {
        min-height: 230px;
    }

    .header-extra-height {
        min-height: 280px;
    }

    .header {
        display: flex;
        text-align: center;
        flex-direction: column;
        background-color: white;
        border-radius: 14px;

    }

    .header span {
        font-size: 22px;
        margin: 15px 0 0 0;
    }

    .header img {
        max-height: 200px;
        max-width: 200px;
        margin: 15px auto;
    }

    .content {
        display: flex;
        flex-direction: column;
        padding: 15px;
        height: 100%;
    }

    .content-header span.name {
        font-size: 22px;
        margin-bottom: 15px;
        display: inline-block;
        line-height: 24px;
    }

    .details {
        display: flex;
        flex-direction: row;
        position: relative;
    }

    .vert-center {
        display: flex;
        justify-content: space-around;
        width: 66px;
        height: 66px;
    }

    .details .issuer-img {
        width: 55px;
        height: 55px;
        margin-right: 15px;
        display: flex;
        justify-content: space-around;
        background-color: white;
    }

    .image-center-v {
        min-height: 230px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        position: relative;

        &.direct-award img {
            opacity: 0.5;
        }

        span.direct-award-action {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            color: white;
            cursor: pointer;
            background: var(--purple);
            padding: 15px;
            max-width: 90%;
            border-radius: var(--card-border-radius);
            line-height: 26px;

            &:hover {
                background-color: var(--purple-8);
                color: var(--purple-1);
            }
        }
    }

    .issuer-icon {
        display: block;
        height: 70%;
        width: 70%;
        align-self: center;
    }

    .details div.issued {
        display: flex;
        flex-direction: column;
    }

    .details div.issued span {
        margin-bottom: 4px;
    }

    .details span.issued-by {
        color: var(--purple);
        font-size: 16px;
    }

    .details span.faculty {
        font-size: 13px;
        color: var(--grey-8);
    }

    .details div.study-load {
        margin-left: auto;
        align-self: end;
        display: flex;
        flex-direction: column;
    }

    .details div.study-load span.study-load-label {
        font-size: 16px;
        color: var(--purple);
        margin-bottom: 4px;
        width: 72px;
        word-break: keep-all;
    }

    .details div.study-load span.study-load-value {
        align-self: flex-end;
    }

</style>

{#if badge || badgeClass}
    <div class="card badge" class:links-enabled={linksEnabled} class:stand-alone={standAlone}
         on:click|preventDefault|stopPropagation={detailLink}>

        {#if withPendingEnrollments || isPublic}
            <StatusIndicator badge={badge} badgeClass={badgeClass}/>
        {:else }
            <StatusIndicator badge={badge}/>
        {/if}


        <div class="header {withHeaderData ? 'header-extra-height' : 'header-regular-height'}">
            {#if badge}
                <span>{badge.isDirectAward ? moment(badge.createdAt).format('MMM D, YYYY') : moment(badge.issuedOn).format('MMM D, YYYY')}</span>
                <BadgeShield badge={badge}/>
            {/if}
            <div class="image-center-v" class:direct-award={badge && badge.isDirectAward}>
                {#if badgeClass.image}
                    <img src="img/issuer_badgeclass.png" class="lazyload" data-src={badgeClass.image} alt="{badgeClass.name}"/>
                {:else}
                    {@html placeholder}
                {/if}

                {#if badge && badge.isDirectAward}
                    <span class="direct-award-action">
                        {I18n.t("models.badge.claimDirectAward")}
                    </span>
                {/if}
            </div>
        </div>
        <div class="content">
            <div class="content-header">
                <span class="name">{badgeClass.name}</span>
            </div>

            <div class="details">
                <div class="vert-center">
                    <div class="issuer-img">
                        {#if badgeClass.issuer.image}
                            <img class="lazyload" src="img/issuer.png" data-src={badgeClass.issuer.image} alt=""/>
                        {:else}
                            <span class="issuer-icon">{@html issuerIcon}</span>
                        {/if}
                    </div>
                </div>
                <div class="issued">
                    <span class="issued-by">{I18n.t("models.badge.issuedBy")}</span>
                    {#if badgeClass.issuer.faculty}
                        {#if badgeClass.issuer.faculty.onBehalfOf || badgeClass.issuer.faculty.on_behalf_of}
                            <span class="faculty">
                                {@html I18n.t("models.badgeclass.onBehalfOf",
                                    {
                                        issuer: badgeClass.issuer.name,
                                        issuerGroup: onBehalfOfDisplayName(badgeClass.issuer.faculty)
                                    })}
                            </span>
                        {:else}
                            <span class="issuer">{badgeClass.issuer.name}</span>
                            <span class="faculty">({badgeClass.issuer.faculty.name})</span>
                        {/if}
                    {/if}
                </div>
                {#if badgeClass.studyLoadValue}
                    <div class="study-load">
                        <span class="study-load-label">{I18n.t('models.badgeclass.studyLoad')}</span>
                        <span class="study-load-value">{badgeClass.studyLoadValue}</span>
                    </div>
                {/if}
                {#if badgeClass.timeInvestmentValue}
                    <div class="study-load">
                        <span class="study-load-label">{I18n.t('models.badgeclass.timeInvestment')}</span>
                        <span class="study-load-value">{badgeClass.timeInvestmentValue}</span>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}
