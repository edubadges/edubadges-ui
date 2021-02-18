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
  .badge {
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
    padding: 20px 25px 15px 15px;
    cursor: pointer;
    margin-bottom: 20px;
    border-top: 1px solid var(--grey-4);

    &:first-child {
      border-top: 2px solid var(--purple);
    }

    &:last-child {
      border-top: 1px solid var(--grey-4);
    }
  }

  img {
    border-radius: 8px;

    &.badge-class-img {
      max-height: 95px;
      max-width: 95px;

    }

    &.issuer-img {
      width: 35px;
      height: 35px;
      margin-right: 190px;
      margin-left: auto;
    }
  }

  section.meta-data, section.institution {
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


</style>

{#if badge || badgeClass}
  <div class="badge" on:click|preventDefault|stopPropagation={detailLink}>

    <StatusIndicator badge={badge}/>
    <BadgeShield badge={badge}/>
    <img class="badge-class-img" src={badgeClass.image} alt=""/>
    <section class="meta-data">
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
    </section>
    {#if badgeClass.issuer.image}
      <img class="issuer-img" src={badgeClass.issuer.image} alt=""/>
    {:else}
      <span class="issuer-icon">{@html issuerIcon}</span>
    {/if}

    <section class="institution">
      <span class="name">{badgeClass.issuer.faculty.institution.name}</span>
      <span class="issuer">{badgeClass.issuer.name}</span>
      <span class="faculty">({badgeClass.issuer.faculty.name})</span>
    </section>
  </div>

{/if}
