<script>
  import {navigate, Route, Router} from "svelte-routing";
  import {
    BadgeclassEdit,
    ManageBadgeclass,
    BadgeclassNew,
    ManageFaculty,
    FacultyEdit,
    FacultyNew,
    Institution,
    InstitutionEdit,
    ManageIssuer,
    IssuerEdit,
    IssuerNew
  } from "../../components/teachers";

  export let mainEntity;

  $: if (!mainEntity) {
    navigate("/manage/institution", {replace: true});
  }
</script>

<style>
  div {
    flex: 1;
  }
</style>

<div>
  <Router>
    <Route path="/institution/edit" component={InstitutionEdit}/>
    <Route path="/institution/*subEntity" component={Institution}/>

    <Route path="/faculty/new" component={FacultyNew}/>
    <Route path="/faculty/:entityId/edit" component={FacultyEdit}/>
    <Route path="/faculty/:entityId/*subEntity" component={ManageFaculty}/>

    <Route path="/issuer/new" component={IssuerNew}/>
    <Route path="/issuer/new/*facultyEntityId" component={IssuerNew}/>
    <Route path="/issuer/:entityId/edit" component={IssuerEdit}/>
    <Route path="/issuer/:entityId/*subEntity" component={ManageIssuer}/>

    <Route path="/badgeclass/new/*issuerEntityId" component={BadgeclassNew}/>
    <Route path="/badgeclass/:entityId/edit" component={BadgeclassEdit}/>
    <Route path="/badgeclass/:entityId/edit/*action" component={BadgeclassEdit}/>
    <Route path="/badgeclass/:entityId/*tab" component={ManageBadgeclass}/>

  </Router>
</div>
