<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { BadgeclassForm } from "../teachers";
  import { createBadgeclass } from "../../api";

  const query = `{
    issuers {
      name,
      entityId
    },
  }`;

  let badgeclass = {};
  let issuers = [];
  let errors = {};

  onMount(() => {
    queryData(query).then(res => {
      issuers = res.issuers;
    });
  });

  function handleSubmit() {
    errors = {};

    createBadgeclass(badgeclass)
      .then(res => console.log("succes", res))
      .catch(err => err.then(res => (errors = res)));
  }
</script>

<BadgeclassForm {issuers} {badgeclass} {errors} {handleSubmit} create />
