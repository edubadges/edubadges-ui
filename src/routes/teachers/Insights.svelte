<script>
    import {afterUpdate, onMount} from "svelte";
    import Spinner from "../../components/Spinner.svelte";
    import {getProfile, insights} from "../../api";
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
        claimRatePercentage,
        entityTypeLookup,
        equalizeAssertionsSize,
        extractAssertionFaculties,
        facultyOptions,
        filterSeries,
        institutionOptions,
        issuerOptions,
        minMaxDateOfAssertionSeries, padTrailingZero,
        totalNbrByAttributeValue
    } from "../../util/insights";
    import Tooltip from "../../components/Tooltip.svelte";
    import Field from "../../components/forms/Field.svelte";
    import {Select} from "../../components/forms";
    import Button from "../../components/Button.svelte";
    import {config} from "../../util/config";
    import {queryData} from "../../api/graphql";
    import {isEmpty} from "../../util/utils";
    import {badgeClassFilterTypes} from "../../util/catalogFilters";
    import CheckBox from "../../components/CheckBox.svelte";

    data(Highcharts);
    Exporter(Highcharts);
    ExportData(Highcharts);
    OfflineExporting(Highcharts);

    let serverData = null;
    let profile = {is_superuser: false, unloaded: true};
    let loaded = false;

    //Superusers can select institutions
    let institutions = [];
    let countSURFInTotal = false;

    //All faculties, issuer and badgeclass
    let faculties = new Map();

    //The actual assertions e.g. badgeInstances
    let directAwardAssertions = null;
    let requestedAssertions = null;
    let totalAssertions = null;

    //To calculate the claim rate we also need the directAwards which can be unaccepted and denied enrollments
    let directAwards = null;
    let enrollments = null;

    let useMonths = false;

    //Edubadges in backpack
    let totalAwarded = 0;
    let directAwarded = 0;
    let totalRequestedAssertions = 0;
    let publicAssertions = 0;

    //Direct awarded
    let totalDirectAwards = 0;
    let directAwardedAccepted = 0;
    let directAwardDenied = 0;
    let directAwardsOpen = 0;
    let directAwardsRevoked = 0;
    let directAwardsExpired = 0;
    let claimRate = 0;

    //Requested
    let totalRequested = 0;
    let enrollmentsOpen = 0;
    let acceptedAndApproved = 0;
    let enrollmentsDenied = 0;
    let assertionRequestedRevoked = 0;

    // Sorting options
    let badgeClassId = null;
    let issuerId = null;
    let facultyId = null;
    let institutionId = null;
    let currentInstitution = {};
    let sectorSelectOptions = ["ALL", "WO", "HBO", "MBO"].map(sector => ({
        name: I18n.t(`catalog.education.${sector}`), value: sector
    }))
    let sector = sectorSelectOptions[0];
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const number = currentYear - 2017
    let yearSelectOptions = new Array(number).fill(0).map((_, i) => ({name: currentYear - i})).toReversed();
    let yearStart = yearSelectOptions[0];
    let yearEnd = yearSelectOptions[yearSelectOptions.length - 1];
    const translation = I18n.locale === "en" ? I18n.translations.en : I18n.translations.nl;
    let monthSelectOptions = translation.monthNames.map((month, index) => ({name: month, value: index + 1}))
    let monthStart = monthSelectOptions[0];
    let monthEnd = monthSelectOptions[currentMonth];

    let facultySelectOptions = [];
    let issuerSelectOptions = [];
    let badgeClassSelectOptions = [];
    let inBadgeSelected = false;
    let inIssuerSelected = false;
    let inFacultySelected = false;

    const badgeTypes = [{name: I18n.t("catalog.badgeClassType.ALL"), value: badgeClassFilterTypes.ALL},
        {name: I18n.t("catalog.badgeClassType.REGULAR"), value: badgeClassFilterTypes.REGULAR},
        {name: I18n.t("catalog.badgeClassType.MICRO_CREDENTIALS"), value: badgeClassFilterTypes.MICRO_CREDENTIALS},
        {name: I18n.t("catalog.badgeClassType.EXTRA_CURRICULAR"), value: badgeClassFilterTypes.EXTRA_CURRICULAR}]
    let badgeType = badgeTypes[0];

    //To calculate the X-axis
    let categories = [];
    let firstDate = null;
    let lastDate = null;

    //Counts
    let badgeClassesCount = 0;
    let issuersCount = 0;
    let issuerGroupCount = 0;
    let usersCount = 0;
    let backpackCount = 0;

    const query = `query {
      publicInstitutions {
        id,
        institutionType,
        nameEnglish,
        identifier,
        nameDutch,
        entityId
        },
      currentInstitution {
        entityId,
        institutionType,
        identifier,
        nameEnglish,
        nameDutch,
        }
      }`

    const queryNoSuperUser = `query {
      currentInstitution {
        entityId,
        nameEnglish,
        nameDutch,
        }
      }`

    const reload = res => {
        loaded = false;
        const filteredDA = filterSeries(res['assertions'],
            entityTypeLookup.ASSERTION,
            'direct_award',
            badgeClassId,
            issuerId,
            facultyId,
            badgeType.value,
            sector.value,
            monthStart.value,
            yearStart.name,
            monthEnd.value,
            yearEnd.name);
        const filteredDaNotRevoked = filteredDA.filter(assertion => assertion.revoked === false);
        let daAssertions = assertionSeries(filteredDaNotRevoked);
        const filteredReq = filterSeries(res['assertions'],
            entityTypeLookup.ASSERTION,
            'requested',
            badgeClassId,
            issuerId,
            facultyId,
            badgeType.value,
            sector.value,
            monthStart.value,
            yearStart.name,
            monthEnd.value,
            yearEnd.name);
        const filteredReqNotRevoked = filteredReq.filter(assertion => assertion.revoked === false);
        let reqAssertions = assertionSeries(filteredReqNotRevoked);

        directAwards = filterSeries(res['direct_awards'],
            entityTypeLookup.DIRECT_AWARD,
            null,
            badgeClassId,
            issuerId,
            facultyId,
            badgeType.value,
            sector.value,
            monthStart.value,
            yearStart.name,
            monthEnd.value,
            yearEnd.name);
        enrollments = filterSeries(res['enrollments'],
            entityTypeLookup.ENROLMENT,
            null,
            badgeClassId,
            issuerId,
            facultyId,
            badgeType.value,
            sector.value,
            monthStart.value,
            yearStart.name,
            monthEnd.value,
            yearEnd.name);
        const equalized = equalizeAssertionsSize(daAssertions, reqAssertions);
        daAssertions = equalized[0];
        reqAssertions = equalized[1];

        //Edubadges in backpack
        directAwarded = totalNbrByAttributeValue(filteredDA, 'revoked', false);
        totalRequestedAssertions = totalNbrByAttributeValue(filteredReq, 'revoked', false);
        totalAwarded = directAwarded + totalRequestedAssertions;
        const notRevokedAssertions = filteredReq.concat(filteredDA).filter(assertion => assertion.revoked === false);
        publicAssertions = totalNbrByAttributeValue(notRevokedAssertions, 'public', true);

        //Direct awarded
        directAwardedAccepted = directAwarded;
        directAwardDenied = totalNbrByAttributeValue(directAwards, 'status', 'Rejected');
        directAwardsOpen = totalNbrByAttributeValue(directAwards, 'status', 'Unaccepted');
        directAwardsRevoked = totalNbrByAttributeValue(filteredDA, 'revoked', true);
        const directAwardBundles = filterSeries(res['direct_award_bundles'] || [],
            entityTypeLookup.DIRECT_AWARD,
            null,
            badgeClassId,
            issuerId,
            facultyId,
            badgeType.value,
            sector.value,
            monthStart.value,
            yearStart.name,
            monthEnd.value,
            yearEnd.name);
        directAwardsExpired = directAwardBundles.reduce((acc, bundle) => {
            acc += bundle.direct_award_expired_count;
            return acc;
        }, 0)
        totalDirectAwards = directAwardedAccepted + directAwardDenied + directAwardsOpen + directAwardsRevoked + directAwardsExpired;
        claimRate = claimRatePercentage(directAwardedAccepted, (totalDirectAwards - directAwardsRevoked));

        //Requested
        acceptedAndApproved = totalRequestedAssertions;
        enrollmentsDenied = totalNbrByAttributeValue(enrollments, 'denied', true);
        assertionRequestedRevoked = totalNbrByAttributeValue(filteredReq, 'revoked', true);
        enrollmentsOpen = totalNbrByAttributeValue(enrollments, 'denied', false);
        totalRequested = acceptedAndApproved + enrollmentsDenied + assertionRequestedRevoked + enrollmentsOpen;

        //these are the actual three series
        directAwardAssertions = daAssertions.map(assertion => assertion.nbr);
        requestedAssertions = reqAssertions.map(assertion => assertion.nbr);
        totalAssertions = directAwardAssertions.map((nbr, index) => nbr + requestedAssertions[index]);

        //This determines the x-as categories
        firstDate = minMaxDateOfAssertionSeries(daAssertions, reqAssertions, false);
        lastDate = minMaxDateOfAssertionSeries(daAssertions, reqAssertions, true);
        useMonths = firstDate.getFullYear() === lastDate.getFullYear();
        const formatter = new Intl.DateTimeFormat(I18n.locale, {month: 'short'});
        categories = totalAssertions.map(() => {
            const monthF = formatter.format(firstDate);
            const yF = useMonths ? "" : firstDate.getFullYear() + "-"
            firstDate.setMonth(firstDate.getMonth() + 1)
            return yF + monthF.substring(0, 1).toUpperCase() + monthF.substring(1, monthF.length - 1);
        });

        loaded = true;
    }

    const initialize = () => {
        const institutionEntityId = institutionId ? institutionId.identifier : "all";
        const profilePromise = profile.unloaded ? getProfile() : Promise.resolve(profile);
        Promise.all([insights(institutionEntityId, countSURFInTotal), profilePromise]).then(arr => {
            serverData = arr[0];
            profile = arr[1];
            if (profile.is_superuser && isEmpty(institutions)) {
                institutionId = {
                    name: I18n.t("insights.total"),
                    identifier: "all"
                };
                queryData(query).then(res => {
                    institutions = [institutionId].concat(institutionOptions(res.publicInstitutions));
                    currentInstitution = res.currentInstitution;
                });
            } else if (!profile.is_superuser && isEmpty(currentInstitution)) {
                queryData(queryNoSuperUser).then(res => {
                    currentInstitution = res.currentInstitution;
                });
            }
            faculties = extractAssertionFaculties(serverData['assertions'], serverData['direct_awards'], serverData['enrollments'], I18n.locale);
            //reset sorting options, except for the year
            badgeClassId = null;
            issuerId = null;
            facultyId = null;

            facultySelectOptions = facultyOptions(faculties);
            issuerSelectOptions = issuerOptions(faculties, facultyId);
            badgeClassSelectOptions = badgeClassOptions(faculties, facultyId, issuerId);

            badgeClassesCount = serverData["badge_class_count"];
            issuersCount = serverData["issuers_count"];
            issuerGroupCount = serverData["faculties_count"];
            usersCount = serverData["users_count"];
            backpackCount = serverData["backpack_count"];
            reload(serverData);
        });
    }

    onMount(initialize);

    const whichSelectedInstitution = (institutionSelected, homeInstitution) => {
        if (institutionSelected) {
            return institutionSelected.identifier === "all" ? I18n.t("insights.allInstitutions") : institutionSelected.name;
        }
        const name = I18n.locale === "en" ? "nameEnglish" : "nameDutch";
        const backupName = I18n.locale === "en" ? "nameDutch" : "nameEnglish";
        return homeInstitution[name] || homeInstitution[backupName];

    }

    $: selectedInstitutionName = whichSelectedInstitution(institutionId, currentInstitution);

    const institutionSelected = item => {
        loaded = false;
        institutionId = item;
        //Prevent double initialization
        if (item.identifier !== "all") {
            countSURFInTotal = false;
        }
        initialize();
    }

    const toggleCountSURFInTotal = () => {
        countSURFInTotal = !countSURFInTotal;
        initialize();
    }

    const sectorSelected = item => {
        sector = item;
        reload(serverData);
    }

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

    const fromToInvariant = startChanged => {
        /**
         * Enforce constraint
         * (year_start < year_end) OR
         * (year_start == year_end AND month_start <= month_end)
         */
        if (yearStart.name > yearEnd.name) {
            if (startChanged) {
                yearEnd = yearSelectOptions.find(option => option.name === yearStart.name);
            } else {
                yearStart = yearSelectOptions.find(option => option.name === yearEnd.name);
            }
        } else if (yearStart.name === yearEnd.name && monthStart.value > monthEnd.value) {
            if (startChanged) {
                monthEnd = monthSelectOptions.find(option => option.value === monthStart.value);
            } else {
                monthStart = monthSelectOptions.find(option => option.value === monthEnd.value);
            }
        }
        reload(serverData);
    }

    const yearStartSelected = item => {
        yearStart = item;
        fromToInvariant(true);
    }

    const monthStartSelected = item => {
        monthStart = item;
        fromToInvariant(true);
    }

    const yearEndSelected = item => {
        yearEnd = item;
        fromToInvariant(false);
    }

    const monthEndSelected = item => {
        monthEnd = item;
        fromToInvariant(false);
    }

    const badgeTypeSelected = item => {
        badgeType = item;
        reload(serverData);
    }

    const reset = () => {
        badgeClassId = null;
        issuerId = null;
        facultyId = null;
        institutionId = institutions.find(institution => institution.identifier === "all");
        yearStart = yearSelectOptions[0];
        yearEnd = yearSelectOptions[yearSelectOptions.length - 1];
        monthStart = monthSelectOptions[0];
        monthEnd = monthSelectOptions[currentMonth];

        facultySelectOptions = facultyOptions(faculties);
        issuerSelectOptions = issuerOptions(faculties, null);
        badgeClassSelectOptions = badgeClassOptions(faculties, null, null);

        reload(serverData);
    }

    afterUpdate(() => {
        if (!loaded || totalAssertions.length === 0) {
            return;
        }
        Highcharts.chart("content", {
            title: "",
            chart: {
                type: 'line',
                alignTicks: false,
                backgroundColor: '#f9f6ff',
                events: {
                    //https://jsfiddle.net/BlackLabel/vzqmb6f1/
                    load: function () {
                        Highcharts.addEvent(this.tooltip, 'headerFormatter', function (e) {
                            if (!e.isFooter) {
                                e.text = `<b>${e.labelConfig.key}</b><br/>`;
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
                        return ctx.tick.pos
                    }
                },
                allowDecimals: false,
                title: {
                    text: ''
                }
            },
            xAxis: {
                categories: categories,
                labels: {
                    formatter: ctx => ctx.value,
                    title: {
                        text: I18n.t(`insights.${useMonths ? "month" : "term"}`)
                    }
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: true,
                libURL: config.extensionsRootUrl + '/static/js',
                allowHTML: true,
                fallbackToExportServer: false,
                chartOptions: {
                    title: {
                        text: I18n.t("insights.exportTitle"),
                    }
                },
                buttons: {
                    contextButton: {
                        symbolStroke: '#772583',
                        text: "Export",
                        menuItems: ['downloadPDF', 'separator', 'downloadPNG', 'downloadCSV']
                    },
                }
            },
            credits: {enabled: false},
            series: [
                {
                    name: I18n.t("insights.totalAwarded"),
                    lineWidth: 2,
                    color: "#782684",
                    data: totalAssertions
                },
                {
                    name: I18n.t("insights.directAwarded"),
                    lineWidth: 2,
                    color: "#e67506",
                    data: directAwardAssertions
                },
                {
                    name: I18n.t("insights.requested"),
                    lineWidth: 2,
                    color: "#3a9f2e",
                    data: requestedAssertions
                }
            ]
        })
    })
    ;


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

        :global(span.title) {
            width: auto !important;
            margin-left: auto;
        }
    }

    .content-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        h2 {
            text-align: center;
            font-size: 22px;
            margin-bottom: 15px;
        }
    }

    .content {
        display: flex;
        width: 100%;
        height: 100%;
    }

    .no-content {
        margin: 8px 0 0 50px;
    }

    div.insights {
        padding: 0 40px 0 5px;
        min-width: 400px;

        .title-wrapper {
            display: flex;
        }

        h2 {
            margin: 0 0 15px 0;
        }

        h3 {
            margin: 15px 0 10px 0;
        }

        section.stats {
            display: flex;
            flex-direction: column;

            span.attr {
                font-size: 18px;

                &.orange {
                    color: #e67506;
                }

                &.green {
                    color: #3a9f2e;
                }
            }

            section.stat {
                display: flex;
                margin-bottom: 15px;
                align-items: center;

                &.sub {
                    margin-left: 25px;
                }
            }

            span.value {
                font-size: 22px;
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

    .checkbox-container {
        display: flex;
        margin: 10px 0 15px 0;
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

    .year-month-selection-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 8px;

        span.header {
            font-weight: bold;
        }

        .year-month-selection {
            display: flex;
            gap: 15px;

            :global(.select-field) {
                &:first-child {
                    flex-grow: 2;
                }

                &:nth-child(2) {
                    width: 50%;
                }
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
                <div class="title-wrapper">
                    <h2>{I18n.t("insights.awardedBadges")}</h2>
                    <Tooltip tooltipText={I18n.t("insights.tooltips.awardedBadges")} placement="right"/>
                </div>
                <section class="stats">
                    <section class="stat">
                        <span class="attr">{I18n.t("insights.totalAwarded")}
                        </span>
                        <span class="value total">{Number(totalAwarded).toLocaleString()}</span>
                    </section>
                    <section class="stat sub">
                        <span class="attr orange">{I18n.t("insights.directAwarded")}
                        </span>
                        <span class="value direct-awards">{Number(directAwarded).toLocaleString()}</span>
                    </section>
                    <section class="stat sub">
                        <span class="attr  green">{I18n.t("insights.requested")}
                        </span>
                        <span class="value requested">{Number(totalRequestedAssertions).toLocaleString()}</span>
                    </section>
                    <section class="stat">
                        <span class="attr">{I18n.t("insights.public")}
                        </span>
                        <span class="value">{Number(publicAssertions).toLocaleString()}</span>
                    </section>
                </section>
                <section class="stats">
                    <div class="title-wrapper">
                        <h3>{I18n.t("insights.directAwards")}</h3>
                        <Tooltip tooltipText={I18n.t("insights.tooltips.directAwards")}/>
                    </div>
                    <section class="stat">
                        <span class="attr">{I18n.t("insights.totalDirectAwards")}
                        </span>
                        <span class="value">{Number(totalDirectAwards).toLocaleString()}</span>
                    </section>
                    <section class="stat sub">
                        <span class="attr orange">{I18n.t("insights.directAwardedAccepted")}
                        </span>
                        <span class="value direct-awards">
                            {Number(directAwardedAccepted).toLocaleString()}
                        </span>
                    </section>
                    <section class="stat sub">
                        <span class="attr">{I18n.t("insights.directAwardDenied")}
                        </span>
                        <span class="value">{directAwardDenied}</span>
                    </section>
                    <section class="stat sub">
                        <span class="attr">{I18n.t("insights.unclaimed")}
                        </span>
                        <span class="value">{Number(directAwardsOpen).toLocaleString()}</span>
                    </section>
                    <section class="stat sub">
                        <span class="attr">{I18n.t("insights.revoked")}
                        </span>
                        <span class="value">{directAwardsRevoked}</span>
                    </section>
                    <section class="stat sub">
                        <span class="attr">{I18n.t("insights.directAwardedExpired")}
                        </span>
                        <span class="value">{Number(directAwardsExpired).toLocaleString()}</span>
                    </section>
                    <section class="stat">
                        <span class="attr">{I18n.t("insights.claimRate")}
                        </span>
                        <span class="value claim-rate">{claimRate}%</span>
                    </section>
                    <div class="title-wrapper">
                        <h3 class="last">{I18n.t("insights.enrollments")}</h3>
                        <Tooltip tooltipText={I18n.t("insights.tooltips.enrollments")}/>
                    </div>

                    <section class="stat">
                        <span class="attr">{I18n.t("insights.totalRequested")}
                        </span>
                        <span class="value">{Number(totalRequested).toLocaleString()}</span>
                    </section>
                    <section class="stat sub">
                        <span class="attr green">{I18n.t("insights.acceptedAndApproved")}
                        </span>
                        <span class="value requested">
                            {Number(acceptedAndApproved).toLocaleString()}
                        </span>
                    </section>
                    <section class="stat sub">
                        <span class="attr">{I18n.t("insights.requestedDenied")}
                        </span>
                        <span class="value">{enrollmentsDenied}</span>
                    </section>
                    <section class="stat sub">
                        <span class="attr">{I18n.t("insights.revoked")}
                        </span>
                        <span class="value">{assertionRequestedRevoked}</span>
                    </section>
                    <section class="stat sub">
                        <span class="attr">{I18n.t("insights.pending")}
                        </span>
                        <span class="value">{enrollmentsOpen}</span>
                    </section>
                </section>
                <section class="selectors">
                    {#if profile.is_superuser}
                        <Field entity="insights" attribute="sectorType">
                            <Select
                                    value={sector}
                                    handleSelect={sectorSelected}
                                    clearable={false}
                                    items={sectorSelectOptions}
                                    optionIdentifier="value"/>
                        </Field>
                        <Field entity="insights" attribute="institution">
                            <Select
                                    value={institutionId}
                                    handleSelect={institutionSelected}
                                    placeholder={I18n.t("models.insights.institutionPlaceholder")}
                                    items={institutions}
                                    clearable={false}
                                    optionIdentifier="identifier"/>
                        </Field>
                        <div class="checkbox-container">
                            <CheckBox value={countSURFInTotal && institutionId && institutionId.identifier === "all"}
                                      label={I18n.t("models.insights.countSURF")}
                                      onChange={toggleCountSURFInTotal}
                                      disabled={institutionId && institutionId.identifier !== "all"}
                                      adjustTopFlex={true}/>
                        </div>
                    {/if}
                    <Field entity="insights" attribute="badgeClassType">
                        <Select
                                value={badgeType}
                                handleSelect={badgeTypeSelected}
                                clearable={false}
                                items={badgeTypes}
                                optionIdentifier="value"/>
                    </Field>
                    <Field entity="insights" attribute="faculty">
                        <Select
                                value={facultyId}
                                showIndicator={!facultyId}
                                showChevron={!facultyId}
                                isSearchable={true}
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
                                isSearchable={true}
                                placeholder={I18n.t("models.insights.issuerPlaceholder")}
                                items={issuerSelectOptions}
                                optionIdentifier="identifier"/>
                    </Field>
                    <Field entity="insights" attribute="badgeClass">
                        <Select
                                value={badgeClassId}
                                showIndicator={!badgeClassId}
                                isSearchable={true}
                                showChevron={!badgeClassId}
                                handleSelect={badgeClassSelected}
                                placeholder={I18n.t("models.insights.badgeClassPlaceholder")}
                                items={badgeClassSelectOptions}
                                optionIdentifier="identifier"/>
                    </Field>
                    <div class="year-month-selection-container">
                        <span class="header">{I18n.t("insights.from")}</span>
                        <div class="year-month-selection">
                            <Select
                                    value={monthStart}
                                    handleSelect={monthStartSelected}
                                    clearable={false}
                                    items={yearStart.name === yearEnd.name ?
                                        monthSelectOptions.filter(option => option.value <= monthEnd.value)
                                        : monthSelectOptions}
                                    optionIdentifier="value"/>
                            <Select
                                    value={yearStart}
                                    handleSelect={yearStartSelected}
                                    clearable={false}
                                    items={yearSelectOptions
                                    .filter(option => option.name < yearEnd.name || (option.name === yearEnd.name &&
                                    monthEnd.value >= monthStart.value))}
                                    optionIdentifier="name"/>
                        </div>
                    </div>
                    <div class="year-month-selection-container">
                        <span class="header">{I18n.t("insights.until")}</span>
                        <div class="year-month-selection">
                            <Select
                                    value={monthEnd}
                                    handleSelect={monthEndSelected}
                                    clearable={false}
                                    items={monthSelectOptions
                                        .filter(option => (yearEnd.name < currentYear || option.value <= (currentMonth+1)) &&
                                        (yearStart.name < yearEnd.name ||
                                        (yearStart.name === yearEnd.name && option.value >= monthStart.value)))}
                                    optionIdentifier="value"/>
                            <Select
                                    value={yearEnd}
                                    handleSelect={yearEndSelected}
                                    clearable={false}
                                    items={yearSelectOptions
                                    .filter(option => option.name > yearStart.name || (option.name === yearStart.name &&
                                    monthEnd.value >= monthStart.value))}
                                    optionIdentifier="name"/>
                        </div>
                    </div>
                    <section class="reset">
                        <Button text={I18n.t("insights.reset")}
                                action={reset}
                                secondary={true}
                        />
                    </section>

                </section>
            </div>
            {#if totalAssertions.length === 0}
                <div class="no-content">
                    <h3>{I18n.t("insights.noContent")}</h3>
                </div>
            {:else}
                <div class="content-wrapper">
                    <h2>{I18n.t("insights.tableHeader", {
                        from: `${padTrailingZero(monthStart.value)}-${yearStart.name}`,
                        until: `${padTrailingZero(monthEnd.value)}-${yearEnd.name}`,
                        institution: selectedInstitutionName
                    })}</h2>
                    <div id="content" class="content"></div>
                </div>
            {/if}
        </div>
    {:else}
        <Spinner message={I18n.t("insights.crunching")}/>
    {/if}
</div>
