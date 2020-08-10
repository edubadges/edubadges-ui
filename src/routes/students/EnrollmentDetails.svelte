<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { isEmpty } from "lodash";
  import {Overview} from "../../components/teachers/badgeclass/";
  import I18n from "i18n-js";
  import chevronRightSmall from "../../icons/chevron-right-small.svg";
  import {link} from "svelte-routing";

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
        description,
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

<style lang="scss">
  div.enrollment-detail {
    display: flex;
    flex-direction: column;
  }

  div.bread-crumb {
    padding: var(--ver-padding-m) var(--hor-padding-m);
    min-height: 47px;
    display: flex;
    align-items: center;

    span.icon {
      height: 14px;
      width: 14px;
      margin: auto 4px;
    }

    a {
      color: var(--text-color-grey);
    }

    span.current {
      font-weight: bold;
    }
  }

  @media (max-width: 1120px) {
    .enrollment-detail {
      padding: 40px 20px !important;
    }
  }
</style>

<div class="enrollment-detail">
  {#if !isEmpty(badgeClass)}
    <div class="bread-crumb">
      <a use:link href={`/badge-requests`}>{I18n.t("student.enrollments")}</a>
      <span class="icon">{@html chevronRightSmall}</span>
      <span class="current">{badgeClass.name}</span>
    </div>
    <Overview badgeclass={badgeClass} requested={enrollment.dateCreated} enrollmentId={enrollment.entityId}
              studentEnrolled={true} studentPath={I18n.t("student.enrollments")} showBreadCrumb={false}/>
  {/if}
</div>
