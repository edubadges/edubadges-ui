<script>
  import {onMount} from "svelte";
  import moment from "moment";
  import I18n from "i18n-js";
  import {navigate} from "svelte-routing";

  export let badgeClass;
  export let enrollmentId;
  export let denied = false;

  const detailLink = () => {if (enrollmentId) navigate(`/enrollment/${enrollmentId}`);};

  onMount(() => {
    badgeClass.studyLoadValue = badgeClass.studyLoad ?
      I18n.t("teacher.badgeclasses.hours", {value: badgeClass.studyLoad}) : badgeClass.ects ?
      I18n.t("teacher.badgeclasses.ects", {value: badgeClass.ects}) : null;
    badgeClass.timeInvestmentValue = badgeClass.timeInvestment ?
      I18n.t("teacher.badgeclasses.hours", {value: badgeClass.timeInvestment}) : null;

  });
</script>

<style>
  .badge {
    display: flex;
    flex-direction: column;
    background-color: var(--grey-2);
    width: 100%;
    position: relative;
  }

  .pointer {
    cursor: pointer;
  }

  .header {
    text-align: center;
    background-color: white;
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

  span.status-indicator {
    display: inline-block;
    position: absolute;
    border-radius: 14px;
    box-shadow: 0 1px 0 1px var(--grey-4);
    font-weight: bold;
    font-size: 14px;
    padding: 4px 8px;
    text-align: center;
    left: 10px;
    top: -14px
  }

  span.status-indicator.denied {
    background-color: var(--red-medium);
    max-width: 65px;
    color: white;
  }

  .details {
    display: flex;
    flex-direction: row;
  }

  .details img {
    max-width: 55px;
    margin-right: 15px;
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
    word-break: keep-all;
  }

  .details div.study-load span.study-load-value {
    align-self: flex-end;
  }
</style>

<div class="card badge {enrollmentId ? 'pointer': ''}" on:click|preventDefault|stopPropagation={detailLink}>
  {#if denied}
    <span class="status-indicator denied">{I18n.t("models.enrollment.denied")}</span>
  {/if}
  <div class="header">
    <img src={badgeClass.image} alt=""/>
  </div>
  <div class="content">
    <div class="content-header">
      <span class="name">{badgeClass.name}</span>
    </div>

    <div class="details">
      <img src={badgeClass.issuer.image} alt=""/>
      <div class="issued">
        <span class="issued-by">Issued by</span>
        <span class="issuer">{badgeClass.issuer.name}</span>
        {#if badgeClass.issuer.faculty}
          <span class="faculty">({badgeClass.issuer.faculty.name})</span>
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
