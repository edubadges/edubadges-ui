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

    export let revalidateName;

    let loaded = false;
    let badges = [];
    let view = "cards";
    let showStepupDialog = false;
    let showNoValidatedNameDialog = false;

    const goToEduId = () => {
        $redirectPath = window.location.pathname;
        requestLoginToken(getService(role.STUDENT), true);
    };

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

            const validatedName = all[1].currentUser.validatedName;
            if (directAwards.length > 0 && !validatedName) {
                showStepupDialog = true;
            } else if (!validatedName && revalidateName) {
                showNoValidatedNameDialog = true;
            }
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
{#if showStepupDialog}
    <Modal
            submit={goToEduId}
            title={I18n.t("publicBadge.noValidatedNameModal.noLinkedInstitution")}
            question={I18n.t("publicBadge.noValidatedNameModal.directAwards")}
            evaluateQuestion={true}
            cancel={() => showStepupDialog = false}
            submitLabel={I18n.t("publicBadge.noValidatedNameModal.goToEduID")}/>
{/if}

{#if showNoValidatedNameDialog}
    <Modal
            submit={goToEduId}
            title={I18n.t("acceptTerms.noValidatedNameTitle")}
            question={I18n.t("acceptTerms.noValidatedName")}
            evaluateQuestion={true}
            cancel={() => showNoValidatedNameDialog = false }
            submitLabel={I18n.t("publicBadge.noValidatedNameModal.goToEduID")}/>
{/if}

