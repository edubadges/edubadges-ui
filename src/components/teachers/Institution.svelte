<script>
  import {onMount} from "svelte";
  import {Router, Route, navigate} from "svelte-routing";
  import {Breadcrumb, EntityHeader, Issuers, Faculties} from "../teachers";
  import {institutionIcon, issuerIcon, facultyIcon} from "../../icons";
  import {queryData} from "../../api/graphql";
  import InstitutionHeader from "./InstitutionHeader.svelte";

  export let subEntity;

  let institution = {staff: []};
  let faculties = [];
  let issuers = [];

  const query = `{
    currentUser {
      institution {
				name,
				description,
				createdAt
				image,
				gradingTable,
				brin,
				staff {
				  user {
				    firstName, lastName, email, entityId
				  }
				}
        permissions {
          mayUpdate,
          mayCreate
        }
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
      institution = res.currentUser.institution;
      faculties = res.faculties;
      issuers = res.issuers;
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
</script>

<style>
  .page-container {
    flex: 1;
    --entity-icon-width: 66px;
  }
</style>

<div class="page-container">
  <Breadcrumb institutionName={institution.name} />
  <EntityHeader
    {tabs}
    title={institution.name}
    icon={institutionIcon}
    entity="institution"
    {mayUpdate} >
    <InstitutionHeader institution={institution}/>
  </EntityHeader>

  <Router>
    <Route path="/issuers">
      <Issuers {issuers} {mayCreate} />
    </Route>
    <Route path="/groups">
      <Faculties {faculties} {mayCreate} />
    </Route>
  </Router>
</div>
