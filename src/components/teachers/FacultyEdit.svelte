<script>
  import {onMount} from "svelte";
  import {FacultyForm} from "../teachers";
  import {queryData} from "../../api/graphql";
  import Spinner from "../Spinner.svelte";

  export let entityId;

  const query = `{
    faculty(id: "${entityId}") {
      entityId,
      name,
      description,
      issuers {
        entityId
      },
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

  onMount(() => {
    queryData(query).then(res => {
      faculty = res.faculty;
      permissions = res.faculty.permissions;
      loaded = true;
    })
  });

</script>
{#if loaded}
  <FacultyForm {faculty} {entityId} mayDelete={permissions && permissions.mayDelete && faculty.issuers.length === 0}/>
{:else}
  <Spinner/>
{/if}

