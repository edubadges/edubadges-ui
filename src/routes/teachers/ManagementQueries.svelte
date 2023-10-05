<script>
    import I18n from "i18n-js";
    import Button from "../../components/Button.svelte";
    import {fetchInstitutionAdmins} from "../../api";
    import {Spinner} from "../../components";
    import {JsonView} from '@zerodevx/svelte-json-view'
    import {copyText} from 'svelte-copy';

    let institutionAdmins = [];
    let showInstitutionAdmins = false;
    let showLoaded = false;
    let loaded = true;

    const institutionAdminsQuery = () => {
        loaded = false;
        fetchInstitutionAdmins().then(res => {
            institutionAdmins = res;
            showLoaded = true;
            loaded = true;
        })
    }

    const clear = () => {
        institutionAdmins = [];
        showInstitutionAdmins = false;
        showLoaded = false;
    }

    const toCSV = content => {
        if (content.length === 0) {
            return "";
        }
        const keys = Object.keys(content[0]);
        let csv = keys.join(",") + "\n"
        content.forEach(item => csv += keys.map(key => item[key]).join(",") + "\n")
        return csv
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
                <div class="query">
                    <div class="controls">
                        <Button action={() => institutionAdminsQuery()}
                                text={I18n.t("managementQueries.institutionAdmins")}/>
                        <Button action={() => download(institutionAdmins, "institution-admins.csv")}
                                disabled={institutionAdmins.length === 0}
                                text={I18n.t("managementQueries.download")}/>
                        <Button action={() => copyText(toCSV(institutionAdmins))}
                                disabled={institutionAdmins.length === 0}
                                text={I18n.t("managementQueries.copy")}/>
                        <Button action={() => showInstitutionAdmins = !showInstitutionAdmins}
                                disabled={institutionAdmins.length === 0}
                                text={I18n.t(`managementQueries.${showInstitutionAdmins ? "hide" : "show"}`)}/>
                        <Button action={() => clear()}
                                disabled={institutionAdmins.length === 0}
                                text={I18n.t("managementQueries.clear")}/>
                    </div>
                    {#if institutionAdmins.length > 0 && showLoaded}
                        <p class="info">{I18n.t("managementQueries.loaded", {name: I18n.t("managementQueries.institutionAdmins")})}</p>
                    {/if}
                    {#if institutionAdmins.length > 0 && showInstitutionAdmins}
                        <div class="wrap">
                            <JsonView json={institutionAdmins}/>
                        </div>
                    {/if}
                </div>
            {:else}
                <Spinner/>
            {/if}
        </div>
    </div>
</div>
