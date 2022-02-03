<script>
  import {onMount} from "svelte";
  import {FacultyForm} from "../teachers";
  import {queryData} from "../../api/graphql";
  import Spinner from "../Spinner.svelte";
  import {translateProperties} from "../../util/utils";

  export let entityId;

  const query = `query ($entityId: String){
    faculty(id: $entityId) {
      entityId,
      nameEnglish,
      nameDutch,
      descriptionEnglish,
      descriptionDutch,
      hasUnrevokedAssertions,
      onBehalfOf,
      defaultLanguage,
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

        translateProperties(faculty);

        permissions = res.faculty.permissions;
        mayDelete = permissions && permissions.mayDelete;
        loaded = true;
      })
  });
</script>

{#if loaded}
  <FacultyForm {faculty} {entityId} defaultLanguage={faculty.defaultLanguage} mayDelete={mayDelete} hasUnrevokedAssertions={faculty.hasUnrevokedAssertions}/>
{:else}
  <Spinner/>
{/if}

