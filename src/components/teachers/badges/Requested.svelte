<script>
  import I18n from "i18n-js";
  import { Button } from "../../../components";
  import { awardBadges } from "../../../api";
  import Table from "./Table";

  export let entityId;
  export let enrollments = [];

  let selection = [];

  function award() {
    awardBadges(entityId, selection);
  }
</script>

<Table collection={enrollments} bind:value={selection}>
  <span slot="check-buttons">
    <Button small action={award} text={I18n.t('teacher.badgeRequests.award')} />
  </span>
</Table>
