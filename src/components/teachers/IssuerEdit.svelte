<script>
  import {onMount} from "svelte";
  import {IssuerForm} from "../teachers";
  import {queryData} from "../../api/graphql";
  import Spinner from "../Spinner.svelte";

  export let entityId;

  const query = `{
    issuer(id: "${entityId}") {
      name,
      entityId,
      description,
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

  onMount(() => {
    queryData(query).then(res => {
      issuer = res.issuer;
      permissions = res.issuer.permissions;
      loaded = true;
    })
  });
</script>
{#if loaded}
  <IssuerForm {issuer} {entityId} facultyChooseAllowed={false}
              mayDelete={permissions && permissions.mayDelete && issuer.badgeclasses.length === 0}/>
{:else}
  <Spinner/>
{/if}