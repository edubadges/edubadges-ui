<script>
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {IssuerForm} from "../teachers";

  const query = `{
    faculties {
      name,
      entityId
    },
  }`;

  let faculties = [];
  let issuer = { faculty: {}};

  onMount(() => {
    queryData(query).then(res => {
      faculties = res.faculties;
      issuer.faculty = faculties[0];
    })});

</script>

<IssuerForm {faculties} {issuer}/>

