<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import { Button } from "../../../components";
  import { awardBadges } from "../../../api";
  import { queryData } from "../../../api/graphql";
  import { enrollmentsQuery } from "../../../api/queries";
  import Table from "./Table";

  export let entityId;
  export let enrollments = [];

  let selection = [];

  const refreshEnrollments = () => {
    queryData(`{ ${enrollmentsQuery(entityId)} }`).then(res => {
      enrollments = res.badgeClass.pendingEnrollments;
    });
  };

  function award() {
    awardBadges(entityId, selection).then(refreshEnrollments);
  }
</script>

<Table collection={enrollments} bind:value={selection}>
  <span slot="check-buttons">
    <Button small action={award} text={I18n.t('teacher.badgeRequests.award')} />
  </span>
</Table>
