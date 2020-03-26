<script>
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import { Breadcrumb, EntityHeader, Issuers, Badgeclasses } from "../teachers";
  import { issuerIcon, badgeclassIcon } from "../../icons";
  import { queryData } from "../../api/graphql";

  export let entityId;
  export let subEntity;

  let institutionName = "";
  let issuer = {};
  let faculty = {};
  let badgeclasses = [];

  const query = `{
    issuer(id: "${entityId}") {
		name,
		entityId,
		faculty {
			name,
			entityId,
			institution {
				name
			}
		},
		badgeclasses {
			name,
			entityId
		}
	}
  }`;

  onMount(() => {
    queryData(query).then(res => {
      issuer = res.issuer;
      faculty = issuer.faculty;
      institutionName = faculty.institution.name;
      badgeclasses = issuer.badgeclasses;
    });
  });

  const tabs = [
    {
      entity: "badgeclasses",
      href: `/manage/issuer/${entityId}/badgeclasses`,
      icon: badgeclassIcon
    }
  ];

  $: if (!subEntity) navigate(tabs[0].href, { replace: true });
</script>

<style>
  .page-container {
    flex: 1;
    --entity-icon-width: 66px;
  }
</style>

<div class="page-container">
  <Breadcrumb {institutionName} {faculty} {issuer} />
  <EntityHeader {tabs} title={issuer.name} icon={issuerIcon} />

  <Router>
    <Route path="/badgeclasses">
      <Badgeclasses {badgeclasses} />
    </Route>
  </Router>
</div>
