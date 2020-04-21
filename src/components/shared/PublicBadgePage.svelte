<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { getUnearnedBadges } from "../../api";
  import { role } from "../../util/role";
  import { getPublicBadgeClass } from "../../api";
  import { isEmpty } from "lodash";
  import { EntityHeader } from "../teachers";
  import { Overview } from "../teachers/badgeclass/index";

  export let entityId;
  export let visitorRole;

  let badgeClass = {};
  let enroll;

  onMount(() => {
    if (visitorRole === role.STUDENT) {
      getUnearnedBadges().then(enrollments => {
          enroll = !Boolean(enrollments.reduce((acc, el) => {
            return acc || el.entityId === entityId
        }, false));
      });
    }

    getPublicBadgeClass(entityId).then(res => {
      console.log(res);
      badgeClass = res;
    })
  });
</script>

<div class="page-container">
  <EntityHeader
    entity="badgeclass"
    object={badgeClass}
    enroll={enroll}
  >
      <div>test</div>
      <div>test</div>
      <div>test</div>
  </EntityHeader>

  {#if !isEmpty(badgeClass)}
    <Overview badgeclass={badgeClass} />
  {/if}
</div>