<script>
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import { EntityHeader, Breadcrumb, BadgeclassUserManagement, InviteUser } from "../teachers";
  import {Overview} from "./badgeclass";
  import { badgeclassIcon } from "../../icons";
  import { queryData } from "../../api/graphql";
  import { headerStaff, headerEntity } from "../../api/queries";
  import { expirationValueToPeriod } from "../extensions/badges/expiration_period";
  import I18n from "i18n-js";
  import { expirationPeriod } from "../../util/entityHeader";

  export let entityId;
  export let tab;

  let issuer;
  let faculty;
  let badgeclass = {extensions: [], issuer: {}};

  const query = `{
    badgeClass(id: "${entityId}") {
      ${headerEntity},
      ${headerStaff},
      image,
      criteriaUrl,
      criteriaText,
      expirationPeriod,
      issuer {
        name,
        entityId,
        faculty {
          name,
          entityId,
        }
      },
      permissions {
        mayUpdate
      },
      enrollments {
        entityId,
        dateAwarded
      },
      badgeAssertions {
        entityId,
        revoked
      },
      extensions {
        name,
        originalJson
      }
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      badgeclass = res.badgeClass;
      issuer = res.badgeClass.issuer;
      faculty = issuer.faculty;
    });
  });

  $: tabs = [
    {
      entity: "badgeclassOverview",
      href: `/manage/badgeclass/${entityId}/overview`
    },
    {
      entity: "userManagement",
      href: `/manage/badgeclass/${entityId}/user-management`
    }
  ];

  $: if (!tab) navigate(tabs[0].href, {replace: true});

  $: headerItems = [
    {
      attr: "created",
      type: "date",
      value: badgeclass.createdAt
    },
    {
      attr: "expiresAfter",
      type: "none",
      value: expirationPeriod(badgeclass)
    },
    {
      attr: "issuer",
      type: "none",
      value: badgeclass.issuer.name
    }
  ];

  const permissionsRoles = [
    {name: I18n.t(['editUsers', 'badgeClass', 'owner'])},
    {name: I18n.t(['editUsers', 'badgeClass', 'editor'])},
    {name: I18n.t(['editUsers', 'badgeClass', 'awarder'])}
  ];
</script>

<Breadcrumb {faculty} {issuer} badgeclassName={badgeclass.name} />

<EntityHeader object={badgeclass} entity="badgeclass" {tabs} {headerItems}
              mayUpdate={badgeclass.permissions && badgeclass.permissions.mayUpdate && badgeclass.badgeAssertions.length === 0}/>

<div class="main-content-margin">
  <Router>
    <Route path="/overview">
      <Overview {badgeclass} />
    </Route>
    <Route path="/user-management/invite-new-user">
      <InviteUser permissionsRoles={permissionsRoles} defaultValue={1} disabledRole={false} />
    </Route>
    <Route path="/user-management">
      <BadgeclassUserManagement entity="badgeClass" entityId={entityId}/>
    </Route>
  </Router>
</div>
