<script>
    import {userLoggedIn, authToken} from "../stores/user"
    import {navigate} from "svelte-routing";
    import {role} from "../util/role";
    import {onMount} from "svelte";

    onMount(() => {
        const authToken = window.location.href.split("=")[1]; // TODO: use request param
        handleToken(authToken)
                .then((success, error) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    navigate("/");
                });
    });

    const handleToken = (token) => {
        return new Promise((resolve, reject) => {
            if (token) {
                $authToken = token;
                $userLoggedIn = true;
                resolve();
            } else {
                reject("no token");
            }
        })
    };
</script>

<div>
    <h1>Please wait while loading your data.</h1>
</div>
