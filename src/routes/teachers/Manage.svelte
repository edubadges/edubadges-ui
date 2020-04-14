<script>
  import { Router, Route, navigate } from "svelte-routing";
  import { Redirect } from "../../components";
  import {
    Badgeclass,
    BadgeclassEdit,
    BadgeclassNew,
    Faculty,
    FacultyEdit,
    FacultyNew,
    Institution,
    InstitutionEdit,
    Issuer,
    IssuerEdit,
    IssuerNew,
    AwardBadge
  } from "../../components/teachers";

  export let mainEntity;

  $: if (!mainEntity) navigate("/manage/institution", {replace: true});
</script>

<Router>
  <Route path="/institution/edit" component={InstitutionEdit} />
  <Route path="/institution/*subEntity" component={Institution} />

  <Route path="/faculty/new" component={FacultyNew} />
  <Route path="/faculty/:entityId/edit" component={FacultyEdit} />
  <Route path="/faculty/:entityId/*subEntity" component={Faculty} />

  <Route path="/issuer/new" component={IssuerNew} />
  <Route path="/issuer/:entityId/edit" component={IssuerEdit} />
  <Route path="/issuer/:entityId/*subEntity" component={Issuer} />

  <Route path="/badgeclass/new" component={BadgeclassNew} />
  <Route path="/badgeclass/:entityId/edit" component={BadgeclassEdit} />
  <Route path="/badgeclass/:entityId/*subEntity" component={Badgeclass} />

  <Route path="/badgeclass/:entityId/award">
      <AwardBadge emailFields={[{emailaddress: ''}]}/>
  </Route>
</Router>
