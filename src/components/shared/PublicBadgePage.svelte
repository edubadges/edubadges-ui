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
  let enrolled;

  onMount(() => {
    if (visitorRole === role.STUDENT) {
      getUnearnedBadges().then(enrollments => {
        console.log(enrollments);
        enrolled = Boolean(enrollments.reduce((acc, el) => {
          return acc || el['badge_class']['entity_id'] === entityId
        }, false));
      });
    }

    getPublicBadgeClass(entityId).then(res => {
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
    })
  });
</script>

<div class="page-container">
  <EntityHeader
    entity="badgeclass"
    object={badgeClass}
    visitorRole={visitorRole}
    enrolled={enrolled}
    entityId={entityId}
  >
  </EntityHeader>

  {#if !isEmpty(badgeClass)}
    <Overview badgeclass={badgeClass} />
  {/if}
</div>