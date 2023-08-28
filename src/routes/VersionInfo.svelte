<script>

    import {config} from "../util/config";
    import {onMount} from "svelte";
    import Spinner from "../components/Spinner.svelte";
    import {getValidatorInfo} from "../api";

    const serverUrl = config.serverUrl;
    const uiHostName = config.hostname;
    const version = `${VERSION}`;
    const commit = `${COMMITHASH}`;
    const branch = `${BRANCH}`;

    let versionServer = "";
    let commitServer = "";
    let branchServer = "";
    let hostNameServer = "";

    let versionValidator = "";
    let commitValidator = "";
    let branchValidator = "";
    let hostNameValidator = "";

    let loaded = false;

    onMount(() => {
        fetch(`${serverUrl}/extensions/git.info`).then(res => {
            res.text().then(txt => {
                const lines = txt.match(/[^\r\n]+/g);
                versionServer = lines[0];
                commitServer = lines[1];
                branchServer = lines[2];
                hostNameServer = lines[3]
                getValidatorInfo().then(json => {
                    const lines = json.git.match(/[^\r\n]+/g);
                    versionValidator = lines[0];
                    commitValidator = lines[1];
                    branchValidator = lines[2];
                    hostNameValidator = lines[3]
                    loaded = true;
                })
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
    {#if loaded}
        <div class="client">
            <h3>Client git info:</h3>
            <p>{`Version: ${version}`}</p>
            <p>{`Commit: ${commit}`}</p>
            <p>{`Branch: ${branch}`}</p>
            {#if uiHostName}
                <p>{`Host: ${uiHostName}`}</p>
            {/if}

        </div>
        <div class="server">
            <h3>Server git info:</h3>
            <p>{`Version: ${versionServer}`}</p>
            <p>{`Commit: ${commitServer}`}</p>
            <p>{`Branch: ${branchServer}`}</p>
            {#if hostNameServer}
                <p>{`Host: ${hostNameServer}`}</p>
            {/if}
        </div>
        <div class="validator">
            <h3>Validator git info:</h3>
            <p>{`Version: ${versionValidator}`}</p>
            <p>{`Commit: ${commitValidator}`}</p>
            <p>{`Branch: ${branchValidator}`}</p>
            {#if hostNameValidator}
                <p>{`Host: ${hostNameValidator}`}</p>
            {/if}
        </div>
    {:else}
        <Spinner/>
    {/if}
</section>

