<script>
    import {navigate, Route, Router} from "svelte-routing";
    import {
        BadgeclassEdit,
        BadgeclassNew,
        FacultyEdit,
        FacultyNew,
        IssuerEdit,
        IssuerNew,
        ManageBadgeclass,
        ManageFaculty,
        ManageIssuer
    } from "../../components/teachers";
    import ManageInstitutionNew from "../../components/teachers/ManageInstitutionNew.svelte";
    import InstitutionEditV2 from "../../components/teachers/InstitutionEditV2.svelte";
    import InstitutionEditV1 from "../../components/teachers/InstitutionEditV1.svelte";

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
        <Route path="/institution/edit" component={InstitutionEditV2}/>
        <Route path="/institution/edit-old" component={InstitutionEditV1}/>
        <Route path="/institution/*subEntity" component={ManageInstitutionNew}/>

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
