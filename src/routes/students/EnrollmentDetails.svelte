<script>

  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { isEmpty } from "lodash";
  import Overview from "../../components/teachers/badgeclass/Overview.svelte";
import I18n from "i18n-js";

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
        },
        alignments {
          targetName,
          targetUrl,
          targetCode,
          targetFramework,
          targetDescription
        }
      }
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
  div.enrollment-detail {
    padding: 40px 140px;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1120px) {
    .enrollment-detail {
      padding: 40px 20px !important;
    }
  }


</style>
<div class="enrollment-detail">
  {#if !isEmpty(badgeClass)}
    <Overview badgeclass={badgeClass} requested={enrollment.dateCreated} enrollmentId={enrollment.entityId}
              studentEnrolled={true} studentPath={I18n.t("student.enrollments")}/>
  {/if}
</div>
