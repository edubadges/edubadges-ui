<script>
  import { onMount } from "svelte";
  import { IssuerForm } from "../teachers";
  import { queryData } from "../../api/graphql";
  import { editIssuer } from "../../api";

  export let entityId;

  const query = `{
    issuer(id: "${entityId}") {
      name,
      description,
      image,
      url,
      email
    },
  }`;

  let issuer = {};
  let errors = {};

  onMount(() => {
    queryData(query).then(res => {
      issuer = res.issuer;
    });
  });

  function handleSubmit() {
    errors = {};

    let newIssuer = issuer;
    if (issuer.faculty) newIssuer.faculty = issuer.faculty.entityId;

    editIssuer(entityId, newIssuer)
      .then(res => console.log("succes", res))
      .catch(err => err.then(res => (errors = res)));
  }
</script>

<IssuerForm {issuer} {errors} {handleSubmit} />
