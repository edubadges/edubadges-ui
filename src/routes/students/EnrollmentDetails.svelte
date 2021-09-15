<script>
    import {onMount} from "svelte";
    import {queryData} from "../../api/graphql";
    import {isEmpty} from "lodash";
    import {Overview} from "../../components/teachers/badgeclass/";
    import I18n from "i18n-js";
    import chevronRightSmall from "../../icons/chevron-right-small.svg";
    import {link} from "svelte-routing";
    import {translateProperties} from "../../util/utils";
    import StudentBreadCrumb from "../../components/students/StudentBreadCrumb.svelte";
    import BadgeHeader from "../../components/students/BadgeHeader.svelte";

    export let enrollmentId;
    let enrollment;
    let badgeClass;

    const query = `query ($enrollmentId: String){
    enrollment(id: $enrollmentId) {
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
          nameDutch,
          nameEnglish,
          imageDutch,
          imageEnglish,
          faculty {
            nameDutch,
            nameEnglish,
            institution {
              nameDutch,
              nameEnglish,
              entityId
            }
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
  }`;

    onMount(() => {
        queryData(query, {enrollmentId}).then(res => {
            enrollment = res.enrollment;
            badgeClass = enrollment.badgeClass;

            const issuer = badgeClass.issuer;
            translateProperties(issuer);
            translateProperties(issuer.faculty);
            translateProperties(issuer.faculty.institution);
        });
    });
</script>

<style lang="scss">
  div.enrollment-detail {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  span.status-indicator {
    display: inline-block;
    position: absolute;
    border-radius: 14px;
    box-shadow: 0 1px 0 1px var(--grey-4);
    font-weight: bold;
    font-size: 14px;
    padding: 4px 8px;
    text-align: center;
    left: 40%;
    top: 6px;
    z-index: 99;
  }

  span.status-indicator.denied {
    background-color: var(--red-medium);
    max-width: 65px;
    color: white;
  }

  .overview-container {
    padding: 20px 40px 10px 40px;
    position: relative;
  }

  @media (max-width: 1120px) {
    .overview-container {
      padding: 20px;
    }

    .enrollment-detail {
      padding: 40px 20px !important;
    }
    span.status-indicator {
      left: 40%;
      top: 34px;
    }
  }
</style>

<div class="enrollment-detail">
  {#if !isEmpty(badgeClass)}
    <StudentBreadCrumb>
      <a use:link href={`/badge-requests`}>{I18n.t("student.enrollments")}</a>
      <span class="icon">{@html chevronRightSmall}</span>
      <span class="current">{badgeClass.name}</span>
    </StudentBreadCrumb>
    <BadgeHeader title={badgeClass.name}/>
    <div class="overview-container">
      {#if enrollment.denied}
        <span class="status-indicator denied">{I18n.t("models.enrollment.denied")}</span>
      {/if}

      <Overview badgeclass={badgeClass} requested={enrollment.dateCreated} enrollmentId={enrollment.entityId}
                studentEnrolled={true} studentPath={I18n.t("student.enrollments")} showBreadCrumb={false}/>
    </div>
  {/if}
</div>
