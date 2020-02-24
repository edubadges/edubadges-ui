<script>
  import { Router, Route } from "svelte-routing";
  import { Student, Teacher, ProcessToken, NotFound, Login } from "./routes";
  import { Issuer, Badge } from "./routes/teachers";
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
  <Header />

  <div class="content">
    {#if $userLoggedIn && $userRole === role.STUDENT}
      <Router>
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
      </Router>
    {:else if $userLoggedIn && $userRole === role.TEACHER}
      <Router>
        <Route path="/" component={Teacher} />
        <Route path="/badges">
          <Teacher bookmark="badges" />
        </Route>
        <Route path="/issuers">
          <Teacher bookmark="issuers" />
        </Route>
        <Route path="/issuer/:slug" let:params>
          <Issuer slug={params.slug} />
        </Route>
        <Route path="/badge/:slug" let:params>
          <Badge slug={params.slug} />
        </Route>
        <Route path="/auth/login/*" component={ProcessToken} />
        <Route component={NotFound} />
      </Router>
    {:else}
      <Router>
        <Route path="/" component={Login} />
        <Route path="/auth/login/*" component={ProcessToken} />
        <Route component={NotFound} />
      </Router>
    {/if}
  </div>

  <Footer />
</div>
