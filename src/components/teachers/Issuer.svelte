<script>
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import { Breadcrumb, EntityHeader, Issuers, Badgeclasses } from "../teachers";
  import { issuerIcon, badgeclassIcon } from "../../icons";
  import { queryData } from "../../api/graphql";
  import IssuerHeader from "./IssuerHeader.svelte";

  export let entityId;
  export let subEntity;

  let issuer = { staff: [] };
  let faculty = {};
  let badgeclasses = [];

  const query = `{
    issuer(id: "${entityId}") {
      name,
      entityId,
      createdAt,
      description,
      image,
      email,
      url,
      faculty {
        name,
        entityId,
      },
      staff {
        user {
          firstName, lastName, email, entityId
        }
      },
      badgeclasses {
        name,
        entityId,
        createdAt,
        badgeAssertions {
          entityId
        },
        enrollments {
          entityId
        }
      },
      permissions {
        mayUpdate,
        mayCreate
      }
  	}
  }`;

  onMount(() => {
    queryData(query).then(res => {
      console.log(res);
      issuer = res.issuer;
      faculty = issuer.faculty;
      badgeclasses = issuer.badgeclasses;
      console.log(badgeclasses);
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
  <Breadcrumb {faculty} {issuer} />
  <EntityHeader
    {tabs}
    title={issuer.name}
    icon={issuerIcon}
    mayUpdate={issuer.permissions && issuer.permissions.mayUpdate}
    entity="issuer">
    <IssuerHeader {issuer} />
  </EntityHeader>

  <Router>
    <Route path="/badgeclasses">
      <Badgeclasses
        {badgeclasses}
        mayCreate={issuer.permissions && issuer.permissions.mayCreate} />
    </Route>
  </Router>
</div>
