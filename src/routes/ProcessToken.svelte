<script>
    import {user} from "../stores/user"
    import {navigate} from "svelte-routing";
    import {role} from "../util/role";
    // const page = { stores };

    const validateToken = () => {
        $user.loggedIn = true;
        console.log($user);
        // navigate("/test");
    };

    const token = window.location.href.split("=")[1];

</script>

<div>
    <p>Received Token: {token}</p>
    <button on:click={validateToken}>Continue to user screen</button>
</div>