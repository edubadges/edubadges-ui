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
    import badgesIcon from "../../icons/catalog.svg";
    import issuerGroupIcon from "../../icons/issuer-group-purple.svg";
    import issuerIcon from "../../icons/issuers-purple.svg";
    import usersIcon from "../../icons/issuerportal-users-purple.svg";
    import schoolbag from "../../icons/school-bag.svg";

    import {
        assertionSeries,
        badgeClassOptions,
        claimRate,
        entityTypeLookup,
        equalizeAssertionsSize,
        extractAssertionFaculties,
        facultyOptions,
        filterSeries,
        findByAttributeValue,
        issuerOptions,
        lastNumber,
        maxWeekOfAssertionSeries,
        minWeekOfAssertionSeries
    } from "../../util/insights";
    import Tooltip from "../../components/Tooltip.svelte";
    import Field from "../../components/forms/Field.svelte";
    import {Select} from "../../components/forms";
    import Button from "../../components/Button.svelte";
    import {config} from "../../util/config";

    data(Highcharts);
    Exporter(Highcharts);
    ExportData(Highcharts);
    OfflineExporting(Highcharts);

    let serverData = null;
    let loaded = false;

    //All faculties, issuer and badgeclass
    let faculties = new Map();

    //The actual assertions e.g. badgeInstances
    let directAwardAssertions = null;
    let requestedAssertions = null;
    let totalAssertions = null;

    //To calculate the claim rate we also need the directAwards which can be unaccepted and denied enrollments
    let directAwards = null;
    let enrollments = null;

    //The minor stats
    let enrollmentsOpen = 0;
    let enrollmentsDenied = 0;
    let directAwardsRejected = 0;
    let directAwardsRevoked = 0;
    let directAwardsOpen = 0;

    // Sorting options
    let badgeClassId = null;
    let issuerId = null;
    let facultyId = null;
    const currentYear = new Date().getFullYear();
    const number = currentYear - 2017
    let yearSelectOptions = new Array(number).fill(0).map((a, i) => ({name: currentYear - i}));
    yearSelectOptions.push({name: I18n.t("insights.total")})
    let year = yearSelectOptions[0];
    let facultySelectOptions = [];
    let issuerSelectOptions = [];
    let badgeClassSelectOptions = [];
    let inBadgeSelected = false;
    let inIssuerSelected = false;
    let inFacultySelected = false;

    //To calculate the X-axis
    let firstWeek = 1;
    let lastWeek = 1;

    //To calculate the Y-axis
    let maxNumber = 1;
    let firstNumber = 1;

    //Counts
    let badgeClassesCount = 0;
    let issuersCount = 0;
    let issuerGroupCount = 0;
    let usersCount = 0;
    let backpackCount = 0;

    const reload = res => {
        loaded = false;
        const filteredDA = filterSeries(res['assertions'], entityTypeLookup.ASSERTION, 'direct_award', badgeClassId, issuerId, facultyId);
        let daAssertions = assertionSeries(filteredDA);
        const filteredReq = filterSeries(res['assertions'], entityTypeLookup.ASSERTION, 'requested', badgeClassId, issuerId, facultyId);
        let reqAssertions = assertionSeries(filteredReq);
        directAwards = filterSeries(res['direct_awards'], entityTypeLookup.DIRECT_AWARD, null, badgeClassId, issuerId, facultyId);
        enrollments = filterSeries(res['enrollments'], entityTypeLookup.ENROLMENT, null, badgeClassId, issuerId, facultyId);
        const equalized = equalizeAssertionsSize(daAssertions, reqAssertions);
        daAssertions = equalized[0];
        reqAssertions = equalized[1];

        firstWeek = minWeekOfAssertionSeries(daAssertions, reqAssertions);
        lastWeek = maxWeekOfAssertionSeries(daAssertions, reqAssertions);
        directAwardAssertions = daAssertions.map(assertion => assertion.nbr);
        requestedAssertions = reqAssertions.map(assertion => assertion.nbr);
        totalAssertions = directAwardAssertions.map((nbr, index) => nbr + requestedAssertions[index]);

        enrollmentsOpen = findByAttributeValue(enrollments, 'denied', false);
        enrollmentsDenied = findByAttributeValue(enrollments, 'denied', true);
        directAwardsRejected = findByAttributeValue(directAwards, 'status', 'Rejected');
        directAwardsRevoked = findByAttributeValue(directAwards, 'status', 'Revoked');
        directAwardsOpen = findByAttributeValue(directAwards, 'status', 'Unaccepted');
        loaded = true;
    }

    const initialize = () => {
        insights(year.name).then(res => {
            serverData = res;
            faculties = extractAssertionFaculties(res['assertions'], res['direct_awards'], res['enrollments'], I18n.locale);
            //reset sorting options, except for the year
            badgeClassId = null;
            issuerId = null;
            facultyId = null;

            facultySelectOptions = facultyOptions(faculties);
            issuerSelectOptions = issuerOptions(faculties, facultyId);
            badgeClassSelectOptions = badgeClassOptions(faculties, facultyId, issuerId);

            badgeClassesCount = res["badge_class_count"];
            issuersCount = res["issuers_count"];
            issuerGroupCount = res["faculties_count"];
            usersCount = res["users_count"];
            backpackCount = res["backpack_count"]
            reload(res);
        });
    }

    onMount(initialize);

    const facultySelected = item => {
        if (inBadgeSelected || inIssuerSelected) {
            return;
        }
        inFacultySelected = true;
        setTimeout(() => inFacultySelected = false, 750);
        loaded = false;
        facultyId = item;
        issuerId = null;
        badgeClassId = null;
        issuerSelectOptions = issuerOptions(faculties, facultyId ? facultyId.identifier : null);
        badgeClassSelectOptions = badgeClassOptions(faculties, facultyId ? facultyId.identifier : null, null);
        reload(serverData);
    }

    const issuerSelected = item => {
        if (inBadgeSelected || inFacultySelected) {
            return;
        }
        inIssuerSelected = true;
        setTimeout(() => inIssuerSelected = false, 750);
        loaded = false;
        issuerId = item;
        badgeClassId = null;
        if (item) {
            facultyId = facultySelectOptions.find(option => option.identifier === item.facultyId);
        }
        badgeClassSelectOptions = badgeClassOptions(faculties, facultyId ? facultyId.identifier : null, issuerId ? issuerId.identifier : null);
        reload(serverData);
    }

    const badgeClassSelected = item => {
        if (inIssuerSelected || inFacultySelected) {
            return;
        }
        loaded = false;
        badgeClassId = item;
        inBadgeSelected = true;
        setTimeout(() => inBadgeSelected = false, 750);
        if (item) {
            facultyId = facultySelectOptions.find(option => option.identifier === item.facultyId);
            issuerId = issuerSelectOptions.find(option => option.identifier === item.issuerId);
        }
        reload(serverData);
    }

    const yearSelected = item => {
        year = item;
        initialize();
    }

    const reset = () => {
        badgeClassId = null;
        issuerId = null;
        facultyId = null;

        facultySelectOptions = facultyOptions(faculties);
        issuerSelectOptions = issuerOptions(faculties, null);
        badgeClassSelectOptions = badgeClassOptions(faculties, null, null);

        reload(serverData);
    }

    const xAxisFormatter = ctx => {
      return ctx.value + firstWeek;
    }

    afterUpdate(() => {
        if (!loaded) {
            return;
        }
        Highcharts.chart("content", {
            title: "",
            chart: {
                type: 'area',
                alignTicks: false,
                backgroundColor: '#f9f6ff',
                events: {
                    //https://jsfiddle.net/BlackLabel/vzqmb6f1/
                    load: function () {
                        Highcharts.addEvent(this.tooltip, 'headerFormatter', function (e) {
                            if (!e.isFooter) {
                                e.text = `<b>Week ${e.labelConfig.key + 1}</b><br/>`;
                                return false; // prevent default
                            }
                            return true; // run default
                        });
                    }
                }
            },
            tooltip: {
                shared: true,
                useHTML: true
            },
            navigation: {
                menuStyle: {
                    "border": "1px solid #cea0e5",
                    "background": "#ffffff",
                    "padding": "5px 0",
                },
                menuItemStyle: {
                    "padding": "0.5em 1em",
                    "fontSize": "16px",
                    "color": "#772583",
                    "background": "none",
                    "transition": "background 250ms, color 250ms"
                },
                menuItemHoverStyle: {
                    "background": "#f5ecfb", "color": "#37044f"
                }
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#cea0e5',
                    lineWidth: 0,
                    marker: {
                        lineWidth: 0,
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
                libURL: config.extensionsRootUrl + '/static/js',
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
                    lineWidth: 1,
                    // color: "#eaceff",
                    color: "#782684",
                    data: totalAssertions
                },
                {
                    name: I18n.t("insights.directAwarded"),
                    lineWidth: 1,
                    //color: "#feeedc",
                    color: "#e67506",
                    data: directAwardAssertions
                },
                {
                    name: I18n.t("insights.requested"),
                    lineWidth: 1,
                    color: "#3a9f2e",
                    // color: "#aeebc8",
                    data: requestedAssertions
                }
            ]
        })
    });


