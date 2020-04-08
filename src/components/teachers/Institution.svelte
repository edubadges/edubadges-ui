<script>
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import { Breadcrumb, EntityHeader, Issuers, Faculties } from "../teachers";
  import { institutionIcon, issuerIcon, facultyIcon } from "../../icons";
  import { queryData } from "../../api/graphql";

  export let subEntity;

  let institutionName = "";
  let faculties = [];
  let issuers = [];

  const query = `{
    currentUser {
      institution {
				name,
				description,
				image,
				gradingTable,
				brin,
				staff {
				  user {
				    firstName, lastName, email, entityId
				  }
				}
      }
		},
		faculties {
      name,
      entityId,
			issuers {
				entityId
			}
		},
		issuers {
      name,
      entityId,
			faculty {
				name
			},
			badgeclasses {
				entityId
			}
		}
  }`;

  onMount(() => {
    queryData(query).then(res => {
      institutionName = res.currentUser.institution.name;
      faculties = res.faculties;
      issuers = res.issuers;
    });
  });

  const tabs = [
    {
      entity: "issuers",
      href: "/manage/institution/issuers",
      icon: issuerIcon
    },
    {
      entity: "faculties",
      href: "/manage/institution/groups",
      icon: facultyIcon
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
  <Breadcrumb {institutionName} />
  <EntityHeader
    {tabs}
    title={institutionName}
    icon={institutionIcon}
    entity="institution" />

  <Router>
    <Route path="/issuers">
      <Issuers {issuers} />
    </Route>
    <Route path="/groups">
      <Faculties {faculties} />
    </Route>
  </Router>
</div>
