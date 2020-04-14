<script>
  import { navigate } from "svelte-routing";
  import { AwardBadgeForm } from "../teachers";
  import { Field, File, TextInput } from "../forms";
  import I18n from "i18n-js";

  export let entityId;
  export let emailFields;

  const entity = "badge";
  let errors = {};

  const addEmailField = () => {
    emailFields = [...emailFields, {'emailaddress': ''}];
  };

  function onSubmit() {
    errors = {};

    entityId = '';

    // const args = isCreate ? [faculty] : [entityId, faculty];
    // const apiCall = isCreate ? createFaculty : editFaculty;
    //
    // apiCall(...args)
    //   .then(res => navigate(`/manage/faculty/${res.entityId}`))
    //   .catch(err => err.then(({ fields }) => (errors = fields)));
  }
</script>

<style>
  .add-email {
    color: green;
    border: none;
    background-color: inherit;
    font-size: 16px;
  }
</style>

<button on:click={() => console.log(emailFields)}>asdf</button>

<AwardBadgeForm bulkAward={false} submit={onSubmit}>

  {#each emailFields as emailField}
    <Field {entity} attribute="emailaddress" errors={errors.name}>
        <TextInput bind:value={emailField.emailaddress} error={errors.name} />
    </Field>
  {/each}

  <div>
    <button class="add-email" on:click={() => addEmailField()}>+ Add another</button>
      or
    <button class="add-email">add many at once</button>
  </div>

</AwardBadgeForm>
