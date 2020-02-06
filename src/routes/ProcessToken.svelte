<script>
    import {user, userLoggedIn, userRole, authToken} from "../stores/user"
    import {navigate} from "svelte-routing";
    import {role} from "../util/role";
    import {onMount} from "svelte";
    import {requestProfile, requestSocialAccounts, requestUserData} from "../api";
    import {config} from "../stores/config";

    onMount(() => {
        const authToken = window.location.href.split("=")[1]; // TODO: use request param
        saveToken(authToken)
                .then((success, error) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    requestProfile()
                            .then(profile => {
                                $userLoggedIn = true;
                                const slug = profile['slug'];
                                requestUserData(slug)
                                        .then(res => console.log(res));
                                requestSocialAccounts()
                                        .then(userData => {
                                            $user.email = userData[0]['primaryEmail'];
                                            navigate("/");
                                        }, error => {
                                            console.error(error);
                                        });

                            }, error => {
                                console.error(error);
                            });
                });
    });

    const saveToken = (token) => {
        return new Promise((resolve, reject) => {
            if (token) {
                $authToken = token;
                resolve();
            } else {
                reject();
            }
        })
    };

    const parseUserData = (userData) => {
        console.log(userData);
        navigate("/");
    };
</script>

<div>
    <h1>Please wait while loading your data.</h1>
</div>
