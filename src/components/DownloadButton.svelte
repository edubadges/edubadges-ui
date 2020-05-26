<script>
  import {link} from "svelte-routing";
  import Button from "./Button.svelte";
  import {get} from "svelte/store";
  import {authToken} from "../stores/user";

  export let text;
  export let secondary;
  export let disabled = false;
  export let small;
  export let url;
  export let filename;
  export let useToken = true;

  const forceDownload = (blob, filename) => {
    const a = document.createElement('a');
    a.download = filename;
    a.href = blob;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // Current blob size limit is around 500MB for browsers
  const downloadResource = (url, filename) => {
    if (!filename) {
      filename = url.split('\\').pop().split('/').pop();
    }
    fetch(url, {
      headers: new Headers({
        Origin: window.location.origin,
        Authorization: useToken ? "Bearer " + get(authToken) : ""
      }),
      mode: 'cors'
    })
      .then(response => response.blob())
      .then(blob => forceDownload(window.URL.createObjectURL(blob), filename));
  }

</script>

<Button {secondary} {text} {disabled} {small} action={() => downloadResource(url, filename)}/>
