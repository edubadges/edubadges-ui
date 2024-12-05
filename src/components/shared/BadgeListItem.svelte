<script>
    import {onMount} from "svelte";
    import moment from "moment";
    import I18n from "i18n-js";
    import {navigate} from "svelte-routing";
    import {issuerIcon} from "../../icons";
    import StatusIndicator from "./StatusIndicator.svelte";
    import BadgeShield from "./BadgeShield.svelte";

    export let badge;
    export let badgeClass;
    export let isPublic = false;
    export let linksEnabled = true;

    const detailLink = () => {
        if (!linksEnabled) {
            return;
        }
        if (badge && badge.isDirectAward) {
            navigate(`/direct-award/${badge.entityId}`);
        } else if (isPublic) {
            navigate(`/public/${badgeClass.entityId}`);
        } else if (badge && badge.importedBadge) {
            navigate(`/import/${badge.entity_id}`);
        } else {
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
  tr.badge {
    position: relative;

    &.links-enabled {
      cursor: pointer;
    }

    margin-bottom: 15px;
    border-top: 1px solid var(--grey-4);

    &:last-child {
      border-bottom: 1px solid var(--grey-4);
    }

    &:first-child {
      border-top: 2px solid var(--purple);
    }

    td {
      padding: 15px 0;

      @media (max-width: 820px) {
        display: block;
      }
    }

    td.badge-status {
      width: 115px;
      text-align: center;
    }

    :global(td.badge-status div.shield) {
      margin-top: 10px;
    }

    td.badge-class-img {
      width: 95px;

      img {
        border-radius: 8px;
        height: 72px;
        width: auto;
      }
    }

    td.issuer {
      width: 40px;

      img {
        border-radius: 8px;
        width: 35px;
        height: 35px;

      }
    }

    td.meta-data, td.institution {
      display: flex;
      flex-direction: column;
      margin-left: 25px;

      span {
        margin-bottom: 8px;
        display: inline-block;

        &.name {
          font-size: 18px;
          font-weight: bold;
        }

      }
    }
  }

</style>

{#if badge || badgeClass}
  <tr class="badge" class:links-enabled={linksEnabled} on:click|preventDefault|stopPropagation={detailLink}>
    <td class="badge-class-img">
      <img src="img/issuer_badgeclass.png" data-src={badgeClass.image} class="lazyload" alt="{badgeClass.name}"/>
    </td>
    <td class="meta-data">
      <span class="name">{badgeClass.name}</span>
      {#if badgeClass.studyLoadValue}
        <div class="study-load">
          <span class="label">{I18n.t('models.badgeclass.studyLoad')}:</span>
          <span class="value">{badgeClass.studyLoadValue}</span>
        </div>
      {/if}
      {#if badgeClass.timeInvestmentValue}
        <div class="study-load">
          <span class="label">{I18n.t('models.badgeclass.timeInvestment')}:</span>
          <span class="value">{badgeClass.timeInvestmentValue}</span>
        </div>
      {/if}
      {#if badgeClass.eqf}
        <div class="eqf">
          <span class="label">{I18n.t('models.badgeclass.eqf')}:</span>
          <span class="value">{badgeClass.eqf}</span>
        </div>
      {/if}
      {#if badge}
        <span class="issued">{moment(badge.issuedOn).format('MMM D, YYYY')}</span>
      {/if}
    </td>
    <td class="issuer">
      {#if badgeClass.issuer.image}
        <img class="issuer-img lazyload" src="img/issuer_badgeclass.png" data-src={badgeClass.issuer.image} alt=""/>
      {:else}
        <span class="issuer-icon">{@html issuerIcon}</span>
      {/if}
    </td>
    <td class="institution">
      {#if badgeClass.issuer.faculty}
        <span class="name">{badgeClass.issuer.faculty.institution.name}</span>
        <span class="issuer">{badgeClass.issuer.name}</span>
        <span class="faculty">{badgeClass.issuer.faculty.name}</span>
      {:else}
        <span class="issuer">{badgeClass.issuer.name}</span>
      {/if}
    </td>
    {#if badge || badgeClass}
      <td class="badge-status">
        <StatusIndicator badge={badge} badgeClass={badgeClass} cardView={false}/>
        {#if badge}
          <BadgeShield badge={badge} cardView={false}/>
        {/if}
      </td>
    {/if}

  </tr>

{/if}
