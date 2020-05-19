<script>
  import { Router, Route, navigate } from "svelte-routing";
  import {
    BadgeclassManage,
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
    AwardBadge,
    AwardManyBadges
  } from "../../components/teachers";

  export let mainEntity;

  $: if (!mainEntity) {
    navigate("/manage/institution", { replace: true });
  }
</script>

<style>
  div {
    flex: 1;
  }
</style>

<div>
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
    <Route path="/badgeclass/:entityId/*tab" component={BadgeclassManage} />

    <Route path="/badgeclass/:entityId/award" component={AwardBadge} />
    <Route path="/badgeclass/:entityId/bulkAward" component={AwardManyBadges} />

  </Router>
</div>
