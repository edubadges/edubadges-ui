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
    import {
        assertionSeries,
        entityTypeLookup,
        equalizeAssertionsSize,
        extractAssertionFaculties,
        filterSeries
    } from "../../util/insights";

    data(Highcharts);
    Exporter(Highcharts);
    ExportData(Highcharts);
    OfflineExporting(Highcharts);

    let serverData = null;
    let loaded = false;

    //All faculties, issuer and badgeclass
    let faculties = null;

    //The actual assertions e.g. badgeInstances
    let directAwardAssertions = null;
    let requestedAssertions = null;
    let totalAssertions = null;

    //To calculate the claim rate we also need the directAwards which can be unaccepted and denied enrollments
    let directAwards = null;
    let enrollments = null;

    // Sorting options
    let badgeClassId = null;
    let issuerId = null;
    let facultyId = null;
    let year = new Date().getFullYear();

    //To calculate the X-axis
    let firstWeek = 1;
    let lastWeek = 1;

    //To calculate the Y-axis
    let maxNumber = 1;
    let firstNumber = 1;

    onMount(() => {
        insights().then(res => {
            serverData = res;
            faculties = extractAssertionFaculties(res['assertions'], I18n.locale);
            const filteredDA = filterSeries(res['assertions'], entityTypeLookup.ASSERTION, 'direct_award', badgeClassId, issuerId, facultyId);
            let daAssertions = assertionSeries(filteredDA);
            const filteredReq = filterSeries(res['assertions'], entityTypeLookup.ASSERTION, 'requested', badgeClassId, issuerId, facultyId);
            let reqAssertions = assertionSeries(filteredReq);
            directAwards = assertionSeries(filterSeries(res['direct_awards'], entityTypeLookup.DIRECT_AWARD, null, badgeClassId, issuerId, facultyId))
                .map(da => da.nbr);
            enrollments = assertionSeries(filterSeries(res['enrollments'], entityTypeLookup.ENROLMENT, null, badgeClassId, issuerId, facultyId))
                .map(enr => enr.nbr);
            if (daAssertions.length !== reqAssertions.length) {
                const equalized = equalizeAssertionsSize(daAssertions, reqAssertions);
                daAssertions = equalized[0];
                reqAssertions = equalized[1];
            }
            firstWeek = Math.min(daAssertions[0].weekNumber, reqAssertions[0].weekNumber);
            lastWeek = Math.max(daAssertions[daAssertions.length - 1].weekNumber, reqAssertions[reqAssertions.length - 1].weekNumber);
            directAwardAssertions = daAssertions.map(assertion => assertion.nbr);
            requestedAssertions = reqAssertions.map(assertion => assertion.nbr);
            totalAssertions = directAwardAssertions.map((nbr, index) => nbr + requestedAssertions[index]);
            loaded = true;
        });
    });

    const xAxisFormatter = ctx => ctx.value + firstWeek;

    afterUpdate(() => {
        if (!loaded) {
            return;
        }
        Highcharts.chart("content", {
            title: "",
            chart: {
                type: 'area',
                alignTicks: false,
            },
            tooltip: {
                shared: true,
                //https://jsfiddle.net/BlackLabel/vzqmb6f1/
                headerFormat: 'Week {point.key}<br/>',
                useHTML: true
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
            yAxis: {
                labels: {
                    formatter: ctx => {
                        return ctx.tick.pos / 2
                    }
                },
                title: {
                    text: ''
                }
            },
            xAxis: {
                accessibility: {
                    rangeDescription: I18n.t("insights.date")
                },
                labels: {
                    formatter: xAxisFormatter
                },
                title: {
                    text: 'Week'
                },
                categories: new Array(lastWeek - firstWeek).map((val, index) => index + firstWeek)
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
                    data: totalAssertions
                },
                {
                    name: I18n.t("insights.directAwarded"),
                    lineWidth: 3,
                    color: "#e97501",
                    data: directAwardAssertions
                },
                {
                    name: I18n.t("insights.requested"),
                    lineWidth: 3,
                    color: "#009e4d",
                    data: requestedAssertions
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

    </div>
    <div id="content" class="content">
    </div>

  {:else}
    <Spinner message={I18n.t("insights.crunching")}/>
  {/if}

</div>
