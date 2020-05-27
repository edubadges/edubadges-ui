<script>
  import {get} from "svelte/store";
  import {authToken} from "../stores/user";

  export let imageUrl;
  export let alt;
  export let useToken = true;

  async function fetchData() {
    const token = get(authToken);
    const fetchOptions = {
      method: "GET",
      redirect: "follow",
      headers: {}
    };
    if (token && useToken) {
      fetchOptions.headers.Authorization = "Bearer " + get(authToken);
    }
    const res = await fetch(imageUrl, fetchOptions);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    return url;
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

