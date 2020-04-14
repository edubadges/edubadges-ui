<script>
  import { navigate } from "svelte-routing";
  import { AwardBadgeForm } from "../teachers";
  import { Field, File, TextInput } from "../forms";
  import I18n from "i18n-js";
  import { emailAddresses } from "../../stores/badgeAwardEmails";
  import { onMount } from "svelte";

  let emailData = '';

  const entity = "badge";
  let errors = {};

  onMount(() => {
    emailData = '';
    for (const emailAddress of $emailAddresses) {
      emailData = emailData.concat(emailAddress.emailAddress + '\n');
    }
  });

  const bulkAward = () => {
    $emailAddresses = emailData.split('\n')
        .filter(word => word.length > 0)
        .map(el => {return {emailAddress: el}});
    console.log($emailAddresses);
    window.history.back();
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
