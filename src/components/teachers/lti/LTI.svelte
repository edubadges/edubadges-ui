<script>
    import {navigate, Route, Router} from "svelte-routing";
    import {ltiContext} from "../../../stores/lti";
    import {getGrades, getLTIContext, getMembers} from "../../../api";
    import {importIcon, userManagementIcon} from "../../../icons";
    import schoolTrophyIcon from "../../../icons/school-book-trophy.svg";
    import UserBreadcrumb from "../UserBreadcrumb.svelte";
    import I18n from "i18n-js";
    import LTIHeader from "./LTIHeader.svelte";
    import LTIContext from "./LTIContext.svelte";
    import Spinner from "../../Spinner.svelte";
    import LTIUsers from "./LTIUsers.svelte";
    import LTIGrades from "./LTIGrades.svelte";

    export let tab = "context";

    let launchData;
    let users;
    let gradesLineItems;
    let loaded = false;

    Promise.all([
        getLTIContext($ltiContext.launchId),
        getGrades($ltiContext.launchId),
        getMembers($ltiContext.launchId),
    ]).then(res => {
        launchData = res[0];
        gradesLineItems = res[1];
        users = res[2];
        loaded = true;
    })

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
        width: 100%;
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
                    <LTIUsers users={users}/>
                </Route>
                <Route path="/grades">
                    <LTIGrades users={users} gradesLineItems={gradesLineItems}/>
                </Route>
            </Router>
        </div>
    {:else}
        <Spinner/>
    {/if}
</div>