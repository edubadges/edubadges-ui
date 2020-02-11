<script>
    import I18n from "i18n-js";
    import Button from "../components/Button.svelte";
    import {role} from "../util/role";
    import {userRole} from "../stores/user";
    import {getService} from "../util/getService";
    import {requestLoginToken} from "../api";

    const logIn = (chosenRole) => {
        $userRole = chosenRole;
        const service = getService(chosenRole);
        requestLoginToken(service);
    }
</script>

<div>
    Login page
    <Button label={I18n.ts("landing.loginStudent")} href="/login" onClick={() => logIn(role.STUDENT)}/>
    <Button label={I18n.ts("landing.loginTeacher")} href="/login" onClick={() => logIn(role.TEACHER)}/>
</div>