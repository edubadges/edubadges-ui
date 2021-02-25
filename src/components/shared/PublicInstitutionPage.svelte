<script>
  import {onMount} from "svelte";
  import I18n from "i18n-js";
  import {BadgeClassHeader} from "../teachers";
  import {entityType} from "../../util/entityTypes"
  import PublicBreadcrumb from "./PublicBreadcrumb.svelte";
  import Spinner from "../Spinner.svelte";
  import {queryData} from "../../api/graphql";
  import PublicIssuers from "./PublicIssuers.svelte";

  export let entityId;
  export let visitorRole;

  let institution = {};
  let loaded = false;
  let issuers = [];

  const currentLanguage = I18n.locale;

  const query = `query ($entityId: String){
    publicInstitution(id: $entityId) {
      name,
      image,
      institutionType,
      entityId,
      publicFaculties {
        name,
        entityId,
        publicIssuers {
          name,
          entityId,
          image,
          badgeclassesCount,
        }
      }
    }
  }`

  onMount(() => {
    queryData(query, {entityId}).then(res => {
      institution = res.publicInstitution;
      issuers = institution.publicFaculties.reduce((acc, fac) => {
        fac.publicIssuers.forEach(iss => iss.faculty = fac);
        return acc.concat(fac.publicIssuers);
      }, []);
      loaded = true;
    });
  });

</script>

<style>
  div.page-container {
    width: 100%;
  }
</style>
<div class="page-container">
  {#if !loaded}
    <Spinner/>
  {:else}
    <PublicBreadcrumb institution={institution}/>
    <BadgeClassHeader
      entity={entityType.INSTITUTION}
      object={institution}
      visitorRole={visitorRole}
      entityId={entityId}>
    </BadgeClassHeader>

    <PublicIssuers {issuers} institution={institution}/>

  {/if}
</div>