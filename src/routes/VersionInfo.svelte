<script>

  import {config} from "../util/config";
  import {onMount} from "svelte";

  const serverUrl = config.serverUrl;
  const version = `${VERSION}`;
  const commit = `${COMMITHASH}`;
  const branch = `${BRANCH}`;

  let versionServer = "";
  let commitServer = "";
  let branchServer = "";

  onMount(() => {
    fetch(`${serverUrl}/static/git.info`).then(res => {
      res.text().then(txt => {
        const lines = txt.match(/[^\r\n]+/g);
        versionServer = lines[0];
        commitServer = lines[1];
        branchServer = lines[2];
      });
    })
  });

</script>
<style lang="scss">

  .version-info {
    padding: 25px;

    h3 {
      margin-bottom: 15px;
    }
  }

</style>
<section class="version-info">
  <div class="client">
    <h3>Client git info:</h3>
    <p>{`Version: ${version}`}</p>
    <p>{`Commit: ${commit}`}</p>
    <p>{`Branch: ${branch}`}</p>
  </div>
  <div class="server">
    <h3>Server git info:</h3>
    <p>{`Version: ${versionServer}`}</p>
    <p>{`Commit: ${commitServer}`}</p>
    <p>{`Branch: ${branchServer}`}</p>
  </div>
</section>

