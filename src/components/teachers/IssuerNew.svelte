<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { IssuerForm } from "../teachers";
  import { createIssuer } from "../../api";

  const query = `{
    faculties {
      name,
      entityId
    },
  }`;

  let issuer = {};
  let faculties = [];
  let errors = {};

  onMount(() => {
    queryData(query).then(res => {
      faculties = res.faculties;
    });
  });

  function handleSubmit() {
    errors = {};

    let newIssuer = issuer;
    if (issuer.faculty) newIssuer.faculty = issuer.faculty.entityId;

    createIssuer(newIssuer)
      .then(res => console.log("succes", res))
      .catch(err => err.then(res => (errors = res)));
  }
</script>

<IssuerForm {faculties} {issuer} {errors} {handleSubmit} create />
