<script>
  import {link} from "svelte-routing";
  import Button from "./Button.svelte";

  export let text;
  export let secondary;
  export let disabled = false;
  export let small;
  export let url;
  export let filename;

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
        'Origin': location.origin
      }),
      mode: 'cors'
    })
      .then(response => response.blob())
      .then(blob => forceDownload(window.URL.createObjectURL(blob), filename));
  }

</script>

<Button {secondary} {text} {disabled} {small} action={() => downloadResource(url, filename)}/>
