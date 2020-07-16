<script>
  import {onMount} from "svelte";
  import I18n from "i18n-js";
  import {Router, Route, navigate} from "svelte-routing";
  import {Student, ProcessToken, NotFound, Login} from "./routes";
  import AcceptTerms from "./routes/AcceptTerms.svelte";
  import {Badges, Manage, Users, UserPermissions} from "./routes/teachers";
  import Test from "./routes/Test.svelte";
  import {Header, Footer, SubscribeToPath, Spinner} from "./components";
  import {
    Header as TeacherHeader,
    BadgeclassAwarder,
    InviteEnrollments,
    TeacherProfile,
    TeacherPermissions
  } from "./components/teachers";
  import {userRole, userLoggedIn, userName, redirectPath, showMainErrorDialog} from "./stores/user";
  import {role} from "./util/role";
  import {getSocialAccount} from "./api";
  import PublicBadgeClassPage from "./components/shared/PublicBadgeClassPage.svelte"
  import EnrollmentDetails from "./routes/students/EnrollmentDetails.svelte";
  import {Flash} from "./components/forms/";
  import BadgeDetails from "./routes/students/BadgeDetails.svelte";
  import PublicBadgePage from "./components/shared/PublicBadgePage.svelte";
  import {config} from "./util/config";
  import Modal from "./components/forms/Modal.svelte";
  import PublicIssuerPage from "./components/shared/PublicIssuerPage.svelte";

  const homepage = {
    guest: Login,
    [role.STUDENT]: Student,
    [role.TEACHER]: Badges
  };

  let loaded = false;

  onMount(() => {
    //if we are heading to /auth/login/ then we proceed
    const path = window.location.pathname;
    if (path.indexOf("public") === -1 && path !== "/auth/login/" && path.indexOf("signup") === -1) {
      getSocialAccount()
        .then(res => {
          loaded = true;
          $userLoggedIn = true;
          $userName = `${res[0].firstName} ${res[0].lastName}`;
        })
        .catch(() => {
          $redirectPath = window.location.pathname;
          navigate("/login");
          $userLoggedIn = false;
          $userName = "";
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
  }

  div.page.flex {
    display: flex;
  }

  div.page-container {
    height: auto;
  }

  input::placeholder {
    color: var(--grey-7);
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

    <div class={`page ${visitorRole === role.STUDENT ? 'flex' : ''}`} >
      <Router>
        <!-- Student -->
        <Route path="/backpack">
          <Student bookmark="backpack"/>
        </Route>

        <Route path="/badge-requests">
          <Student bookmark="badge-requests"/>
        </Route>
        <Route path="/collections">
          <Student bookmark="collections"/>
        </Route>
        <Route path="/enrollment/:enrollmentId/" let:params>
          <EnrollmentDetails enrollmentId={params.enrollmentId}/>
        </Route>
        <Route path="/details/:entityId/" let:params>
          <BadgeDetails entityId={params.entityId}/>
        </Route>
        <Route path="/signup" component={AcceptTerms}/>

        <!-- Teacher -->
        <Route path="/users" component={Users}/>
        <Route path="/users/:userId/:entity" component={UserPermissions}/>
        <Route path="/manage/*mainEntity" component={Manage}/>
        <Route
          path="/badgeclass/:entityId/*subEntity"
          component={BadgeclassAwarder}/>
        <Route path="/invite-enrollements/:entityId/" let:params>
          <InviteEnrollments entityId={params.entityId}/>
        </Route>
        <Route path="/permissions/:entity" component={TeacherPermissions} />

        <!-- Shared -->
        <Route path="/public/:entityId/" let:params>
          <PublicBadgeClassPage visitorRole={visitorRole} entityId={params.entityId}/>
        </Route>
        <Route path="/public/assertions/:entityId/" let:params>
          <PublicBadgePage entityId={params.entityId}/>
        </Route>
        <Route path="/public/issuers/:entityId/" let:params>
          <PublicIssuerPage visitorRole={visitorRole} entityId={params.entityId}/>
        </Route>
        <Route path="/profile">
          {#if visitorRole === role.TEACHER}
            <TeacherProfile/>
          {:else if visitorRole === role.STUDENT}
            <Student bookmark="profile"/>
          {/if}
        </Route>
        {#if config.local}
          <Route path="/public/test" component={Test}/>
        {/if}
        <Route path="/" component={homepage[visitorRole]}/>
        <Route path="/login" component={Login}/>
        <Route path="/auth/login/*" component={ProcessToken}/>
        <Route component={NotFound}/>

        <!-- Expose current path through store -->
        <SubscribeToPath/>
      </Router>
    </div>

    <Footer/>
    {#if $showMainErrorDialog}
      <Modal cancel={() => $showMainErrorDialog = false} hideSubmit={true} warning={true} title={I18n.t("error.unexpected")}
        question={I18n.t("error.description")} cancelLabel={I18n.t("error.close")}/>
    {/if}
  {/if}
</div>
