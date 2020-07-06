<script>
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {IssuerForm} from "../teachers";

  export let facultyEntityId;

  const query = `{
    faculties {
      name,
      entityId
    },
  }`;

  let faculties = [];
  let issuer = {faculty: {}};

  onMount(() => {
    queryData(query).then(res => {
      faculties = res.faculties;
      if (facultyEntityId) {
        issuer.faculty = faculties.find(faculty => faculty.entityId === facultyEntityId);
      } else {
        issuer.faculty = faculties[0];
      }

    })
  });

</script>

<IssuerForm {faculties} {issuer} facultyChooseAllowed={!facultyEntityId}/>

