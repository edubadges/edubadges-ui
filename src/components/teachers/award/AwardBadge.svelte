<script>
  import {Field, TextInput} from "../../forms";
  import I18n from "i18n-js";
  import Button from "../../Button.svelte";
  import Warning from "../../forms/Warning.svelte";
  import {link, navigate} from "svelte-routing";
  import trash from "../../../icons/trash.svg";
  import {validEmail} from "../../../util/forms";
  import Error from "../../forms/Error.svelte";
  import {createDirectAwards} from "../../../api";
  import {flash} from "../../../stores/flash";

  export let badgeclass;
  export let enrollments;
  export let refresh;
  export let existingDirectAwardsEppns;

  let errors = {};
  let errorsDuplications = {};
  let errorsAlreadyAwarded = {};

  let directAwards = [{email: "", eppn: ""}]

  const addDirectAward = () => {
    directAwards = [...directAwards, {email: "", eppn: ""}];
  }

  const removeDirectAward = index => () => {
    const newDirectAwards = directAwards.filter((item, i) => i !== index);
    invariant(newDirectAwards);
  }

  const init = e => e.focus();

  const emailOnBlur = i => e => {
    const val = e.target.value;
    setTimeout(() => errors = {...errors, [`email_${i}`]: !validEmail(val)}, 150);
    errorsDuplications = {
      ...errorsDuplications,
      [`email_${i}`]: directAwards.filter(da => da.email === val).length > 1 && val.trim().length > 0
    }
  }

  const eppnOnBlur = i => e => {
    const val = e.target.value;
    errors = {...errors, [`eppn_${i}`]: val.trim().length === 0}
    errorsDuplications = {
      ...errorsDuplications,
      [`eppn_${i}`]: directAwards.filter(da => da.eppn === val).length > 1  && val.trim().length > 0
    }
    errorsAlreadyAwarded = {
      ...errorsAlreadyAwarded,
      [`eppn_${i}`]: existingDirectAwardsEppns.some(eppn => eppn === val)
    }
  }

  const doAward = () => {
    createDirectAwards(directAwards, badgeclass, false)
      .then(() => {
        refresh(() => setTimeout(() => navigate(`/badgeclass/${badgeclass.entityId}/awarded`), 75));
        flash.setValue(I18n.t("badgeAward.directAward.flash.created"));
      });
  };

  //Need to rebuild the errors as in-between values might be removed
  const invariant = newDirectAwards => {
    errors = newDirectAwards.reduce((acc, da, i) => {
      acc[`eppn_${i}`] = da.eppn.trim().length === 0;
      acc[`email_${i}`] = !validEmail(da.email);
      return acc;
    }, {});
    errorsAlreadyAwarded = newDirectAwards.reduce((acc, da, i) => {
      acc[`eppn_${i}`] = existingDirectAwardsEppns.some(eppn => eppn === da.eppn);
      return acc;
    }, {});
    errorsDuplications = newDirectAwards.reduce((acc, da, i) => {
      acc[`eppn_${i}`] = newDirectAwards.filter(other => other.eppn === da.eppn).length > 1
      acc[`email_${i}`] = newDirectAwards.filter(other => other.email === da.email).length > 1
      return acc;
    }, {});
    directAwards = newDirectAwards;
  }

  $: disableSubmit = Object.values(errors).some(val => val) || Object.values(errorsDuplications).some(val => val) ||
    Object.values(errorsAlreadyAwarded).some(val => val);

</script>

<style lang="scss">
  div.award-badge {

    h2 {
      background: var(--purple-1);
      padding: var(--ver-padding-l) var(--hor-padding-l);
    }

    p.sub-title {
      margin-bottom: 20px;
    }

    div.warning-container {
      margin: 10px 0 20px 0;
    }

    .grouped {
      display: grid;
      grid-template-columns: 50% 50%;
      grid-row: auto;
      grid-column-gap: 40px;
      grid-row-gap: 16px;
      padding-right: 40px;
    }

    div.add-email {
      margin: 15px 5px 30px 0;
    }

    div.deletable-row {
      position: relative;
    }

    .rm-icon-container {
      color: purple;
      border: none;
      background-color: white;
      position: absolute;
      height: 30px;
      width: 30px;
      margin: 0 0 5px 0;
      align-self: center;
      cursor: pointer;
      right: 160px;
      top: 38px;
    }

    div.actions {
      display: flex;

    }

  }
</style>
<div class="award-badge">
  <h2>{I18n.t("badgeAward.directAward.title")}</h2>
  <div class="main-content-margin">
    <p class="sub-title">{I18n.t("badgeAward.directAward.subtitle")}</p>
    {#if enrollments.length > 0}
      <div class="warning-container">
        <Warning msg={I18n.t("badgeAward.directAward.waringEnrollments", {count: enrollments.length})}>
          <a use:link
             href={`/badgeclass/${badgeclass.entityId}/enrollments`}>{I18n.t("badgeAward.directAward.toToEnrollments")}</a>
        </Warning>
      </div>
    {/if}
    <div class="grouped">
      {#each directAwards as da, i}
        <Field entity="badgeAward" attribute="email">
          <TextInput bind:value={da.email} error={errors[`email_${i}`]} {init} onBlur={emailOnBlur(i)}/>
          {#if errors[`email_${i}`]}
            <Error standAlone={true} error_code={927}/>
          {/if}
          {#if errorsDuplications[`email_${i}`]}
            <Error standAlone={true} error_code={929}/>
          {/if}
        </Field>
        <div class="deletable-row">
          <Field entity="badgeAward" attribute="eppn">
            <TextInput bind:value={da.eppn} error={errors[`eppn_${i}`]} onBlur={eppnOnBlur(i)}/>
            {#if errors[`eppn_${i}`]}
              <Error standAlone={true} error_code={928}/>
            {/if}
            {#if errorsDuplications[`eppn_${i}`]}
              <Error standAlone={true} error_code={930}/>
            {/if}
            {#if errorsAlreadyAwarded[`eppn_${i}`]}
              <Error standAlone={true} error_code={931}/>
            {/if}
          </Field>
          {#if i !== 0}
            <button class="rm-icon-container" on:click={removeDirectAward(i)}>{@html trash}</button>
          {/if}
        </div>
      {/each}
    </div>
    <div class="add-email">
      <a on:click|preventDefault|stopPropagation={addDirectAward}
         href="/add">{I18n.t("badgeAward.directAward.addAnother")}</a>
    </div>
    <div class="actions">
      <Button action={() => history.back()} text={I18n.t("badgeAward.directAward.cancel")} secondary={true}
              marginRight={true}/>
      <Button action={doAward} text={I18n.t("badgeAward.directAward.award")} disabled={disableSubmit}/>
    </div>
  </div>
</div>





