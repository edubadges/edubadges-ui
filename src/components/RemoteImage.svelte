<script>
    import {authToken} from "../stores/user";

    export let imageUrl;
    export let alt;
    export let useToken = false;

    async function fetchData() {
        const token = $authToken;
        const fetchOptions = {
            method: "GET",
            headers: {
                "x-requested-with": "client",
            }
        };
        if (token && useToken) {
            fetchOptions.headers.Authorization = "Bearer " + token;
        }
        const res = await fetch(imageUrl, fetchOptions);
        const blob = await res.blob();
        return URL.createObjectURL(blob);
    }

    let imagePromise = fetchData();
    $: if (imageUrl) {
        imagePromise = fetchData();
    }
</script>

<style>
    img {
        align-self: center;
    }
</style>

{#if imageUrl}
    {#await imagePromise}
        <span></span>
    {:then objectUrl}
        <img src={objectUrl} alt={alt}/>
    {:catch error}
        <span></span>
    {/await}
{/if}
