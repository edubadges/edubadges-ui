<script>
  import { navigate } from "svelte-routing";
  import { AwardBadgeForm } from "../teachers";
  import { Field, File, TextInput } from "../forms";
  import I18n from "i18n-js";

  export let badgeId;
  export let emailFields;

  const entity = "badge";
  let errors = {};

  const addEmailField = () => {
    emailFields = [...emailFields, {'emailaddress': ''}];
  };

  const award = (badgeId, emailaddresses) => {
    console.log('direct award', emailaddresses, badgeId)
  };

  function onSubmit() {
    errors = {};

    award(badgeId, emailFields.map(el => el.emailaddress));
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

  {#each emailFields as emailField}
    <Field {entity} attribute="emailaddress" errors={errors.name}>
        <TextInput bind:value={emailField.emailaddress} error={errors.name} />
    </Field>
  {/each}

  <div>
    <button class="add-email" on:click={() => addEmailField()}>{I18n.t(['manage', 'award', 'addAnother'])}</button>
      or
    <a class="add-email" href="bulkAward">{I18n.t(['manage', 'award', 'addBulk'])}</a>
  </div>

</AwardBadgeForm>
