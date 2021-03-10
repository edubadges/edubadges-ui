<script>
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import { FacultyForm } from "../teachers";
  import Spinner from "../Spinner.svelte";

 const query = `query {
    currentInstitution {
      defaultLanguage
    },
  }`;

  let currentInstitution;
  let loaded = false;

  onMount(() => {
    queryData(query).then(res => {
        currentInstitution = res.currentInstitution;
        loaded = true;
      })
  });

</script>
{#if loaded}
  <FacultyForm defaultLanguage={currentInstitution.defaultLanguage}/>
{:else}
  <Spinner/>
{/if}
