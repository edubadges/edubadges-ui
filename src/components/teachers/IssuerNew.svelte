<script>
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {IssuerForm} from "../teachers";
  import Spinner from "../Spinner.svelte";

  export let facultyEntityId;

  const query = `query {
    faculties {
      name,
      entityId,
      defaultLanguage
    },
  }`;

  let faculties = [];
  let issuer = {faculty: {}};
  let loaded = false

  onMount(() => {
    queryData(query).then(res => {
      faculties = res.faculties;
      if (facultyEntityId) {
        issuer.faculty = faculties.find(faculty => faculty.entityId === facultyEntityId);
      } else {
        issuer.faculty = faculties[0];
      }
      loaded= true
    })
  });

</script>

{#if loaded}
  <IssuerForm {faculties} {issuer} 
              defaultLanguage={issuer.faculty.defaultLanguage} 
              facultyChooseAllowed={!facultyEntityId}
  />
{:else}
  <Spinner/>
{/if}
