<script>
  import {onMount} from "svelte";
  import {FacultyForm} from "../teachers";
  import {queryData} from "../../api/graphql";
  import Spinner from "../Spinner.svelte";

  export let entityId;

  const query = `query ($entityId: String){
    faculty(id: $entityId) {
      entityId,
      name,
      descriptionEnglish,
      descriptionDutch,
      hasUnrevokedAssertions,
      permissions {
        mayCreate
        mayUpdate,
        mayDelete
      }
    },
  }`;

  let faculty = {};
  let permissions = {};
  let loaded = false;
  let mayDelete = false;

  onMount(() => {
    
    queryData(query, {entityId}).then(res => {
        faculty = res.faculty;
        permissions = res.faculty.permissions;
        loaded = true;
        mayDelete = permissions && permissions.mayDelete;
      })
  });
</script>

{#if loaded}
  <FacultyForm {faculty} {entityId} mayDelete={mayDelete} hasUnrevokedAssertions={faculty.hasUnrevokedAssertions}/>
{:else}
  <Spinner/>
{/if}

