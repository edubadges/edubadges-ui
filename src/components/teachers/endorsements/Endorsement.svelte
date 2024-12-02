<script>
    import I18n from "i18n-js";
    import {translateBadgeClassProperties} from "../../../util/utils";
    import {onMount} from "svelte";
    import externalLink from "../../../icons/external-link-alt.svg";
    import MarkdownField from "../../forms/MarkdownField.svelte";
    import BadgeClassIssuerGroupLink from "../BadgeClassIssuerGroupLink.svelte";

    export let endorsement;
    export let toggleEndorsement;
    export let showDetails;

    onMount(() => {
        translateBadgeClassProperties(endorsement.endorser);
    })

</script>

<style lang="scss">

    .content {
        display: flex;

        .img-container {
            flex-shrink: 0;
            height: 100px;
            width: 100px;
            display: flex;
        }

        .img-icon {
            :global(img) {
                max-width: 85px;
                max-height: 85px;
            }
        }


        .info {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .badge-class-sub-info {
            display: flex;
            align-items: center;

            div.sub-img-container {
                width: 50px;
                height: auto;
            }

            div.right {
                margin-left: 15px;
                display: flex;
                flex-direction: column;

                span.top {
                    display: inline-block;
                    margin-bottom: 5px;
                }

            }
        }


    }

    h4 {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 15px;

        &.black {
            color: black;
        }

        display: flex;
        align-content: center;

        &.header {
            margin-bottom: 2px;
        }

        a.external-link {
            font-weight: bold;
            display: inline-block;
            margin-bottom: 5px;
        }

        :global(a.external-link svg) {
            width: 16px;
            height: auto;
            margin: auto 0 0 8px;
            color: var(--grey-8);
        }
    }

    p.details {
        margin-bottom: 20px;
    }

    @media (max-width: 1120px) {
        .content {
            flex-direction: column;
        }
    }


</style>
<div class="content-container">
    <div class="content">
        {#if endorsement.endorser.image}
            <div class="img-container">
                <div class="img-icon">
                    <img src={endorsement.endorser.image} alt=""/>
                </div>
            </div>
        {/if}
        <div class="info">
            <h4 class="black">{endorsement.endorser.name}
                <a class="external-link" target="_blank"
                   href={`/public/${endorsement.endorser.entityId}`}>{@html externalLink}</a>
            </h4>
            <div class="badge-class-sub-info">
                {#if endorsement.endorser.issuer.image}
                    <div class="sub-img-container">
                        <img src={endorsement.endorser.issuer.image} alt=""/>
                    </div>
                {/if}
                <BadgeClassIssuerGroupLink isPublic={false} badgeClass={endorsement.endorser}/>
            </div>
        </div>

    </div>
    {#if showDetails}
        <h4 class="header">{I18n.t("endorsements.claim")}</h4>
        <p class="details">{endorsement.claim}</p>

        {#if endorsement.description}
            <h4 class="header">{I18n.t("endorsements.description")}</h4>
            <p class="details">{endorsement.description}</p>
        {/if}

        {#if endorsement.endorser.description}
            <h4 class="header">{I18n.t("endorsements.badgeClassDescription")}</h4>
            <p class="details">
                <MarkdownField value={endorsement.endorser.description} disabled={true}/>
            </p>

        {/if}

    {/if}
    <a href="/toggle"
       on:click|preventDefault|stopPropagation={toggleEndorsement}>
        {I18n.t(`toggle.${showDetails ? "showLess" : "showMore"}`) }
    </a>
</div>
