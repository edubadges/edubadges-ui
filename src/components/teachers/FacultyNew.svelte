<script>
  import { FacultyForm } from "../teachers";
  import { createFaculty } from "../../api";

  let faculty = {};
  let errors = {};

  function handleSubmit() {
    errors = {};

    createFaculty(faculty)
      .then(res => console.log("succes", res))
      .catch(err => err.then(res => (errors = res)));
  }
</script>

<FacultyForm {faculty} {errors} {handleSubmit} create />
