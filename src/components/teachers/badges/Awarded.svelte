<script>
  import I18n from "i18n-js";
  import { Button } from "../../../components";
  import Table from "./Table";

  export let assertions = [];

  let selection = [];
</script>

<Table collection={assertions} bind:value={selection}>
  <span slot="check-buttons">
    <Button
      small
      disabled
      action={() => {}}
      text={I18n.t('teacher.badgeRevoked.revoke')} />
  </span>
</Table>
