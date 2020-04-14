<script>
  import { navigate } from "svelte-routing";
  import { AwardBadgeForm } from "../teachers";
  import { Field, File, TextInput } from "../forms";
  import I18n from "i18n-js";

  export let entityId;

  const entity = "badge";
  let errors = {};
  let isCreate = !entityId;

  let emailaddress;

  function onSubmit() {
    errors = {};

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

<AwardBadgeForm bulkAward={false}>

    <Field {entity} attribute="emailaddress" errors={errors.name}>
        <TextInput bind:value={emailaddress} error={errors.name} />
    </Field>

  <div>
    <button class="add-email">+ Add another</button> or <button class="add-email">add many at once</button>
  </div>

</AwardBadgeForm>
