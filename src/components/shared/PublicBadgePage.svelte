<script>
    import {onMount} from "svelte";
    import {navigate} from "svelte-routing";
    import Spinner from "../../components/Spinner.svelte";
    import BadgeCard from "../../components/shared/BadgeCard.svelte";
    import BadgeClassDetails from "../../components/shared/BadgeClassDetails.svelte";
    import {getPublicBadge, validateName} from "../../api";
    import {publicBadgeInformation} from "../extensions/badges/extensions";
    import BadgeValidation from "../../routes/students/BadgeValidation.svelte";
    import BadgeInstanceEvidence from "./BadgeInstanceEvidence.svelte";
    import BadgeHeader from "../students/BadgeHeader.svelte";

    export let entityId;

    let badge = {};
    let evidences = [];

    let validation = {};
    let validatedName;
    let loaded;

    onMount(() => {
        getPublicBadge(entityId).then(res => {
            badge = res.badge;
            evidences = res.evidence;
            badge.issuedOn = res.issuedOn;
            badge.expires = res.expires;
            badge.updatedAt = res.updatedAt;
            badge.verfication = res.verification.type;
            badge.entityId = entityId;
            publicBadgeInformation(badge, res.badge);
            badge.gradeAchieved = res.badge.grade_achieved;

            validateName(encodeURIComponent(res.recipient.identity), encodeURIComponent(res.recipient.salt))
                .then(res => {
                    validatedName = res.name;
                    loaded = true
                });
        }).catch(() => navigate("/404?public=true"));
    });
</script>

<style lang="scss">
    div.badge-public-detail-container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    div.badge-validation {
        background-color: var(--grey-2);
        padding: 20px 40px;
    }

    div.badge-public-detail {
        padding: 10px 40px;
    }

    div.badge-card-container {
        display: flex;
        max-width: 320px;
        margin: 10px auto 40px auto;
    }

    @media (max-width: 1120px) {
        .badge-public-detail {
            padding: 40px 20px !important;
        }
    }
</style>

{#if loaded}
    <div class="badge-public-detail-container">
        <BadgeHeader title={badge.name}/>
        <div>
            <div class="badge-card-container">
                <BadgeCard badgeClass={badge} standAlone={true} withHeaderData={false}/>
            </div>
        </div>
        <div class="badge-validation">
            <BadgeValidation badge={badge} validatedName={validatedName}/>
        </div>
        <div class="badge-public-detail">
            <BadgeClassDetails badgeclass={badge}
                               badge={{
                                   entityId: entityId,
                                   gradeAchieved: badge.gradeAchieved,
                                   issuedOn: badge.issuedOn,
                                   expiresAt: badge.expires
                               }}/>
        </div>
        <BadgeInstanceEvidence evidences={evidences}/>
    </div>
{:else}
    <Spinner/>
{/if}
