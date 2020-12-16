<script>
  import { navigate } from "svelte-routing";
  import { AwardBadgeForm } from "../teachers";
  import { Field, File, TextInput } from "../forms";
  import I18n from "i18n-js";
  import { emailAddresses } from "../../stores/badgeAwardEmails";

  let emailData = '';

  const entity = "badge";
  let errors = {};

  const bulkAward = () => {
    const newAddresses = emailData.split('\n')
        .filter(word => word.length > 0)
        .map(el => {return {emailAddress: el}});
    $emailAddresses = [...$emailAddresses, ...newAddresses];
  };

  function onSubmit() {
    errors = {};

    bulkAward();
  }
</script>

<AwardBadgeForm bulkAward={true} submit={onSubmit}>

  <Field {entity} attribute="emailAddresses" errors={errors.name}>
    <TextInput bind:value={emailData} error={errors.name} area={true}/>
  </Field>

</AwardBadgeForm>
