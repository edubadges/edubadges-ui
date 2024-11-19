<script>
    import {onMount} from "svelte";
    import I18n from "i18n-js";
    import {navigate, Route, Router} from "svelte-routing";
    import {Login, NotFound, ProcessToken, Student} from "./routes";
    import AcceptTerms from "./routes/AcceptTerms.svelte";
    import {Badges, Impersonate, Manage, ManagementQueries, UserPermissions, Users} from "./routes/teachers";
    import {Footer, Header, Spinner, SubscribeToPath} from "./components";
    import {config} from "./util/config";
    import {
        BadgeclassAwarder,
        Header as TeacherHeader,
        InviteEnrollments,
        TeacherPermissions,
        TeacherProfile
    } from "./components/teachers";
    import {
        redirectPath,
        showMainErrorDialog,
        userLoggedIn,
        userName,
        userRole,
        validatedUserName
    } from "./stores/user";
    import {role} from "./util/role";
    import {getSocialAccount} from "./api";
    import PublicBadgeClassPage from "./components/shared/PublicBadgeClassPage.svelte"
    import EnrollmentDetails from "./routes/students/EnrollmentDetails.svelte";
    import {Flash} from "./components/forms/";
    import BadgeDetails from "./routes/students/BadgeDetails.svelte";
    import PublicBadgePage from "./components/shared/PublicBadgePage.svelte";
    import {Modal} from "./components/forms";
    import PublicIssuerPage from "./components/shared/PublicIssuerPage.svelte";
    import PublicInstitutionPage from "./components/shared/PublicInstitutionPage.svelte";
    import VersionInfo from "./routes/VersionInfo.svelte";
    import Catalog from "./routes/catalog/Catalog.svelte";
    import DirectAward from "./routes/students/DirectAward.svelte";
    import Insights from "./routes/teachers/Insights.svelte";
    import CollectionForm from "./components/students/CollectionForm.svelte";
    import PublicCollectionPage from "./routes/students/PublicCollectionPage.svelte";
    import BadgeImported from "./routes/students/BadgeImported.svelte";
    import LTI from "./components/teachers/lti/LTI.svelte";
    import LTILaunch from "./components/teachers/lti/LTILaunch.svelte";
    import Notifications from "./components/teachers/Notifications.svelte";
    import {constructUserName} from "./util/users";
    const homepage = {
        guest: Login,
        [role.STUDENT]: Student,
        [role.TEACHER]: Badges
    };

    let loaded = false;

    onMount(() => {
        //if we are heading to any of the public path we don't fetch the profile
        const path = window.location.pathname;
        const publicPaths = ["public", "/auth/login", "signup", "version/info", "launch/lti"]
        if (!publicPaths.some(p => path.indexOf(p) > -1)) {
            getSocialAccount()
                .then(res => {
                    loaded = true;
                    $userLoggedIn = true;
                    $userName = constructUserName({user: {firstName: res[0].firstName, lastName: res[0].lastName}});
                })
                .catch(e => {
                    $redirectPath = path;
                    if (path.indexOf("catalog") === -1) {
                        navigate("/login");
                    } else {
                        navigate("/catalog");
                    }
                    $userLoggedIn = "";
                    $userName = "";
                    $validatedUserName = "";
                    loaded = true;
                });
        } else {
            loaded = true;
        }
    });

    $: visitorRole = $userLoggedIn ? $userRole : "guest";
</script>

<style global lang="scss">
    @import "stylesheets/main";

    .app {
        max-width: 1480px;
        min-height: 100vh;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
    }

    div.page {
        flex: 1;
        border-radius: 8px;
        background-color: white;
        box-shadow: 0 3px 0 2px #abb4bd;
        position: relative;
        display: flex;
    }

    div.page-container {
        height: auto;
        width: 100%;
    }

    input::placeholder {
        color: var(--grey-7);
    }

    :global(body.modal-open) {
        overflow: hidden;
    }

</style>

