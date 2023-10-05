<script>
    import I18n from "i18n-js";
    import Button from "../../components/Button.svelte";
    import {fetchInstitutionAdmins, fetchInstitutionBadges} from "../../api";
    import {Spinner} from "../../components";
    import {JsonView} from '@zerodevx/svelte-json-view'
    import {copyText} from 'svelte-copy';

    let queryObjects = [
        {
            name: "institutionAdmins",
            api: fetchInstitutionAdmins
        },
        {
            name: "institutionBadges",
            api: fetchInstitutionBadges
        }
    ]
    let queryData = [];
    let currentQueryObject;
    let showData = false;
    let showLoaded = false;
    let loaded = true;

    const fetchObjects = queryObject => {
        currentQueryObject = queryObject.name;
        loaded = false;
        queryObject.api().then(res => {
            queryData = res;
            showLoaded = true;
            loaded = true;
        })
    }

    const clear = () => {
        queryData = [];
        currentQueryObject = null;
        showData = false;
        showLoaded = false;
    }

    const toCSV = content => {
        if (content.length === 0) {
            return "";
        }
        const keys = Object.keys(content[0]);
        const header = keys.join(",") + "\n"
        return header + content
            .map(item => keys.map(key => item[key] ? item[key].toString().replaceAll(",", " ") : "").join(","))
            .join("\n");
    }

    const download = (content, fileName) => {
        const a = document.createElement("a");
        a.href = "data:text/plain;charset=utf-8," + toCSV(content);
        a.download = fileName;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    $: disabled = queryObject => {
        return currentQueryObject !== queryObject.name || queryData.length === 0;
    }

</script>

<style lang="scss">
    .page-container {
        display: flex;
    }

    .content {
        flex: 1;
        padding: 30px 20px;
    }

    .queries {
        display: flex;
        flex-direction: column;
        padding: 30px 20px;
    }

    .query {
        padding: 30px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 0.25rem 0.25rem 0 #00000040;
        border: 1px solid #00000040;
        margin-bottom: 35px;
    }

    .controls {
        display: flex;
        gap: 35px;
    }

    .info {
        margin-top: 20px;
    }

    .wrap {
        ul, li, span {
            font-family: monospace !important;
            font-size: 14px;
        }
    }

</style>

<div class="page-container">
    <div class="content">
        <h2>Management queries</h2>
        <div class="queries">
            {#if loaded}
                {#each queryObjects as queryObject}
                    <div class="query">
                        <div class="controls">
                            <Button action={() => fetchObjects(queryObject)}
                                    text={I18n.t(`managementQueries.${queryObject.name}`)}/>
                            <Button action={() => download(queryData, `${queryObject.name}.csv`)}
                                    disabled={disabled(queryObject)}
                                    text={I18n.t("managementQueries.download")}/>
                            <Button action={() => copyText(toCSV(queryData))}
                                    disabled={disabled(queryObject)}
                                    text={I18n.t("managementQueries.copy")}/>
                            <Button action={() => showData = !showData}
                                    disabled={disabled(queryObject)}
                                    text={I18n.t(`managementQueries.${(showData && currentQueryObject === queryObject.name) ? "hide" : "show"}`)}/>
                            <Button action={() => clear()}
                                    disabled={disabled(queryObject)}
                                    text={I18n.t("managementQueries.clear")}/>
                        </div>
                        {#if queryData.length > 0 && showLoaded && currentQueryObject === queryObject.name}
                            <p class="info">{I18n.t("managementQueries.loaded", {name: I18n.t(`managementQueries.${queryObject.name}`)})}</p>
                        {/if}
                        {#if queryData.length > 0 && showData && currentQueryObject === queryObject.name}
                            <div class="wrap">
                                <JsonView json={queryData}/>
                            </div>
                        {/if}
                    </div>
                {/each}
            {:else}
                <Spinner/>
            {/if}
        </div>
    </div>
</div>
