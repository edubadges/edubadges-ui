<script>
  import I18n from "i18n-js";
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {isEmpty} from "lodash";

  import {headerStaff, headerEntity} from "../../api/queries";
  import {
    ects,
    educationProgramIdentifier,
    eqf,
    extensionValue,
    language,
    learningOutcome
  } from "../../components/extensions/badges/extensions";
  import {fallBackValue} from "../../util/forms";
  import Overview from "../../components/teachers/badgeclass/Overview.svelte";

  export let entityId;
  let badgeClass = {issuer: {}, extensions: []};

  const query = `{
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
      debugger;
      badgeClass = res.badgeInstance.badgeclass;
    });
  });

</script>

<style>
  div.badge-detail {
    padding: 40px 140px;
  }

</style>

<div class="badge-detail">
  <h3>{I18n.t('models.badgeclass.language')}</h3>
  {#if !isEmpty(badgeClass)}
    <Overview badgeclass={badgeClass}/>
  {/if}
</div>
