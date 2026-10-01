<script>

    import {config} from "../util/config";
    import {onMount} from "svelte";
    import Spinner from "../components/Spinner.svelte";

    const serverUrl = config.serverUrl;
    const uiHostName = config.hostname;
    const version = `${VERSION}`;
    const commit = `${COMMITHASH}`;
    const branch = `${BRANCH}`;

    let versionServer = "";
    let commitServer = "";
    let branchServer = "";
    let hostNameServer = "";

    let loaded = false;

    onMount(() => {
        fetch(`${serverUrl}/extensions/git.info`).then(res => {
            res.text().then(txt => {
                const lines = txt.match(/[^\r\n]+/g);
                versionServer = lines[0];
                commitServer = lines[1];
                branchServer = lines[2];
                hostNameServer = lines[3];
                loaded = true;
            });
        })
    });

</script>
<style lang="scss">

    .version-info {
        padding: 25px;

        .git-version {
            margin-bottom: 30px;
        }

        h3 {
            margin-bottom: 10px;
        }
    }

</style>
<section class="version-info">
    {#if loaded}
        <div class="git-version">
            <h3>Client git info:</h3>
            <p>{`Version: ${version}`}</p>
            <p>{`Commit: ${commit}`}</p>
            <p>{`Branch: ${branch}`}</p>
            {#if uiHostName}
                <p>{`Host: ${uiHostName}`}</p>
            {/if}
        </div>
        <div class="git-version">
            <h3>Server git info:</h3>
            <p>{`Version: ${versionServer}`}</p>
            <p>{`Commit: ${commitServer}`}</p>
            <p>{`Branch: ${branchServer}`}</p>
            {#if hostNameServer}
                <p>{`Host: ${hostNameServer}`}</p>
            {/if}
        </div>
    {:else}
        <Spinner/>
    {/if}
</section>

