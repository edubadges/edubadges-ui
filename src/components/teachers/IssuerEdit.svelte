<script>
  import {onMount} from "svelte";
  import {IssuerForm} from "../teachers";
  import {queryData} from "../../api/graphql";
  import Spinner from "../Spinner.svelte";
  import {isEmpty, translateProperties} from "../../util/utils";

  export let entityId;

  const query = `query ($entityId: String){
    issuer(id: $entityId) {
      entityId,
      nameDutch,
      nameEnglish,
      defaultLanguage,
      descriptionEnglish,
      descriptionDutch,
      imageEnglish,
      imageDutch,
      urlEnglish,
      urlDutch,
      email,
      archived,
      hasUnrevokedAssertions,
      hasAssertions
      faculty {
        nameDutch,
        nameEnglish,
        onBehalfOf,
        onBehalfOfDisplayName,
        onBehalfOfUrl,
        entityId
      },
      permissions {
        mayCreate
        mayUpdate,
        mayDelete
      }
    },
  }`;

  let issuer = {};
  let permissions = {};
  let loaded = false;
  let mayDelete = false;

  onMount(() => {
    queryData(query, {entityId}).then(res => {
      issuer = res.issuer;
      translateProperties(res.issuer.faculty);

      permissions = res.issuer.permissions;

      mayDelete = permissions && permissions.mayDelete;
      loaded = true;
    })
  });
</script>

{#if loaded}
  <IssuerForm {issuer}
              {entityId}
              facultyChooseAllowed={false}
              defaultLanguage={issuer.defaultLanguage}
              mayDelete={mayDelete}
              hasUnrevokedAssertions={issuer.hasUnrevokedAssertions}
              hasAnyAssertions={issuer.hasAssertions}
  />
{:else}
  <Spinner/>
{/if}