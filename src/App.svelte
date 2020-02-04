<script>
    import {Route, Router, navigate} from "svelte-routing";
    import {default as Student} from './routes/student/Main.svelte'
    import {default as Teacher} from './routes/teacher/Main.svelte'
    import {NotFound, Login} from './routes'
    import {Header, Footer } from "./components";
    import {user} from "./stores/user";
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

    .myconext {
        display: flex;
        flex-direction: column;
        height: 100%;
        margin-bottom: 100px;
    }

    .content {
        display: flex;
        flex-direction: column;
        background-color: white;
        align-items: stretch;
        max-width: var(--width-app);
        width: 100%;
        margin: 0 auto;
        border-left: 2px solid var(--color-primary-blue);
        border-right: 2px solid var(--color-primary-blue);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border-bottom: 4px solid var(--color-primary-blue);
    }

    @media (max-width: 1250px) {
        .myconext {
            margin: 0 15px;
        }

        .content {
            width: 100%;
        }
    }
</style>

<div class="edubadges">
    <Header/>

    <div class="content">
        <Router>
            {#if $user.student}
                <Route path="/" component={Student}/>
                <Route path="/backpack">
                    <Home bookmark="backpack"/>
                </Route>
                <Route path="/badge-requests">
                    <Home bookmark="badge-requests"/>
                </Route>
                <Route path="/collections">
                    <Home bookmark="collections"/>
                </Route>
                <Route path="/profile">
                    <Home bookmark="profile"/>
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