<div class="app">
    {#if !loaded}
        <Spinner/>
    {:else}
        <Flash/>
        {#if visitorRole === role.TEACHER}
            <TeacherHeader/>
        {:else}
            <Header/>
        {/if}

        <div class="page">
            <Router>
                <Route path="/version/info">
                    <VersionInfo/>
                </Route>
                <!-- Student -->
                {#if visitorRole === role.STUDENT}
                    <Route path="/backpack">
                        <Student bookmark="backpack"/>
                    </Route>
                    <Route path="/badge-requests">
                        <Student bookmark="badge-requests"/>
                    </Route>
                    <Route path="/collections">
                        <Student bookmark="collections"/>
                    </Route>
                    <Route path="/import">
                        <Student bookmark="import"/>
                    </Route>
                    <Route path="/edit-collection/:entityId" let:params>
                        <CollectionForm entityId={params.entityId}/>
                    </Route>
                    <Route path="/archived">
                        <Student bookmark="archived"/>
                    </Route>
                    <Route path="/direct-awards">
                        <Student bookmark="backpack" revalidateName="true"/>
                    </Route>
                    <Route path="/enrollment/:enrollmentId/" let:params>
                        <EnrollmentDetails enrollmentId={params.enrollmentId}/>
                    </Route>
                    <Route path="/details/:entityId/" let:params>
                        <BadgeDetails entityId={params.entityId}/>
                    </Route>
                    <Route path="/import/:entityId/" let:params>
                        <BadgeImported entityId={params.entityId}/>
                    </Route>
                    <Route path="/direct-award/:entityId/" let:params>
                        <DirectAward entityId={params.entityId}/>
                    </Route>
                {/if}

                <!-- Teacher -->
                {#if visitorRole === role.TEACHER}
                    <Route path="/users" component={Users}/>
                    <Route path="/users/:userId/:entity" component={UserPermissions}/>
                    <Route path="/notifications" component={Notifications}/>
                    <Route path="/manage/*mainEntity" component={Manage}/>
                    <Route path="/badgeclass/:entityId/*subEntity" component={BadgeclassAwarder}/>
                    <Route path="/invite-enrollements/:entityId/" let:params>
                        <InviteEnrollments entityId={params.entityId}/>
                    </Route>
                    <Route path="/permissions/:entity" component={TeacherPermissions}/>
                    <Route path="/impersonate" component={Impersonate}/>
                    <Route path="/management-queries" component={ManagementQueries}/>
                    <Route path="/insights" component={Insights}/>
                    <Route path="/launch/lti" component={LTILaunch}/>
                    <Route path="/lti/*tab" component={LTI}/>
                {/if}

                <!-- Shared -->
                <Route path="/profile">
                    {#if visitorRole === role.TEACHER}
                        <TeacherProfile/>
                    {:else if visitorRole === role.STUDENT}
                        <Student bookmark="profile"/>
                    {/if}
                </Route>
                <Route path="/" component={homepage[visitorRole]}/>
                <Route path="/login" component={Login}/>
                <Route path="/auth/login/*" component={ProcessToken}/>
                <Route path="/catalog" component={Catalog}/>
                <Route path="/signup" component={AcceptTerms}/>
                <Route path="/public/:entityId/" let:params>
                    <PublicBadgeClassPage entityId={params.entityId}/>
                </Route>
                <Route path="/public/badges/:entityId/" let:params>
                    <PublicBadgeClassPage entityId={params.entityId}/>
                </Route>
                <Route path="/public/assertions/:entityId/" let:params>
                    <PublicBadgePage entityId={params.entityId}/>
                </Route>
                <Route path="/public/institutions/:entityId" let:params>
                    <PublicInstitutionPage entityId={params.entityId}/>
                </Route>
                <Route path="/public/issuers/:entityId/" let:params>
                    <PublicIssuerPage visitorRole={visitorRole} entityId={params.entityId}/>
                </Route>
                <Route path="/public/collections/:entityId/" let:params>
                    <PublicCollectionPage entityId={params.entityId}/>
                </Route>
                <Route component={NotFound}/>

                <!-- Expose current path through store -->
                <SubscribeToPath/>
            </Router>
        </div>

        <Footer/>
        {#if $showMainErrorDialog}
            <Modal
                    cancel={() => $showMainErrorDialog = false}
                    hideSubmit={true}
                    warning={true}
                    title={I18n.t("error.unexpected")}
                    question={I18n.t("error.description")}
                    cancelLabel={I18n.t("error.close")}/>
        {/if}
    {/if}
</div>
