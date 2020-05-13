<script>
  import {get} from "svelte/store";
  import {authToken} from "../stores/user";

  export let imageUrl;
  export let alt;
  export let useToken = true;

  async function fetchData() {
    const fetchOptions = {
      method: "GET",
      credentials: "same-origin",
      redirect: "manual",
      headers: {}
    };
    if (useToken) {
      fetchOptions.headers.Authorization = "Bearer " + get(authToken);
    }
    const res = await fetch(imageUrl, fetchOptions);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }
</script>
{#if imageUrl}
  {#await fetchData()}
    <span></span>
  {:then objectUrl}
    <img src={objectUrl} alt={alt}/>
  {:catch error}
    <span></span>
  {/await}
{/if}

