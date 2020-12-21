<script>
  import I18n from "i18n-js";
  import {onMount} from "svelte";
  import {Router, Route, navigate} from "svelte-routing";
  import {Breadcrumb, EntityHeader, Badgeclasses, IssuerUserManagement, InviteUser} from "../teachers";
  import {badgeclassIcon, userManagementIcon} from "../../icons";
  import {queryData} from "../../api/graphql";
  import {headerStaff, headerEntity} from "../../api/queries";
  import {entityType} from "../../util/entityTypes";
  import {config} from "../../util/config";


import {
    ects,
    extensionValue,
    studyLoad
  } from "../extensions/badges/extensions";

  export let entityId;
  export let subEntity;

  let issuer = {staff: []};
  let faculty = {};
  let badgeclasses = [];
  let permissions;

  let contentType;

  const query = `query ($entityId: String){
    issuer(id: $entityId) {
      ${headerEntity},
      ${headerStaff},
      image,
      email,
      url,
      contentTypeId,
      faculty {
        name,
        entityId,
        institution {
          image
        }
      },
      badgeclasses {
        name,
        entityId,
        image,
        createdAt,
        badgeAssertions {
          entityId
        },
        enrollments {
          entityId
        },
        pendingEnrollments {
          entityId
        },
        extensions {
         name,
         originalJson
        }
      },
      permissions {
        mayCreate
        mayUpdate,
        mayDelete
      }
  	}
  }`;

  onMount(() => {
    queryData(query, {entityId}).then(res => {
      issuer = res.issuer;
      issuer.publicLink = `${config.serverUrl}/public/issuers/${entityId}`;
      faculty = issuer.faculty;
      badgeclasses = issuer.badgeclasses;
      badgeclasses.forEach(badgeClass => {
        const studyLoadValue = extensionValue(badgeClass.extensions, studyLoad);
        const ectsValue = extensionValue(badgeClass.extensions, ects);
        badgeClass.studyLoad = studyLoadValue ? I18n.t("teacher.badgeclasses.hours", {value: studyLoadValue}) : ectsValue ?
          I18n.t("teacher.badgeclasses.ects", {value: ectsValue}) : "-";
      });
      permissions = res.issuer.permissions;
      contentType = res.issuer.contentTypeId;
    });
  });

  const tabs = [
    {
      entity: "badgeclasses",
      href: `/manage/issuer/${entityId}/badgeclasses`,
      icon: badgeclassIcon
    },
    {
      entity: "userManagement",
      href: `/manage/issuer/${entityId}/user-management`,
      icon: userManagementIcon
    }
  ];

  $: if (!subEntity) navigate(tabs[0].href, {replace: true});
  $: mayCreate = permissions && permissions.mayCreate;
  $: mayUpdate = permissions && permissions.mayUpdate;

  $: headerItems = [
    {
      attr: "created",
      type: "date",
      value: issuer.createdAt
    },
    {
      attr: "admin",
      type: "adminNames",
      value: issuer
    },
    {
      attr: "url",
      type: "link",
      value: issuer.url
    },
    {
      attr: "email",
      type: "email",
      value: issuer.email
    },
  ];

  const permissionsRoles = [{value:"admin", name: I18n.t("editUsers.issuer.admin")}];

</script>

<Breadcrumb {faculty} {issuer}/>
<EntityHeader
    {tabs}
    {headerItems}
    object={issuer}
    entity={entityType.ISSUER}
    entityId={entityId}
    mayUpdate={mayUpdate}
/>

<Router>
  <Route path="/badgeclasses">
    <Badgeclasses
        {badgeclasses}
        mayCreate={mayCreate}
        issuer={issuer}/>
  </Route>
  <Route path="/user-management/invite-new-user">
    <InviteUser
        permissionsRoles={permissionsRoles}
        entityId={entityId}
        disabledRole={true}
        contentType={contentType}
    />
  </Route>
  <Route path="/user-management">
    <IssuerUserManagement entity={entityType.ISSUER} entityId={entityId}/>
  </Route>
</Router>
