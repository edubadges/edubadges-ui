<script>
  import { Router, Route, navigate } from "svelte-routing";
  import { Redirect } from "../../components";
  import {
    Institution,
    InstitutionEdit,
    FacultyEdit,
    Faculty,
    IssuerEdit,
    Issuer,
    Badgeclass
  } from "../../components/teachers";

  export let mainEntity;

  $: if (!mainEntity) navigate("/manage/institution", { replace: true });
</script>

<Router>
  <Route path="/institution/edit" component={InstitutionEdit} />
  <Route path="/institution/*subEntity" component={Institution} />

  <Route path="/faculty/:entityId/edit" component={FacultyEdit} />
  <Route path="/faculty/:entityId/*subEntity" component={Faculty} />

  <Route path="/issuer/:entityId/edit" component={IssuerEdit} />
  <Route path="/issuer/:entityId/*subEntity" component={Issuer} />

  <Route path="/badgeclass/:entityId/*subEntity" component={Badgeclass} />
</Router>
