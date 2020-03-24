<script>
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import {
    Breadcrumb,
    InstitutionHeader,
    Issuers,
    Faculties
  } from "../teachers";
  import { issuerIcon, facultyIcon } from "../../icons";
  import { queryData } from "../../api/graphql";

  export let subEntity;
  let institution;

  const query = `{
    currentUser {
      institution {
        name
      }
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      institution = res.currentUser.institution;
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

  $: if (!subEntity) navigate(tabs[0].href, { replace: true });
</script>

<style>
  .page-container {
    flex: 1;
    --entity-icon-width: 66px;
  }
</style>

<div class="page-container">
  <Breadcrumb path="Institution" />
  <InstitutionHeader {tabs} {institution} />

  <Router>
    <Route path="/issuers" component={Issuers} />
    <Route path="/groups" component={Faculties} />
  </Router>
</div>
