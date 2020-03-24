<script>
  import { Router, Route } from "svelte-routing";
  import { Student, ProcessToken, NotFound, Login } from "./routes";
  import { Badges, Manage } from "./routes/teachers";
  import { Header, Footer, SubscribeToPath } from "./components";
  import { Header as TeacherHeader } from "./components/teachers";
  import { userRole, userLoggedIn } from "./stores/user";
  import { role } from "./util/role";

  const homepage = {
    guest: Login,
    [role.STUDENT]: Student,
    [role.TEACHER]: Badges
  };

  $: visitorRole = $userLoggedIn ? $userRole : "guest";
</script>

<style>
  .app {
    max-width: var(--width-app);
    min-height: 100vh;
    margin: 0 auto;

    display: flex;
    flex-direction: column;

    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);

    background-color: white;
  }

  @media (min-width: 600px) {
    :global(body) {
      margin: 0 40px;
    }
  }
</style>

<div class="app">
  {#if visitorRole === role.STUDENT}
    <Header logout />
  {:else if visitorRole === role.TEACHER}
    <TeacherHeader />
  {:else}
    <Header />
  {/if}

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

    <!-- Teacher -->
    <Route path="/manage/*mainEntity" component={Manage} />

    <!-- Shared -->
    <Route path="/" component={homepage[visitorRole]} />
    <Route path="/auth/login/*" component={ProcessToken} />
    <Route component={NotFound} />

    <!-- Expose current path through store -->
    <SubscribeToPath />
  </Router>

  <Footer />
</div>
