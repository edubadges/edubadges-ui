<script>
    import {userLoggedIn, userRole} from "../stores/user"
    import {navigate} from "svelte-routing";
    import {role} from "../util/role";
    import {onMount} from "svelte";

    onMount(() => {if($userLoggedIn) navigate("/")});

    const validateToken = () => {
        $userLoggedIn = true;
        navigate("/");
    };

    const token = window.location.href.split("=")[1]; // TODO: use request param

</script>

<div>
    <p>Received Token: {token}</p>
    <button on:click={validateToken}>Continue to user screen</button>
</div>
