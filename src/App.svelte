<script>
    import {Route, Router, navigate} from "svelte-routing";
    import {default as Student} from './routes/student/Main.svelte'
    import {default as Teacher} from './routes/teacher/Main.svelte'
    import {NotFound, Login} from './routes'
    import {Header, Footer} from "./components";
    import {user} from "./stores/user";
</script>

<style>
    .app {
        width: 100%;
        max-width: var(--width-app);
        min-height: 100vh;
        margin: 0 auto;

        display: flex;
        flex-direction: column;
    }

    @media (min-width: 600px) {
        .app{
            padding: 0 15px;
        }
    }

    .content {
        flex: 1;
        background-color: white;
    }
</style>

<div class="app">
    <Header/>

    <div class="content">
        <Router>
            {#if $user.student}
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

            {:else if $user.teacher}
                <Route path="/" component={Teacher}/>

            {:else}
                <Route path="/" component={Login}/>
            {/if}
            <Route component={NotFound}/>
        </Router>
    </div>

    <Footer/>
</div>
