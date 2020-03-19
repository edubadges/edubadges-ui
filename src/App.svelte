<script>
  import { Router, Route } from "svelte-routing";
  import { Student, ProcessToken, NotFound, Login } from "./routes";
  import { Badges, Issuers } from "./routes/teachers";
  import { Header, Footer } from "./components";
  import { userRole, userLoggedIn } from "./stores/user";
  import { role } from "./util/role";
</script>

<style>
  .app {
    max-width: var(--width-app);
    min-height: 100vh;
    margin: 0 auto;

    display: flex;
    flex-direction: column;

    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  }

  @media (min-width: 600px) {
    :global(body) {
      margin: 0 40px;
    }
  }

  .content {
    flex: 1;
    background-color: white;

    display: flex;
  }
</style>

<div class="app">
  {#if $userLoggedIn && $userRole === role.STUDENT}
    <Router>
      <Header />

      <div class="content">
        <Route path="/" component={Student} />
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
        <Route path="/auth/login/*" component={ProcessToken} />
        <Route component={NotFound} />
      </div>
    </Router>
  {:else if $userLoggedIn && $userRole === role.TEACHER}
    <Router>
      <Header tabs={['/', '/issuers']} />

      <div class="content">
        <Route path="/" component={Badges} />
        <Route path="/issuers" component={Issuers} />
        <Route path="/auth/login/*" component={ProcessToken} />
        <Route component={NotFound} />
      </div>
    </Router>
  {:else}
    <Router>
      <Header />

      <div class="content">
        <Route path="/" component={Login} />
        <Route path="/auth/login/*" component={ProcessToken} />
        <Route component={NotFound} />
      </div>
    </Router>
  {/if}

  <Footer />
</div>
