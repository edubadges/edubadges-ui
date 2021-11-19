<script>
    import {navigate, Route, Router} from "svelte-routing";
    // import {onMount} from "svelte";
    // import {authToken, userLoggedIn, userRole} from "../../../stores/user";
    // import {navigate} from "svelte-routing";
    // import {ltiContext} from "../../../stores/lti";
    // import {role} from "../../../util/role";
    // import {getGrades, getLTIContext, getMembers} from "../../../api";
    import context from './json/message_launch.json';
    import {importIcon, userManagementIcon} from "../../../icons";
    import schoolTrophyIcon from "../../../icons/school-book-trophy.svg";
    import UserBreadcrumb from "../UserBreadcrumb.svelte";
    import I18n from "i18n-js";
    import LTIHeader from "./LTIHeader.svelte";
    // import {onMount} from "svelte";
    // import {getLTIContext} from "../../../api";
    import {ltiContext} from "../../../stores/lti";
    import LTIContext from "./LTIContext.svelte";
    import Spinner from "../../Spinner.svelte";
    import EntityHeaderTabs from "../EntityHeaderTabs.svelte";

    export let tab = "context";
    let launchData = context;
    let loaded = true;
    //onMount(() => getLTIContext($ltiContext.launchId).then(res => {
    //    launchData = res;
    //   loaded = true
    //}));

    $: tabs = [
        {
            entity: "ltiContext",
            href: `/lti/context`,
            icon: importIcon

        },
        {
            entity: "ltiUsers",
            href: `/lti/participants`,
            icon: userManagementIcon
        },
        {
            entity: "ltiGrades",
            href: `/lti/grades`,
            icon: schoolTrophyIcon
        }
    ];

    $: if (!tab) {
        navigate(tabs[0].href, {replace: true});
    }

</script>

<style>
    div.lti-container {
        display: flex;
        flex-direction: column;
    }
</style>
<div class="lti-container">
    <UserBreadcrumb path={I18n.t("lti.path")}/>
    {#if loaded}

        <LTIHeader launchData={launchData} tabs={tabs}/>
        <div class="main-content-margin">
            <Router>
                <Route path="/context">
                    <LTIContext launchData={launchData}/>
                </Route>
                <Route path="/participants">
                    <LTIContext launchData={launchData}/>
                </Route>
                <Route path="/grades">
                    <LTIContext launchData={launchData}/>
                </Route>
            </Router>
        </div>
    {:else}
        <Spinner/>
    {/if}
</div>