<script>
  import { onMount } from "svelte";
  import { BadgeclassForm } from "../teachers";
  import { queryData } from "../../api/graphql";
  import { editBadgeclass } from "../../api";

  export let entityId;

  const query = `{
    badgeClass(id: "${entityId}") {
      name,
      description,
	  image,
	  criteriaText,
	  criteriaUrl,
	  issuer {
		name,
		entityId
	  }
	},
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
      badgeclass = res.badgeClass;
      issuers = res.issuers;
    });
  });

  function handleSubmit() {
    errors = {};

    let newBadgeclass = badgeclass;
    if (badgeclass.issuer) newBadgeclass.issuer = badgeclass.issuer.entityId;

    editBadgeclass(entityId, newBadgeclass)
      .then(res => console.log("succes", res))
      .catch(err => err.then(res => (errors = res)));
  }
</script>

<BadgeclassForm {issuers} {badgeclass} {errors} {handleSubmit} />
