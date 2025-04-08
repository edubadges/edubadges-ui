<script>
  import {onMount} from "svelte";
  import I18n from "i18n-js";

  import {navigate, Route, Router} from "svelte-routing";
  import {Breadcrumb, EntityHeader, InviteUser} from "../teachers";
  import {badgeclassIcon, directAwardIcon, facultyIcon, issuerIcon, userManagementIcon} from "../../icons";
  import {queryData} from "../../api/graphql";
  import {headerEntityMultiLanguage, headerStaff} from "../../api/queries";
  import {Spinner} from "../index";
  import {InstitutionUserManagement} from "../teachers/";
  import {entityType} from "../../util/entityTypes"
  import {permissionsRole} from "../../util/rolesToPermissions";
  import {translateProperties} from "../../util/utils";
  import RequestedBadges from "./RequestedBadges.svelte";
  import UnclaimedDirectAwardsNew from "./UnclaimedDirectAwardsNew.svelte";
  import ManageIssuersNew from "./ManageIssuersNew.svelte";
  import FacultiesNew from "./FacultiesNew.svelte";

    let entityId;
    export let subEntity;

    let institution = {staff: []};
    let permissions;
    let loaded = false;

    let contentType;

    const query = `query {
      currentInstitution {
        ${headerEntityMultiLanguage},
        ${headerStaff},
        imageEnglish,
        imageDutch,
        gradingTable,
        brin,
        entityId,
        contentTypeId,
        permissions {
          mayCreate,
          mayUpdate,
          mayDelete
        }
      }
    }`;

    onMount(() => {
        queryData(query).then(res => {
            permissions = res.currentInstitution.permissions;
            institution = res.currentInstitution;

            translateProperties(res.currentInstitution);

            loaded = true;
            entityId = res.currentInstitution.entityId;
            contentType = res.currentInstitution.contentTypeId;
        });
    });

    const tabs = [
        {
            entity: "faculties",
            href: "/manage/institution/groups",
            icon: facultyIcon
        },
        {
            entity: "issuers",
            href: "/manage/institution/issuers",
            icon: issuerIcon
        },
        {
            entity: "userManagement",
            href: "/manage/institution/user-management",
            icon: userManagementIcon
        },
        {
            entity: "requestedBadges",
            href: "/manage/institution/requested-batches",
            icon: badgeclassIcon
        },
        {
            entity: "directAwards",
            href: "/manage/institution/direct-awards",
            icon: directAwardIcon
        },
        {
            entity: "allDeletedDirectAwards",
            href: "/manage/institution/deleted-direct-awards",
            icon: directAwardIcon
        }
    ];

    $: if (!subEntity) {
        navigate(tabs[1].href, {replace: true});
    }
    $: mayUpdate = permissions && permissions.mayUpdate;

    $: headerItems = [
        {
            attr: "created",
            type: "date",
            value: institution.createdAt
        },
        {
            attr: "admin",
            type: "adminNames",
            value: institution
        },
        {
            attr: "brin",
            type: "text",
            value: institution.brin
        },
        {
            attr: "grading_table",
            type: "link",
            value: institution.gradingTable
        }
    ];

    const permissionsRoles = [
        {value: permissionsRole.ADMIN, name: I18n.t("editUsers.institution.admin")}
    ];

</script>

{#if !loaded}
  <Spinner/>
{:else}
  <Breadcrumb/>
  <EntityHeader
    {tabs}
    {headerItems}
    object={institution}
    entity={entityType.INSTITUTION}
    mayUpdate={mayUpdate}>
  </EntityHeader>

  <Router>
    <Route path="/issuers">
      <ManageIssuersNew institutionName={institution.name}/>
    </Route>
    <Route path="/groups">
      <FacultiesNew institutionName={institution.name}/>
    </Route>
    <Route path="/user-management/invite-new-user">
      <InviteUser
        permissionsRoles={permissionsRoles}
        disabledRole={true}
        entityId={entityId}
        contentType={contentType}
      />
    </Route>
    <Route path="/user-management">
      <InstitutionUserManagement entity={entityType.INSTITUTION}/>
    </Route>
    <Route path="/requested-batches">
      <RequestedBadges />
    </Route>
    <Route path="/direct-awards">
      <UnclaimedDirectAwardsNew allUnclaimed={true}/>
    </Route>
    <Route path="/deleted-direct-awards">
      <UnclaimedDirectAwardsNew allUnclaimed={false}/>
    </Route>

  </Router>
{/if}

