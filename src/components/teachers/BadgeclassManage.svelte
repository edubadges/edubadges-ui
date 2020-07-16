<script>
  import {onMount} from "svelte";
  import {Router, Route, navigate} from "svelte-routing";
  import {EntityHeader, Breadcrumb, BadgeclassUserManagement, InviteUser} from "../teachers";
  import {Overview} from "./badgeclass";
  import {badgeclassIcon} from "../../icons";
  import {queryData} from "../../api/graphql";
  import {headerStaff, headerEntity} from "../../api/queries";
  import {expirationValueToPeriod} from "../extensions/badges/expiration_period";
  import I18n from "i18n-js";
  import {expirationPeriod} from "../../util/entityHeader";
  import {entityType} from "../../util/entityTypes"
  import Spinner from "../Spinner.svelte";
  import {permissionsRole} from "../../util/rolesToPermissions";

  export let entityId;
  export let tab;

  let issuer;
  let faculty;
  let badgeclass = {extensions: [], issuer: {}};
  let permissions;

  let contentType;
  let loaded;

  const query = `{
    badgeClass(id: "${entityId}") {
      ${headerEntity},
      ${headerStaff},
      image,
      contentTypeId,
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
      },
      alignments {
        targetName,
        targetUrl,
        targetCode,
        targetFramework,
        targetDescription
      },
      permissions {
        mayUpdate
      }
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      badgeclass = res.badgeClass;
      issuer = res.badgeClass.issuer;
      faculty = issuer.faculty;
      contentType = res.badgeClass.contentTypeId;
      permissions = res.badgeClass.permissions;
      loaded = true;
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
  $: mayUpdate = permissions && permissions.mayUpdate;
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
    {value: permissionsRole.ADMIN, name: I18n.t("editUsers.badgeclass.owner")},
    {value: permissionsRole.EDITOR, name: I18n.t("editUsers.badgeclass.editor")},
    {value: permissionsRole.AWARDER, name: I18n.t("editUsers.badgeclass.awarder")}
  ];
</script>
{#if loaded}

  <Breadcrumb {faculty} {issuer} {badgeclass} badgeclassName={badgeclass.name}/>

  <EntityHeader
    object={badgeclass}
    entity={entityType.BADGE_CLASS}
    entityId={entityId}
    {tabs}
    {headerItems}
    mayUpdate={badgeclass.permissions && badgeclass.permissions.mayUpdate && badgeclass.badgeAssertions.length === 0}
  />

  <div class="main-content-margin">
    <Router>
      <Route path="/overview">
        <Overview {badgeclass}/>
      </Route>
      <Route path="/user-management/invite-new-user">
        <InviteUser
          permissionsRoles={permissionsRoles}
          defaultValue={2}
          disabledRole={false}
          entityId={entityId}
          contentType={contentType}
        />
      </Route>
      <Route path="/user-management">
        <BadgeclassUserManagement entity={entityType.BADGE_CLASS} {entityId}/>
      </Route>
    </Router>
  </div>
{:else}
  <Spinner/>
{/if}
