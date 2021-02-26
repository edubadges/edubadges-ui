<script>
  import {onMount} from "svelte";
  import {Router, Route, navigate} from "svelte-routing";
  import {BadgeClassHeader, Breadcrumb, BadgeclassUserManagement, InviteUser} from "../teachers";
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
  import {overview, userManagementIcon} from "../../icons";

  export let entityId;
  export let tab;

  let issuer;
  let faculty;
  let badgeclass = {extensions: [], issuer: {}};
  let permissions;

  let contentType;
  let loaded;
  let mayUpdateBadgeclass;

  const query = `query ($entityId: String){
    badgeClass(id: $entityId) {
      entityId,
      name,
      description,
      createdAt,
      isPrivate,
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
          institution {
            name
          }
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
    queryData(query, {entityId}).then(res => {
      badgeclass = res.badgeClass;
      issuer = res.badgeClass.issuer;
      faculty = issuer.faculty;
      contentType = res.badgeClass.contentTypeId;
      permissions = res.badgeClass.permissions;
      loaded = true;
      const hasUnrevokedAssertions = badgeclass.badgeAssertions.some(badgeClass => !badgeClass.revoked);
      mayUpdateBadgeclass = badgeclass.permissions && badgeclass.permissions.mayUpdate && !hasUnrevokedAssertions;
    });
  });

  $: tabs = [
    {
      entity: "badgeclassOverview",
      href: `/manage/badgeclass/${entityId}/overview`,
      icon: overview

    },
    {
      entity: "userManagement",
      href: `/manage/badgeclass/${entityId}/user-management`,
      icon: userManagementIcon
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

<style>
  .overview-container {
    padding: 40px 140px;
  }

    @media (max-width: 1120px) {
    .overview-container {
      padding: 20px;
    }
  }

</style>

{#if loaded}
  <Breadcrumb {faculty} {issuer} {badgeclass} badgeclassName={badgeclass.name}/>
  <BadgeClassHeader
    object={badgeclass}
    entity={entityType.BADGE_CLASS}
    entityId={entityId}
    {tabs}
    {headerItems}
    mayUpdate={mayUpdateBadgeclass}
  />

  <div class="main-content-margin">
    <Router>
      <Route path="/overview">
        <div class="overview-container">
          <Overview {badgeclass}/>
        </div>
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
