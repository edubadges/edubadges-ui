<script>
  import {onMount} from "svelte";
  import I18n from "i18n-js";

  import {Router, Route, navigate} from "svelte-routing";
  import {
    Breadcrumb,
    EntityHeader,
    Issuers,
    Faculties,
    HeaderList
  } from "../teachers";
  import {issuerIcon, facultyIcon} from "../../icons";
  import {queryData} from "../../api/graphql";
  import {headerStaff, headerEntity} from "../../api/queries";
  import {Spinner} from "../index";

  export let subEntity;

  let institution = {staff: []};
  let faculties = [];
  let issuers = [];
  let loaded = false;

  const query = `{
    currentInstitution {
      ${headerEntity},
      ${headerStaff},
      image,
      gradingTable,
      brin,
      permissions {
        mayUpdate,
        mayCreate
      }
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
      institution = res.currentInstitution;
      faculties = res.faculties;
      issuers = res.issuers;
      loaded = true;
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

  $: if (!subEntity) navigate(tabs[0].href, {replace: true});
  $: mayUpdate = institution.permissions && institution.permissions.mayUpdate;
  $: mayCreate = institution.permissions && institution.permissions.mayCreate;

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
  </Router>
{/if}

