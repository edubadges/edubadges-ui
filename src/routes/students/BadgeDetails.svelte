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
  import { getUnearnedBadges } from "../../api";

  export let entityId;
  let badge;
  let badgeClass;
  export let enrollment;

  const query = enrollment ? `{
    enrollments {
      entityId,
      dateCreated,
      denied,
      badgeClass {
        entityId,
        name,
        image,
        issuer {
          name,
          image,
          faculty {
            name
          }
        }
      },
    }
  }` : `{
    badgeInstance(id: "${entityId}") {
      image,
      issuedOn,
      acceptance,
      badgeclass {
        name,
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
      }
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      if(enrollment) {
        badge = res.enrollments.filter(el => el.badgeClass.entityId === entityId)[0];
        badgeClass = badge.badgeClass;
      } else {
        badgeClass = res.badgeInstance.badgeclass;
      }
    });
  });

</script>

<style>
  div.badge-detail {
    padding: 40px 140px;
  }

</style>
<div class="badge-detail">
  {#if !isEmpty(badgeClass)}
    <Overview badgeclass={badgeClass} enrollment={enrollment} requested={badge.dateCreated} enrollmentId={badge.enttiyId}/>
  {/if}
</div>
