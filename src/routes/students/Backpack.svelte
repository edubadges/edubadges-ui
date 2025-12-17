<script>
    import I18n from "i18n-js";
    import {link} from "svelte-routing";
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
    let badgeClassIds = [];

    const goToEduId = () => {
        $redirectPath = window.location.pathname;
        requestLoginToken(getService(role.STUDENT), true);
    };

    const readBadgeClassIdsFromUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.getAll('filter.badgeclass_id');
    };

    const handleShowAllBadges = () => {
        badgeClassIds = [];
        loaded = false;
        getBadges().then((response) => {
            badges = response.badgeInstances;
            loaded = true;
        });
    }
    
    const secureQuery = `query {
      currentUser {
        validatedName,
      },
    }`;

    const getBadges = async () => {
      return queryData(studentBadgeInstances(badgeClassIds))
        .then((response) => {
          const directAwards = response.directAwards || [];
          directAwards.forEach(da => da.isDirectAward = true);
          
          const badgeInstances = sortCreatedAt(directAwards.concat(response.badgeInstances.filter(bi => !bi.revoked)));
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
          
          return { badgeInstances, directAwards };
        });
    }
    
    const getValidatedName = async () => {
      return queryData(secureQuery).then((response) => {
        return response.currentUser.validatedName;
      });
    }
    
    onMount(() => {
        badgeClassIds = readBadgeClassIdsFromUrl();
        let validatedName = null;
        let directAwards = [];
        
        getBadges().then((response) => {
          badges = response.badgeInstances;
          directAwards = response.directAwards;
          
          loaded = true;
        });
        
        getValidatedName().then((response) => {
          validatedName = response;
        });
        
        if (directAwards.length > 0 && !validatedName) {
          showStepupDialog = true;
        } else if (!validatedName && revalidateName) {
          showNoValidatedNameDialog = true;
        }
        
        loaded = true;
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

    .show-all-link {
        font-size: 14px;
        margin-top: 6px;
        margin-left: 1em;
        text-decoration: none;
        color: var(--purple);
        
        &:hover {
            text-decoration: underline;
        }
    }

</style>

<div>
    <div class="header">
        <h3>{I18n.t('backpack.title')}</h3>
        {#if badgeClassIds.length > 0}
            <a href="/backpack" use:link on:click={handleShowAllBadges} class="show-all-link">
                {I18n.t('backpack.showAllBadges')}
            </a>
        {/if}
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

