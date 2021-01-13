<script>
  import {onMount} from "svelte";
  import {IssuerForm} from "../teachers";
  import {queryData} from "../../api/graphql";
  import Spinner from "../Spinner.svelte";

  export let entityId;

  const query = `query ($entityId: String){
    issuer(id: $entityId) {
      name,
      entityId,
      descriptionEnglish,
      descriptionDutch,
      image,
      url,
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
  let hasUnrevokedAssertions = false;
  let mayDelete = false;

  onMount(() => {
    queryData(query, {entityId}).then(res => {
      issuer = res.issuer;
      permissions = res.issuer.permissions;

      let hasUnrevokedAssertions = issuer.badgeclasses.some(function (badgeclass) {
        return badgeclass.badgeAssertions.filter(function(assertion){
          return assertion.revoked == false
          }).length > 0
      });
      mayDelete = permissions && permissions.mayDelete && hasUnrevokedAssertions == false;
      loaded = true;
    })
  });
</script>

{#if loaded}
  <IssuerForm {issuer} {entityId} facultyChooseAllowed={false}
              mayDelete={mayDelete}/>
{:else}
  <Spinner/>
{/if}