<script>
    import {user, config, redirectPath, userRole} from "../stores/user";
    import I18n from "i18n-js";
    import Button from "../components/Button.svelte";
    import {role} from "../util/role";
    import {getService} from "../util/getService";

    const requestLoginToken = (chosenRole) => {
        $userRole = role[chosenRole];
        const service = getService[chosenRole];
        window.location.href = `${$config['serverUrl']}/account/sociallogin?provider=${service}`;
    }
</script>

Login page

<Button label={I18n.ts("landing.loginStudent")} className="short" href={I18n.ts("landing.loginStudent")} onClick={() => requestLoginToken("STUDENT")}/>
<Button label={I18n.ts("landing.loginTeacher")} className="short" href={I18n.ts("landing.loginTeacher")} onClick={() => requestLoginToken("TEACHER")}/>
