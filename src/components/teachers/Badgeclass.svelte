<script>
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import {
    Breadcrumb,
    BadgeclassHeader,
    BadgesAwarded,
    BadgesRequested,
    BadgesRevoked
  } from "../teachers";
  import { badgeclassIcon } from "../../icons";
  import { queryData } from "../../api/graphql";

  export let entityId;
  export let subEntity;

  let institutionName = "";
  let issuer;
  let faculty;
  let badgeclass = {};

  const query = `{
    badgeClass(id: "${entityId}") {
		entityId,
		name,
		image,
		description,
		issuer {
			name, 
			entityId,
			faculty {
				name,
				entityId,
				institution {
					name
				}
			},
		}
	}
  }`;

  onMount(() => {
    queryData(query).then(res => {
      badgeclass = res.badgeClass;
      issuer = res.badgeClass.issuer;
      faculty = issuer.faculty;
      institutionName = faculty.institution.name;
    });
  });

  const tabs = [
    {
      entity: "badgesRequested",
      count: 0,
      href: `/manage/badgeclass/${entityId}/requested`
    },
    {
      entity: "badgesAwarded",
      count: 0,
      href: `/manage/badgeclass/${entityId}/awarded`
    },
    {
      entity: "badgesRevoked",
      count: 0,
      href: `/manage/badgeclass/${entityId}/revoked`
    }
  ];

  $: if (!subEntity) navigate(tabs[0].href, { replace: true });
</script>

<style>
  .page-container {
    flex: 1;
  }

  .content {
    margin: var(--ver-padding-l) var(--hor-padding-m);
  }
</style>

<div class="page-container">
  <Breadcrumb
    {institutionName}
    {faculty}
    {issuer}
    badgeclassName={badgeclass.name} />
  <BadgeclassHeader {tabs} {badgeclass} />

  <div class="content">
    <Router>
      <Route path="/requested">
        <BadgesRequested />
      </Route>

      <Route path="/awarded">
        <BadgesAwarded />
      </Route>

      <Route path="/revoked">
        <BadgesRevoked />
      </Route>
    </Router>
  </div>
</div>
