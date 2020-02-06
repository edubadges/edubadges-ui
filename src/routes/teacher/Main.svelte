<script>
    import {user, userRole} from "../../stores/user";
    import {onMount} from "svelte";
    import {requestProfile, requestSocialAccounts, requestUserData} from "../../api";

    onMount(() => {
        requestProfile()
                .then(profile => {
                    const slug = profile['slug'];
                    requestUserData(slug)
                            .then(res => console.log(res));
                    requestSocialAccounts()
                            .then(userData => {
                                $user.email = userData[0]['primaryEmail'];
                            }, error => {
                                console.error(error);
                            });

                }, error => {
                    console.error(error);
                });
    })
</script>

<div>
    {$userRole} page <br>
    email: { $user['email']}
</div>
