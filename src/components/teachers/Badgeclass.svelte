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
  let requestCount;
  let recipientCount;
  let revokedCount;

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
      },
      requestCount,
      recipientCount,
      revokedCount
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      console.log(res);
      badgeclass = res.badgeClass;
      issuer = res.badgeClass.issuer;
      faculty = issuer.faculty;
      institutionName = faculty.institution.name;
        requestCount = res.badgeClass.requestCount;
        recipientCount = res.badgeClass.recipientCount;
        revokedCount = res.badgeClass.revokedCount;
    });
  });

  $: tabs = [
    {
      entity: "badgesRequested",
      count: requestCount,
      href: `/manage/badgeclass/${entityId}/requested`
    },
    {
      entity: "badgesAwarded",
      count: recipientCount,
      href: `/manage/badgeclass/${entityId}/awarded`
    },
    {
      entity: "badgesRevoked",
      count: revokedCount,
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
