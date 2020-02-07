<script>
    import {Route, Router, navigate} from "svelte-routing";
    import {default as Student} from './routes/student/Main.svelte'
    import {default as Teacher} from './routes/teacher/Main.svelte'
    import {NotFound, Login} from './routes'
    import {Header, Footer} from "./components";
    import {userRole, userLoggedIn} from "./stores/user";
    import ProcessToken from "./routes/ProcessToken.svelte";
    import { role } from "./util/role";
</script>

<style>
    .app {
        max-width: var(--width-app);
        min-height: 100vh;
        margin: 0 auto;

        display: flex;
        flex-direction: column;

        box-shadow: 0 0 8px rgba(0,0,0, 0.4);
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
    <Header/>

    <div class="content">
        <Router>
            {#if $userLoggedIn && $userRole === role.STUDENT}
                <Route path="/" component={Student}/>
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
                <Route path="/auth/login/*" let:params component={ProcessToken}/>
            {:else if $userLoggedIn && $userRole === role.TEACHER}
                <Route path="/" component={Teacher}/>
                <Route path="/auth/login/*" let:params component={ProcessToken}/>
            {:else}
                <Route path="/" component={Login}/>
                <Route path="/auth/login/*" let:params component={ProcessToken}/>
            {/if}
            <Route component={NotFound}/>
        </Router>
    </div>

    <Footer/>
</div>
