<script>
  import { onMount } from "svelte";
  import { BadgeclassForm } from "../teachers";
  import { queryData } from "../../api/graphql";

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
		  entityId,
        faculty {
          name,
          entityId,
        }
      }
	},
	issuers {
      name,
      entityId
    },
  }`;

  let badgeclass = {issuer: {faculty:{}}};
  let issuers = [];

  onMount(() => {
    queryData(query).then(res => {
      badgeclass = res.badgeClass;
      issuers = res.issuers;
    });
  });
</script>

<BadgeclassForm {issuers} {badgeclass} {entityId} />
