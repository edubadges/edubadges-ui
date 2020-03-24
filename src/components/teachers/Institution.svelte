<script>
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import {
    Breadcrumb,
    InstitutionHeader,
    Issuers,
    Faculties
  } from "../teachers";
  import { issuerIcon, facultyIcon } from "../../icons";
  import { queryData } from "../../api/graphql";

  export let subEntity;

  let institution;
  let faculties = [];
  let issuers = [];

  const query = `{
    currentUser {
      institution {
				name
      }
		},
		faculties {
			name,
			issuers {
				entityId
			}
		},
		issuers {
			name,
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
      institution = res.currentUser.institution;
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
  <Breadcrumb path="Institution" />
  <InstitutionHeader {tabs} {institution} />

  <Router>
    <Route path="/issuers">
      <Issuers {issuers} />
    </Route>
    <Route path="/groups">
      <Faculties {faculties} />
    </Route>
  </Router>
</div>
