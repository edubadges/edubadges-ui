<script>
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import { Breadcrumb, EntityHeader, Issuers, Faculties } from "../teachers";
  import { institutionIcon, issuerIcon, facultyIcon } from "../../icons";
  import { queryData } from "../../api/graphql";

  export let entityId;
  export let subEntity;

  let facultyName = "";
  let institutionName = "";
  let issuers = [];

  const query = `{
    faculty(id: "${entityId}") {
		name,
		institution {
			name
		},
		issuers {
			name,
			badgeclasses {
				entityId
			}
		}
	}
  }`;

  onMount(() => {
    queryData(query).then(res => {
      facultyName = res.faculty.name;
      institutionName = res.faculty.institution.name;
      issuers = res.faculty.issuers;
    });
  });

  const tabs = [
    {
      entity: "issuers",
      href: `/manage/faculty/${entityId}/issuers`,
      icon: issuerIcon
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
  <Breadcrumb path="Institution" />
  <EntityHeader {tabs} title={facultyName} icon={facultyIcon} />

  <Router>
    <Route path="/issuers">
      <Issuers {issuers} {facultyName} />
    </Route>
  </Router>
</div>
