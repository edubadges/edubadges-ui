<script>
    import {userLoggedIn, userRole} from "../stores/user"
    import {navigate} from "svelte-routing";
    import {role} from "../util/role";
    // const page = { stores };

    const validateToken = () => {
        $userLoggedIn = true;
        console.log($userLoggedIn, $userRole);
        console.log($userLoggedIn && $userRole === role.STUDENT);
        // navigate("/test");
    };

    const token = window.location.href.split("=")[1];

</script>

<div>
    <p>Received Token: {token}</p>
    <button on:click={validateToken}>Continue to user screen</button>
</div>