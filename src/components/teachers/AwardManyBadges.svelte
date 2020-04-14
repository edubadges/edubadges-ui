<script>
  import { navigate } from "svelte-routing";
  import { AwardBadgeForm } from "../teachers";
  import { Field, File, TextInput } from "../forms";
  import I18n from "i18n-js";

  export let badgeId;
  export let emailAddresses = [];

  const entity = "badge";
  let errors = {};

  const bulkAward = (emailaddresses) => {
    console.log('direct award', emailaddresses, badgeId)
  };

  function onSubmit() {
    errors = {};

    bulkAward(emailAddresses);
  }
</script>

<AwardBadgeForm bulkAward={true} submit={onSubmit}>

    <Field {entity} attribute="emailaddresses" errors={errors.name}>
        <TextInput error={errors.name} />
    </Field>

</AwardBadgeForm>
