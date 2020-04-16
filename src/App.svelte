<script>
  import { Router, Route, navigate } from "svelte-routing";
  import { Student, ProcessToken, NotFound, Login, Validate } from "./routes";
  import { Badges, Manage } from "./routes/teachers";
  import { Header, Footer, SubscribeToPath } from "./components";
  import { Header as TeacherHeader } from "./components/teachers";
  import Spinner from "./components/Spinner.svelte";
  import { userRole, userLoggedIn, redirectPath } from "./stores/user";
  import { role } from "./util/role";
  import { onMount } from "svelte";
  import { getSocialAccount } from "./api";

  const homepage = {
    guest: Login,
    [role.STUDENT]: Student,
    [role.TEACHER]: Badges
  };

  let loaded = false;

  onMount(() => {
    //if we are heading to /auth/login/ then we proceed
    const path = window.location.pathname;
    if (path !== "/auth/login/" && path !== "/validate") {
      getSocialAccount()
        .then(() => {
          loaded = true;
        })
        .catch(() => {
          $redirectPath = window.location.pathname;
          navigate("/login");
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
  }

  @media (min-width: 600px) {
    :global(body) {
      margin: 0 40px;
    }
  }
</style>

<div class="app">
  {#if !loaded}
    <Spinner />
  {:else}
    {#if visitorRole === role.TEACHER}
      <TeacherHeader />
    {:else}
      <Header />
    {/if}

    <div class="page">
      <Router>
        <!-- Student -->
        <Route path="/backpack">
          <Student bookmark="backpack" />
        </Route>

        <Route path="/badge-requests">
          <Student bookmark="badge-requests" />
        </Route>
        <Route path="/collections">
          <Student bookmark="collections" />
        </Route>
        <Route path="/profile">
          <Student bookmark="profile" />
        </Route>
        <Route path="/validate" component={Validate} />

        <!-- Teacher -->
        <Route path="/manage/*mainEntity" component={Manage} />

        <!-- Shared -->
        <Route path="/" component={homepage[visitorRole]} />
        <!-- Shared -->
        <Route path="/login" component={Login} />

        <Route path="/auth/login/*" component={ProcessToken} />
        <Route component={NotFound} />

        <!-- Expose current path through store -->
        <SubscribeToPath />
      </Router>
    </div>

    <Footer />
  {/if}
</div>
