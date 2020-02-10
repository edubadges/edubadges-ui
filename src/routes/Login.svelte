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
    <Button label={I18n.ts("landing.loginStudent")} className="short" href={I18n.ts("landing.loginStudent")} onClick={() => logIn(role.STUDENT)}/>
    <Button label={I18n.ts("landing.loginTeacher")} className="short" href={I18n.ts("landing.loginTeacher")} onClick={() => logIn(role.TEACHER)}/>
</div>