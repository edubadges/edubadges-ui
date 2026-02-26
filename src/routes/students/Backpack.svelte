<script>
    import I18n from "i18n-js";
    import Spinner from "../../components/Spinner.svelte";
    import {onMount} from "svelte";
    import {redirectPath, userHasClosedWelcome} from "../../stores/user";
    import {Welcome} from "../../components/students";
    import {queryData} from "../../api/graphql";
    import {studentBadgeInstances} from "../../api/queries";
    import {sortCreatedAt} from "../../stores/filterBadges";
    import {ects, eqf, extensionValue, studyLoad, timeInvestment} from "../../components/extensions/badges/extensions";
    import ViewSelector from "../../components/shared/ViewSelector.svelte";
    import {translateProperties} from "../../util/utils";
    import {getService} from "../../util/getService";
    import {role} from "../../util/role";
    import {requestLoginToken} from "../../api";
    import Modal from "../../components/forms/Modal.svelte";
    import BadgePanel from "../../components/students/BadgePanel.svelte";

    let loaded = false;
    let badges = [];
    let view = "cards";

    const secureQuery = `query {
    currentUser {
      validatedName,
    },
  }`;

    onMount(() => {
        const promises = [queryData(studentBadgeInstances), queryData(secureQuery)];

        Promise.all(promises).then(all => {
            const res = all[0];
            const directAwards = res.directAwards || [];

            directAwards.forEach(da => da.isDirectAward = true);

            const badgeInstances = sortCreatedAt(directAwards.concat(res.badgeInstances.filter(bi => !bi.revoked)));
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

    $: showWelcome = loaded && !badges.some(badge => badge.acceptance !== "UNACCEPTED") && !$userHasClosedWelcome;

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
        <h3>{I18n.t('backpack.title')}</h3>
        <ViewSelector bind:view={view}/>
    </div>
    {#if showWelcome}
        <Welcome/>
    {/if}
    {#if loaded}
        <BadgePanel badges={badges} view={view}/>
    {:else}
        <Spinner/>
    {/if}
</div>
