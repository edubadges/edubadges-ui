<script>
  import {onMount} from "svelte";
  import {IssuerForm} from "../teachers";
  import {queryData} from "../../api/graphql";
  import Spinner from "../Spinner.svelte";

  export let entityId;

  const query = `query ($entityId: String){
    issuer(id: $entityId) {
      name,
      nameDutch,
      nameEnglish,
      entityId,
      descriptionEnglish,
      descriptionDutch,
      imageEnglish,
      imageDutch,
      urlEnglish,
      urlDutch,
      email,
      faculty {
        name,
        entityId
      },
      badgeclasses {
        entityId,
        badgeAssertions {
          entityId
          revoked
        }
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
  let hasUnrevokedAssertions;
  let mayDelete = false;

  onMount(() => {
    queryData(query, {entityId}).then(res => {
      issuer = res.issuer;
      permissions = res.issuer.permissions;

      hasUnrevokedAssertions = issuer.badgeclasses
        .some(badgeclass => badgeclass.badgeAssertions.some(assertion => !assertion.revoked));
      mayDelete = permissions && permissions.mayDelete;
      loaded = true;
    })
  });
</script>

{#if loaded}
  <IssuerForm {issuer} {entityId} facultyChooseAllowed={false}
              mayDelete={mayDelete} hasUnrevokedAssertions={hasUnrevokedAssertions}/>
{:else}
  <Spinner/>
{/if}