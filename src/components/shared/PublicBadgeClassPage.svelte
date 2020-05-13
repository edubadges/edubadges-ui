<script>
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {role} from "../../util/role";
  import {getPublicBadgeClass} from "../../api";
  import {isEmpty} from "lodash";
  import {EntityHeader} from "../teachers";
  import {Overview} from "../teachers/badgeclass/index";
  import {Spinner} from "../index";
  import {publicBadgeInformation} from "../extensions/badges/extensions";

  export let entityId;
  export let visitorRole;

  let badgeClass = {};
  let enrollmentId;
  let studentEnrolled;
  let requestedDate;

  const query = `{
    enrollment(badgeClassId: "${entityId}") {
      entityId,
      dateCreated,
      dateConsentGiven,
      dateAwarded,
      denied,
      badgeInstance {
        revoked
      }
    }
  }`;

  onMount(() => {
    if (visitorRole === role.STUDENT) {
      queryData(query).then(res => {
        if (res.enrollment && (!res.badgeInstance || res.badgeInstance.revoked)) {
          studentEnrolled = true;
          enrollmentId = res.enrollment.entityId;
          requestedDate = res.enrollment.dateCreated;
        }
      });
    } else if (visitorRole === role.GUEST) {
      //TODO - show "Login to enroll" with redirect to student login with redirect to this page
    }

    getPublicBadgeClass(entityId).then(res => {
      badgeClass = res;
      publicBadgeInformation(badgeClass, res);
    })
  });
</script>

<div class="page-container">
  <EntityHeader
    entity="badgeclass"
    object={badgeClass}
    visitorRole={visitorRole}
    enrolled={studentEnrolled}
    entityId={entityId}
  >
  </EntityHeader>

  {#if !isEmpty(badgeClass)}
    <Overview badgeclass={badgeClass} studentEnrolled={studentEnrolled} enrollmentId={enrollmentId}
              requested={requestedDate}/>
  {:else}
    <Spinner/>
  {/if}
</div>