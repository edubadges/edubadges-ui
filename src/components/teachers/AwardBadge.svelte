<script>
  import { navigate, link } from "svelte-routing";
  import { AwardBadgeForm } from "../teachers";
  import { Field, File, TextInput } from "../forms";
  import I18n from "i18n-js";
  import { emailAddresses } from "../../stores/badgeAwardEmails";
  import { onMount } from "svelte";

  export let entityId;

  const entity = "badge";
  let errors = {};

  onMount(() => {
    console.log('emailAddresses', $emailAddresses);
  });

  const addEmailField = () => {
    $emailAddresses = [...$emailAddresses, {'emailAddress': ''}];
  };

  const award = (badgeId, emailAddresses) => {
    // Long term
  };

  function onSubmit() {
    errors = {};

    award(entityId, $emailAddresses.map(el => el.emailAddress));
  }
</script>

<style>
  .add-email {
    color: green;
    border: none;
    background-color: inherit;
    font-size: 16px;
    padding: 0;
    margin-left: 5px;
    margin-right: 5px;
  }
</style>

<AwardBadgeForm bulkAward={false} submit={onSubmit}>

  {#each $emailAddresses as emailField}
    <Field {entity} attribute="emailAddress" errors={errors.name}>
      <TextInput bind:value={emailField.emailAddress} error={errors.name} />
    </Field>
  {/each}

  <div>
    <button class="add-email" on:click={() => addEmailField()}>{I18n.t(['manage', 'award', 'addAnother'])}</button>
      or
<!--    <a class="add-email" href="/bulkAward" on:click|preventDefault|stopPropagation={() => navigate("bulkAward")} >{I18n.t(['manage', 'award', 'addBulk'])}</a>-->
    <a class="add-email" href="bulkAward" use:link>{I18n.t(['manage', 'award', 'addBulk'])}</a>
  </div>

</AwardBadgeForm>
