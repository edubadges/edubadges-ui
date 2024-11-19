<script>
    import I18n from "i18n-js";
    import Button from "../../components/Button.svelte";
    import {
        fetchCountMicroCredentials,
        fetchInstitutionAdmins,
        fetchInstitutionBadgeOverview,
        fetchInstitutionBadges,
        fetchInstitutionMicroCredentials,
        fetchIssuerMembers,
        fetchMicroCredentialsBadges,
        getProfile
    } from "../../api";
    import {Spinner} from "../../components";
    import {JsonView} from '@zerodevx/svelte-json-view/dist'
    import {copyText} from 'svelte-copy';
    import {Select} from "../../components/forms";
    import {onMount} from "svelte";
    import {authToken, userRole} from "../../stores/user";
    import {role} from "../../util/role";

    let queryObjects = [];
    let queryData = [];
    let currentQueryObject;
    let showData = false;
    let loaded = false;
    let timeMs = 0;


    onMount(() => {
        getProfile().then(res => {
            loaded = true;
            if (res.is_superuser) {
                queryObjects = [
                    {
                        name: "institutionAdmins",
                        api: fetchInstitutionAdmins
                    },
                    {
                        name: "institutionBadges",
                        api: fetchInstitutionBadges
                    },
                    {
                        name: "institutionMicroCredentials",
                        api: fetchInstitutionMicroCredentials
                    },
                    {
                        name: "countMicroCredentials",
                        api: fetchCountMicroCredentials
                    },
                    {
                        name: "microCredentialsBadges",
                        api: fetchMicroCredentialsBadges
                    },
                    {
                        name: "institutionBadgeOverview",
                        api: fetchInstitutionBadgeOverview
                    },
                    {
                        name: "issuerMembers",
                        api: fetchIssuerMembers
                    },
                ]
            } else {
                queryObjects = [
                    {
                        name: "institutionBadgeOverview",
                        api: fetchInstitutionBadgeOverview
                    },
                    {
                        name: "issuerMembers",
                        api: fetchIssuerMembers
                    }
                ]
            }
        });
    });

    const fetchObjects = value => {
        const queryObject = queryObjects.find(obj => obj.name === value.value)
        currentQueryObject = value;
        loaded = false;
        const now = Date.now();
        queryObject.api().then(res => {
            queryData = res;
            timeMs = (Date.now() - now);
            loaded = true;
        })
    }

    const clear = () => {
        queryData = [];
        currentQueryObject = null;
        showData = false;
    }

    const toCSV = content => {
        const keys = Object.keys(content[0]);
        const header = keys.join(",") + "\n"
        return header + content
            .map(item => keys.map(key => item[key] ? item[key].toString().replaceAll(",", " ") : "").join(","))
            .join("\n");
    }

    const download = () => {
        const a = document.createElement("a");
        a.href = "data:text/plain;charset=utf-8," + toCSV(queryData);
        a.download = `${currentQueryObject.value}.csv`;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    $: disabled = () => queryData.length === 0;

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
        <h2>{I18n.t("managementQueries.title")}</h2>
        <div class="queries">
            {#if loaded}
                <div class="query">
                    <div class="controls">
                        <Select value={currentQueryObject}
                                handleSelect={value => fetchObjects(value)}
                                items={queryObjects.map(queryObject => ({name: I18n.t(`managementQueries.${queryObject.name}`), value: queryObject.name}))}
                                optionIdentifier="value"
                                placeholder={I18n.t("managementQueries.select")}
                                clearable={true}/>
                        <Button action={() => download()}
                                disabled={disabled()}
                                text={I18n.t("managementQueries.download")}/>
                        <Button action={() => copyText(toCSV(queryData))}
                                disabled={disabled()}
                                text={I18n.t("managementQueries.copy")}/>
                        <Button action={() => showData = !showData}
                                disabled={disabled()}
                                text={I18n.t(`managementQueries.${showData  ? "hide" : "show"}`)}/>
                        <Button action={() => clear()}
                                disabled={disabled()}
                                text={I18n.t("managementQueries.clear")}/>
                    </div>
                    {#if queryData.length > 0 }
                        <p class="info">{I18n.t("managementQueries.loaded", {
                            name: I18n.t(`managementQueries.${currentQueryObject.value}`),
                            time: timeMs
                        })}</p>
                    {/if}
                    {#if queryData.length > 0 && showData}
                        <div class="wrap">
                            <JsonView json={queryData}/>
                        </div>
                    {/if}
                </div>
            {:else}
                <Spinner/>
            {/if}
        </div>
    </div>
</div>
