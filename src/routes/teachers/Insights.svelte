<script>
    import {afterUpdate, onMount} from "svelte";
    import Spinner from "../../components/Spinner.svelte";
    import {insights} from "../../api";
    import Highcharts from "highcharts";
    import I18n from "i18n-js";
    import data from "highcharts/modules/data";
    import OfflineExporting from "highcharts/modules/offline-exporting";
    import Exporter from 'highcharts/modules/exporting';
    import ExportData from 'highcharts/modules/export-data';
    import {assertionSeries} from "../../util/insights";

    data(Highcharts);
    Exporter(Highcharts);
    ExportData(Highcharts);
    OfflineExporting(Highcharts);

    let serverData = null;
    let loaded = false;

    //The actual assertions e.g. badgeInstances
    let directAwardsAssertions = null;
    let requestedAssertions = null;

    //To calculate the claim rate we also need the directAwards which can be unaccepted and denied enrollments
    let directAwards = null;
    let enrollments = null;

    // Sorting options
    let badgeClassId = null;
    let issuerId = null;
    let facultyId = null;
    let year = new Date().getFullYear();

    onMount(() => {
        insights().then(res => {
            serverData = res;
            //todo add names of badgeId, issuerId, facultyId
            directAwardsAssertions = assertionSeries(res['assertions'], 'direct_award',false, badgeClassId, issuerId, facultyId);
            requestedAssertions = assertionSeries(res['assertions'], 'requested', false ,badgeClassId, issuerId, facultyId);
            directAwards = assertionSeries(res['direct_awards'], undefined, false ,badgeClassId, issuerId, facultyId);
            enrollments = assertionSeries(res['enrollments'], undefined, true, badgeClassId, issuerId, facultyId);
            debugger;
            loaded = true;
        });
    });

    const xAxisFormatter = ctx => {
        return ctx.value;
        // const date = new Date(ctx.value);
        // return `${date.getDay()}- ${date.getMonth()}`;
    }

    afterUpdate(() => {
        if (!loaded) {
            return;
        }
        Highcharts.chart("content", {
            chart: {
                type: 'area'
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#ffffff',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#cea0e5'
                    }
                },
            },
            xAxis: {
                accessibility: {
                    rangeDescription: I18n.t("insights.date")
                },
                labels: {
                    formatter: xAxisFormatter
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: true,
                // libURL: props.baseUrl,
                allowHTML: true,
                fallbackToExportServer: false,
                buttons: {
                    contextButton: {
                        symbolStroke: '#772583',
                        menuItems: ['downloadPDF', 'separator', 'downloadPNG', 'downloadCSV']
                    },
                }
            },
            credits: {enabled: false},
            series: [
                {
                    name: I18n.t("insights.totalAwarded"),
                    lineWidth: 3,
                    color: "#762483",
                    data: [8, 7, 6, 9, 2, 4, 6, 5, 6, 6]
                },
                {
                    name: I18n.t("insights.directAwarded"),
                    lineWidth: 3,
                    color: "#e97501",
                    data: [4, 7, 3, 2, 5, 6, 2, 2, 2, 6]
                },
                {
                    name: I18n.t("insights.requested"),
                    lineWidth: 3,
                    color: "#009e4d",
                    data: [1, 2, 2, 2, 0, 1, 1, 2, 1, 2]
                }
            ]
        })
    });

</script>

<style lang="scss">
  .page-container {
    display: flex;
    flex-direction: column;
  }

  .content {
    padding: 30px 20px;
    width: 100%;
    margin: 0 auto
  }

  div.insights {
    --badge-margin-right: 20px;


  }


</style>

<div class="page-container">
  {#if loaded}
    <!--    <SideBarCatelog/>-->
    <div class="insights">
      {JSON.stringify(serverData)}
    </div>
    <div id="content" class="content">
      <!--      <CatalogToolBar bind:sorting={$sortTarget} bind:view={view}/>-->


    </div>

  {:else}
    <Spinner message={I18n.t("insights.crunching")}/>
  {/if}

</div>
