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

  const detailLink = () => navigate(badge ? `/details/${badge.entityId}` : `/badgeclass/${badgeClass.entityId}`);

  onMount(() => {
    badgeClass.studyLoadValue = badgeClass.studyLoad ?
      I18n.t("teacher.badgeclasses.hours", {value: badgeClass.studyLoad}) : badgeClass.ects ?
        I18n.t("teacher.badgeclasses.ects", {value: badgeClass.ects}) : null;
  });
</script>

<style lang="scss">
  tr.badge {
    position: relative;
    cursor: pointer;
    margin-bottom: 15px;
    border-top: 1px solid var(--grey-4);

    &:first-child {
      border-top: 2px solid var(--purple);
    }

    &:last-child {
      border-top: 1px solid var(--grey-4);
    }

    td {
      padding: 15px 0;
    }

    td.badge-status {
          position: relative;
          width: 115px;
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
  <tr class="badge" on:click|preventDefault|stopPropagation={detailLink}>
    <td class="badge-class-img">
      <img src={badgeClass.image} alt=""/>
    </td>
    {#if badge}
      <td class="badge-status">
        <StatusIndicator badge={badge}/>
        <BadgeShield badge={badge}/>
      </td>
    {/if}
    <td class="meta-data">
      <span class="name">{badgeClass.name}</span>
      {#if badgeClass.studyLoadValue}
        <div class="study-load">
          <span class="label">{I18n.t('models.badgeclass.studyLoad')}:</span>
          <span class="value">{badgeClass.studyLoadValue}</span>
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
        <img class="issuer-img" src={badgeClass.issuer.image} alt=""/>
      {:else}
        <span class="issuer-icon">{@html issuerIcon}</span>
      {/if}
    </td>
    <td class="institution">
      <span class="name">{badgeClass.issuer.faculty.institution.name}</span>
      <span class="issuer">{badgeClass.issuer.name}</span>
      <span class="faculty">{badgeClass.issuer.faculty.name}</span>
    </td>
  </tr>

{/if}
