<script>
  import I18n from "i18n-js";
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { isEmpty } from "lodash";

  import { headerStaff, headerEntity } from "../../api/queries";
  import {
    ects,
    educationProgramIdentifier,
    eqf,
    extensionValue,
    language,
    learningOutcome
  } from "../../components/extensions/badges/extensions";
  import { fallBackValue } from "../../util/forms";
  import Overview from "../../components/teachers/badgeclass/Overview.svelte";
  import Badge from "../../components/shared/Badge.svelte";

  export let enrollmentId;
  let enrollment;
  let badgeClass;

  const query = `{
    enrollment(id: "${enrollmentId}") {
      entityId,
      dateCreated,
      dateConsentGiven,
      dateAwarded,
      denied,
      badgeClass {
        entityId,
        name,
        image,
        criteriaText,
        issuer {
          name,
          image,
          faculty {
            name
          }
        },
        extensions {
          name,
          originalJson
        }
      },
    }
  }` ;

  onMount(() => {
    queryData(query).then(res => {
      enrollment = res.enrollment;
      badgeClass = enrollment.badgeClass;
    });
  });

</script>

<style>
  div.badge-detail {
    padding: 40px 140px;
  }

  @media (max-width: 1120px) {
    .badge-detail {
      padding: 40px 20px !important;
    }
  }


</style>
<div class="badge-detail">
  {#if !isEmpty(badgeClass)}
    <Overview badgeclass={badgeClass} requested={enrollment.dateCreated} enrollmentId={enrollment.entityId}
              studentEnrolled={true}/>
  {/if}
</div>