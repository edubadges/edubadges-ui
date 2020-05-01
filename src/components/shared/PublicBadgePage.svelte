<script>
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {role} from "../../util/role";
  import {getPublicBadgeClass} from "../../api";
  import {isEmpty} from "lodash";
  import {EntityHeader} from "../teachers";
  import {Overview} from "../teachers/badgeclass/index";
  import {Spinner} from "../index";

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
      debugger;
      badgeClass = res;
      badgeClass.criteriaUrl = res['criteria']['id'];
      badgeClass.criteriaText = res['criteria']['narrative'];
      if (res['extensions:LanguageExtension']) {
        badgeClass.language = res['extensions:LanguageExtension']['Language'];
      }
      if (res['extensions:ECTSExtension']) {
        badgeClass.ects = res['extensions:ECTSExtension']['ECTS'];
      }
      if (res['extensions:EQFExtension']) {
        badgeClass.eqf = res['extensions:EQFExtension']['EQF'];
      }
      if (res['extensions:LearningOutcomeExtension']) {
        badgeClass.learningOutcome = res['extensions:LearningOutcomeExtension']['LearningOutcome'];
      }
      if (res['extensions:EducationProgramIdentifierExtension']) {
        badgeClass.educationProgramIdentifier = res['extensions:EducationProgramIdentifierExtension']['EducationProgramIdentifier'];
      }
      //When using graphQL the extensions field is an array - for compatibility we set an empty array as we already populated the badgeClass
      badgeClass.extensions = [];
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