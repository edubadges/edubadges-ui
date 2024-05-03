<script>
  import I18n from "i18n-js";
  import Spinner from "../../components/Spinner.svelte";
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {revokedStudentBadgeInstances} from "../../api/queries";
  import {sortCreatedAt} from "../../stores/filterBadges";
  import {ects, eqf, extensionValue, studyLoad, timeInvestment} from "../../components/extensions/badges/extensions";
  import ViewSelector from "../../components/shared/ViewSelector.svelte";
  import {translateProperties} from "../../util/utils";
  import BadgePanel from "../../components/students/BadgePanel.svelte";

  let loaded = false;
    let badges = [];
    let view = "cards";
    onMount(() => {
        queryData(revokedStudentBadgeInstances, {revoked: true}).then(res => {
            const badgeInstances = sortCreatedAt(res.revokedBadgeInstances);
            badgeInstances.forEach(badgeInstance => {
                const issuer = badgeInstance.badgeclass.issuer;
                translateProperties(issuer);
                translateProperties(issuer.faculty);
                translateProperties(issuer.faculty.institution);
            });

            badgeInstances.forEach(badge => {
                badge.badgeclass.studyLoad = extensionValue(badge.badgeclass.extensions, studyLoad);
                badge.badgeclass.timeInvestment = extensionValue(badge.badgeclass.extensions, timeInvestment);
                badge.badgeclass.ects = extensionValue(badge.badgeclass.extensions, ects);
                badge.badgeclass.eqf = extensionValue(badge.badgeclass.extensions, eqf);
            });
            badges = badgeInstances;
            loaded = true;
        });
    });

</script>

<style lang="scss">

    .header {
        display: flex;
        align-content: center;
    }

    h3 {
        font-size: 22px;
        margin-bottom: 30px;
    }

</style>

<div>
    <div class="header">
        <h3>{I18n.t('archived.title')}</h3>
        {#if badges.length > 0}
            <ViewSelector bind:view={view}/>
        {/if}
    </div>
    {#if loaded}
        {#if badges.length === 0}
            <p>{I18n.t("badgeRequests.noneArchived")}</p>
        {:else}
            <BadgePanel badges={badges} view={view}/>
        {/if}
    {:else}
        <Spinner/>
    {/if}
</div>
