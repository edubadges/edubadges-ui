<script>
  import {onMount} from "svelte";
  import I18n from "i18n-js";
  import {queryData} from "../../api/graphql";
  import {role} from "../../util/role";
  import {getPublicBadgeClass} from "../../api";
  import {isEmpty} from "lodash";
  import {EntityHeader} from "../teachers";
  import {Overview} from "../teachers/badgeclass/index";
  import {Button, Spinner} from "../index";
  import {publicBadgeInformation} from "../extensions/badges/extensions";
  import {userLoggedIn, redirectPath} from "../../stores/user";
  import {navigate} from "svelte-routing";

  export let entityId;
  export let visitorRole;

  let badgeClass = {};
  let enrollmentId;
  let studentEnrolled;
  let requestedDate;

  let isGuest = false;

  const login = () => {
    $redirectPath = window.location.pathname;
    navigate("/login");

  }

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
    entityId={entityId}>
    {#if visitorRole === role.GUEST}
      <div class="slots">
        <Button text={I18n.t("login.loginToEnrol")} action={login}/>
      </div>
    {/if}
  </EntityHeader>

  {#if !isEmpty(badgeClass)}
    <Overview badgeclass={badgeClass} studentEnrolled={studentEnrolled} enrollmentId={enrollmentId}
              requested={requestedDate} studentPath={I18n.t("student.enrollments")}/>
  {:else}
    <Spinner/>
  {/if}
</div>