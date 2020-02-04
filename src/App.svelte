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
    :global(:root) {
        --color-primary-blue: #0061b0;
        --color-primary-green: #008738;
        --color-primary-black: #202020;
        --color-primary-red: #d00000;
        --color-primary-grey: #c4cdd5;
        --width-app: 1244px;
    }

    .edubadges {
        max-width: var(--width-app);
        margin: 0 auto;
        min-height: 100vh;

        display: flex;
        flex-direction: column;
    }

    .content {
        flex: 1;
        background-color: white;
        width: 100%;
        margin: 0 auto;
        border-left: 2px solid var(--color-primary-blue);
        border-right: 2px solid var(--color-primary-blue);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border-bottom: 4px solid var(--color-primary-blue);
    }

    @media (min-width: 600px) {
        .edubadges {
            margin: 0 15px;
        }
    }
</style>

<div class="edubadges">
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

            {:else if $userLoggedIn && $userRole === role.TEACHER}
                <Route path="/" component={Teacher}/>

            {:else}
                <Route path="/auth/login/*" let:params component={ProcessToken}/>
                <Route path="/" component={Login}/>
            {/if}
            <Route component={NotFound}/>
        </Router>
    </div>

    <Footer/>
</div>