</script>

<style lang="scss">
  .page-container {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .stats-container {
    display: flex;
    width: 100%;
    flex-direction: row;
    padding: 30px;
    background-color: var(--purple-background);
  }

  .content {
    display: flex;
    width: 100%;
  }

  div.insights {
    padding-right: 30px;
    min-width: 360px;

    h2 {
      margin: 0 0 15px 0;
    }

    h3 {
      margin: 0 0 10px 0;

      &.last {
        margin-top: 5px;
      }
    }

    section.stats {
      display: flex;
      flex-direction: column;

      span.attr {
        font-size: 18px;

        &.minor {
          font-size: 16px;
        }
      }

      section.stat {
        display: flex;
        margin-bottom: 20px;

        &.minor {
          margin-bottom: 10px;
        }
      }

      span.value {
        font-size: 26px;
        margin-left: auto;

        &.total {
          color: #782684;
        }

        &.direct-awards {
          color: #e67506;
        }

        &.requested {
          color: #3a9f2e;
        }

        &.claim-rate {
          color: var(--black);
        }

        &.minor {
          font-size: 22px;
          color: var(--grey-9);
        }

      }
    }
  }

  .selectors {
    margin-top: 25px;

    .reset {
      margin-top: 15px;
      display: flex;
      flex-flow: row-reverse;
    }
  }

  .metadata-container {
    display: flex;
    flex-direction: column;
    margin-right: 25px;

    :global(section.metadata div.top-icon svg) {
      width: 96px !important;
      height: 96px !important;
      margin: auto;
    }

    section.metadata {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border: var(--card-border);
      border-radius: var(--card-border-radius);
      box-shadow: 0 3px 0 2px var(--grey-3);
      min-width: 160px;
      margin-bottom: 20px;
    }

    .top-icon {
      display: flex;
      background-color: white;
      align-items: center;
      padding: 25px;
    }

    .data {
      padding: 5px 10px;
      display: flex;

      p {
        font-size: 18px;
        font-family: "Proxima Nova", sans-serif;
      }

      .count {
        font-size: 22px;
        font-family: "Proxima Nova", sans-serif;
        color: var(--purple);
        margin-left: auto;
        word-break: keep-all;
      }
    }
  }


</style>

<div class="page-container">
  {#if loaded}

    <div class="stats-container">
      <div class="metadata-container">
        <section class="metadata">
          <div class="top-icon">
            {@html badgesIcon}
          </div>
          <div class="data">
            <p>{I18n.t("insights.badgeClasses")}</p>
            <span class="count">{badgeClassesCount}</span>
          </div>
        </section>
        <section class="metadata">
          <div class="top-icon">
            {@html issuerIcon}
          </div>
          <div class="data">
            <p>{I18n.t("insights.issuers")}</p>
            <span class="count">{issuersCount}</span>
          </div>
        </section>
        <section class="metadata">
          <div class="top-icon">
            {@html issuerGroupIcon}
          </div>
          <div class="data">
            <p>{I18n.t("insights.issuerGroups")}</p>
            <span class="count">{issuerGroupCount}</span>
          </div>
        </section>
        <section class="metadata">
          <div class="top-icon">
            {@html usersIcon}
          </div>
          <div class="data">
            <p>{I18n.t("insights.users")}</p>
            <span class="count">{usersCount}</span>
          </div>
        </section>
        <section class="metadata">
          <div class="top-icon">
            {@html schoolbag}
          </div>
          <div class="data">
            <p>{I18n.t("insights.backpack")}</p>
            <span class="count">{backpackCount}</span>
          </div>
        </section>

      </div>
      <div class="insights">
        <h2>{I18n.t("insights.awardedBadges")}</h2>
        <section class="stats">
          <section class="stat">
            <span class="attr">{I18n.t("insights.totalAwarded")}</span>
            <span class="value total">{Number(lastNumber(totalAssertions)).toLocaleString()}</span>
          </section>
          <section class="stat">
            <span class="attr">{I18n.t("insights.directAwarded")}</span>
            <span class="value direct-awards">{Number(lastNumber(directAwardAssertions)).toLocaleString()}</span>
          </section>
          <section class="stat">
            <span class="attr">{I18n.t("insights.requested")}</span>
            <span class="value requested">{Number(lastNumber(requestedAssertions)).toLocaleString()}</span>
          </section>
          <section class="stat">
            <span class="attr">{I18n.t("insights.claimRate")}</span>
            <span class="value claim-rate">{claimRate(totalAssertions, directAwards, enrollments)}%
            <Tooltip tipKey="claimRate"/>
          </span>
          </section>
          <section class="stats">
            {#if directAwardsOpen > 0 || directAwardsRevoked > 0 || directAwardsRejected > 0}
              <h3>{I18n.t("insights.directAwards")}<Tooltip tipKey="directAwards"/></h3>
              {#if directAwardsOpen > 0}
                <section class="stat minor">
                  <span class="attr minor">{I18n.t("insights.open")}</span>
                  <span class="value minor">{directAwardsOpen}</span>
                </section>
              {/if}
              {#if directAwardsRevoked > 0}
                <section class="stat minor">
                  <span class="attr minor">{I18n.t("insights.revoked")}</span>
                  <span class="value minor">{directAwardsRevoked}</span>
                </section>
              {/if}
              {#if directAwardsRejected > 0}
                <section class="stat minor">
                  <span class="attr minor">{I18n.t("insights.directAwardDenied")}</span>
                  <span class="value minor">{directAwardsRejected}</span>
                </section>
              {/if}
            {/if}
            {#if enrollmentsOpen > 0 || enrollmentsDenied > 0}
              <h3 class="last">{I18n.t("insights.enrollments")}<Tooltip tipKey="enrollments"/></h3>
              {#if enrollmentsOpen > 0 }
                <section class="stat minor">
                  <span class="attr minor">{I18n.t("insights.open")}</span>
                  <span class="value minor">{enrollmentsOpen}</span>
                </section>
              {/if}
              {#if enrollmentsDenied > 0 }
                <section class="stat minor">
                  <span class="attr minor">{I18n.t("insights.requestedDenied")}</span>
                  <span class="value minor">{enrollmentsDenied}</span>
                </section>
              {/if}
            {/if}
          </section>
        </section>
        <section class="selectors">
          <Field entity="insights" attribute="faculty">
            <Select
              value={facultyId}
              showIndicator={!facultyId}
              showChevron={!facultyId}
              handleSelect={facultySelected}
              placeholder={I18n.t("models.insights.facultyPlaceholder")}
              items={facultySelectOptions}
              optionIdentifier="identifier"/>
          </Field>
          <Field entity="insights" attribute="issuer">
            <Select
              value={issuerId}
              showIndicator={!issuerId}
              showChevron={!issuerId}
              handleSelect={issuerSelected}
              placeholder={I18n.t("models.insights.issuerPlaceholder")}
              items={issuerSelectOptions}
              optionIdentifier="identifier"/>
          </Field>
          <Field entity="insights" attribute="badgeClass">
            <Select
              value={badgeClassId}
              showIndicator={!badgeClassId}
              showChevron={!badgeClassId}
              handleSelect={badgeClassSelected}
              placeholder={I18n.t("models.insights.badgeClassPlaceholder")}
              items={badgeClassSelectOptions}
              optionIdentifier="identifier"/>
          </Field>
          <Field entity="insights" attribute="year">
            <Select
              value={year}
              handleSelect={yearSelected}
              placeholder={I18n.t("models.insights.yearPlaceholder")}
              items={yearSelectOptions}
              optionIdentifier="name"/>
          </Field>
          <section class="reset">
            <Button text={I18n.t("insights.reset")} action={reset} secondary={true}
                    disabled={!badgeClassId && !issuerId && !facultyId}/>
          </section>

        </section>
      </div>
      <div id="content" class="content">
      </div>
    </div>
  {:else}
    <Spinner message={I18n.t("insights.crunching")}/>
  {/if}
</div>
