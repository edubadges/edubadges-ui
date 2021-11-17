<script>
    import {onMount} from "svelte";
    import Spinner from "../../Spinner.svelte";
    import {authToken, userLoggedIn, userRole} from "../../../stores/user";
    import {navigate} from "svelte-routing";
    import {ltiContext} from "../../../stores/lti";
    import {role} from "../../../util/role";
    import {getLTIContext} from "../../../api";

    onMount(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const status = urlSearchParams.get("status");
        if (status === "failure") {
            const adminEmail = urlSearchParams.get("admin_email");
            const queryParam = adminEmail ? `admin_email=${adminEmail}` : "";
            const path = `/auth/login?${queryParam}&code=2&authError=error`;
            navigate(path);
        } else if (status === "success") {
            $authToken = urlSearchParams.get("auth_token");
            $userLoggedIn = true;
            $userRole = role.TEACHER;
            $ltiContext.launchId = urlSearchParams.get("launch_id");
            getLTIContext($ltiContext.launchId).then(ctx => $ltiContext.launchJson = ctx);
            navigate("/");
        }
    });

</script>

<style lang="scss">
</style>
<Spinner/>
