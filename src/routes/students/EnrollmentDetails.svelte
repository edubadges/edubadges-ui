<script>

  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { isEmpty } from "lodash";
  import Overview from "../../components/teachers/badgeclass/Overview.svelte";

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
