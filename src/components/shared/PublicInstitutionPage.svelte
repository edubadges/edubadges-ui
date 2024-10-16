<script>
  import {onMount} from "svelte";
  import I18n from "i18n-js";
  import {BadgeClassHeader} from "../teachers";
  import {entityType} from "../../util/entityTypes"
  import PublicBreadcrumb from "./PublicBreadcrumb.svelte";
  import Spinner from "../Spinner.svelte";
  import {queryData} from "../../api/graphql";
  import PublicIssuers from "./PublicIssuers.svelte";
  import {translateProperties} from "../../util/utils";

  export let entityId;
  export let visitorRole;

  let institution = {};
  let loaded = false;
  let issuers = [];

  const currentLanguage = I18n.locale;

  const query = `query ($entityId: String){
    publicInstitution(id: $entityId) {
      nameEnglish,
      nameDutch,
      descriptionEnglish,
      descriptionDutch,
      imageEnglish,
      imageDutch,
      institutionType,
      entityId,
      publicFaculties {
        nameEnglish,
        nameDutch,
        imageDutch,
        imageEnglish,
        entityId,
        onBehalfOf,
        onBehalfOfDisplayName,
        onBehalfOfUrl,
        publicIssuers {
          nameEnglish,
          nameDutch,
          entityId,
          imageEnglish,
          imageDutch,
          badgeclassesCount,
        }
      }
    }
  }`

  onMount(() => {
    queryData(query, {entityId}).then(res => {
      institution = res.publicInstitution;
      translateProperties(institution);
      institution.publicFaculties.forEach(faculty => {
        translateProperties(faculty);
        faculty.publicIssuers.forEach(issuer => translateProperties(issuer));
      })
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
      hasDescription={true}
      entityId={entityId}>
    </BadgeClassHeader>

    <PublicIssuers {issuers} institution={institution}/>

  {/if}
</div>