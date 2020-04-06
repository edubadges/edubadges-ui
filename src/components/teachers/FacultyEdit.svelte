<script>
  import { onMount } from "svelte";
  import { FacultyForm } from "../teachers";
  import { queryData } from "../../api/graphql";
  import { editFaculty } from "../../api";

  export let entityId;

  const query = `{
    faculty(id: "${entityId}") {
      name,
      description
    },
  }`;

  let faculty = {};
  let errors = {};

  onMount(() => {
    queryData(query).then(res => {
      faculty = res.faculty;
    });
  });

  function handleSubmit() {
    errors = {};

    editFaculty(entityId, faculty)
      .then(res => console.log("succes", res))
      .catch(err => err.then(res => (errors = res)));
  }
</script>

<FacultyForm {faculty} {errors} {handleSubmit} />
