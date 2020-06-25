<script>
  import {onMount} from "svelte";
  import {Router, Route, navigate} from "svelte-routing";
  import {Student, ProcessToken, NotFound, Login} from "./routes";
  import AcceptTerms from "./routes/AcceptTerms.svelte";
  import {Badges, Manage, Users, EditUsers} from "./routes/teachers";
  import Test from "./routes/Test.svelte";
  import {Header, Footer, SubscribeToPath, Spinner} from "./components";
  import {
    Header as TeacherHeader,
    BadgeclassAwarder,
    InviteEnrollments
  } from "./components/teachers";
  import {userRole, userLoggedIn, redirectPath} from "./stores/user";
  import {role} from "./util/role";
  import {getSocialAccount} from "./api";
  import PublicBadgeClassPage from "./components/shared/PublicBadgeClassPage.svelte"
  import EnrollmentDetails from "./routes/students/EnrollmentDetails.svelte";
  import {Flash} from "./components/forms/";
  import BadgeDetails from "./routes/students/BadgeDetails.svelte";
  import PublicBadgePage from "./components/shared/PublicBadgePage.svelte";
  import {config} from "./util/config";

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
        })
        .catch(() => {
          $redirectPath = window.location.pathname;
          navigate("/login");
          $userLoggedIn = false;
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
    max-width: 1090px;
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
        <Route path="/profile">
          <Student bookmark="profile"/>
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
        <Route path="/users/:userId/:entity" component={EditUsers}/>
        <Route path="/manage/*mainEntity" component={Manage}/>
        <Route
          path="/badgeclass/:entityId/*subEntity"
          component={BadgeclassAwarder}/>
        <Route path="/invite-enrollements/:entityId/" let:params>
          <InviteEnrollments entityId={params.entityId}/>
        </Route>


        <!-- Shared -->
        <Route path="/public/:entityId/" let:params>
          <PublicBadgeClassPage visitorRole={visitorRole} entityId={params.entityId}/>
        </Route>
        <Route path="/public/assertions/:entityId/" let:params>
          <PublicBadgePage entityId={params.entityId}/>
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
  {/if}
</div>
