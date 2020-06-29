<script>
  import {onMount} from "svelte";
  import I18n from "i18n-js";

  import {Router, Route, navigate} from "svelte-routing";
  import {
    Breadcrumb,
    EntityHeader,
    Issuers,
    Faculties,
    HeaderList,
    InviteUser
  } from "../teachers";
  import {issuerIcon, facultyIcon} from "../../icons";
  import {queryData} from "../../api/graphql";
  import {headerStaff, headerEntity} from "../../api/queries";
  import {Spinner} from "../index";
  import {InstitutionUserManagement} from "../teachers/";
  import {entityType} from "../../util/entityTypes"

  let entityId;
  export let subEntity;

  let institution = {staff: []};
  let permissions;
  let faculties = [];
  let issuers = [];
  let loaded = false;

  let contentType;

  const query = `{
    currentUser {
      institutionStaff {
        mayUpdate,
        mayCreate
      }
    },
    currentInstitution {
      ${headerEntity},
      ${headerStaff},
      image,
      gradingTable,
      brin,
      entityId,
      contentTypeId
		},
		faculties {
      name,
      entityId,
			issuers {
				entityId
      },
		},
		issuers {
      name,
      entityId,
			faculty {
				name
			},
			badgeclasses {
				entityId
      },
		}
  }`;

  onMount(() => {
    queryData(query).then(res => {
      permissions = res.currentUser.institutionStaff;
      institution = res.currentInstitution;
      faculties = res.faculties;
      issuers = res.issuers;
      loaded = true;
      entityId = res.currentInstitution.entityId;
      contentType = res.currentInstitution.contentTypeId;
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
    },
    {
      entity: "userManagement",
      href: "/manage/institution/user-management",
      icon: facultyIcon
    }
  ];

  $: if (!subEntity) navigate(tabs[0].href, {replace: true});
  $: mayUpdate = permissions && permissions.mayUpdate;
  $: mayCreate = permissions && permissions.mayCreate;

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
    {name: 'admin'}
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
    entity="institution"
    {mayUpdate}/>

  <Router>
    <Route path="/issuers">
      <Issuers {issuers} {mayCreate}/>
    </Route>
    <Route path="/groups">
      <Faculties {faculties} {mayCreate}/>
    </Route>
    <Route path="/user-management/invite-new-user">
      <InviteUser
          permissionsRoles={permissionsRoles}
          defaultValue={0}
          disabledRole={true}
          entityId={entityId}
          contentType={contentType}
      />
    </Route>
    <Route path="/user-management">
      <InstitutionUserManagement entity={entityType.INSTITUTION} />
    </Route>
  </Router>
{/if}

