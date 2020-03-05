<script>
    import I18n from "i18n-js";
    import { Badges } from "./teachers";
    import { SideBar } from "../components";
    import {
        getTeacherBadges,
        requestProfile,
        getFaculties,
        getIssuer
    } from "../api";

    export let bookmark;

    let loaded = false;
    let user, data, faculties, issuers;

    const filterAttributes = ["Issuer Group", "Issuer"];

    const pages = [{ bm: "badges", component: Badges }];
    const currentPage = pages.find(({ bm }) => bm === bookmark) || pages[0];

    let filteredData;

    const apiCalls = [
        requestProfile(),
        getTeacherBadges(),
        getFaculties(),
    ];
    Promise.all(apiCalls)
            .then(values => {
                [user, data, faculties, issuers] = values;
                for (const badge of data) {
                    const issuerSlug = badge.issuer.split('/').pop();
                    getIssuer(issuerSlug).then(issuerData => {
                        badge['Issuer Group'] = issuerData['faculty']['name'];
                        badge['Issuer'] = issuerData['name'];
                        setTimeout(() => loaded = true, 100)  // TODO
                    })
                }
            })
            .catch(error => console.error(error));
</script>

<style>
    .content {
        flex: 1;
        padding: 30px 20px;
    }
</style>

<SideBar
        bind:filteredData
        institution={user.institution.name}
        filterSubject={I18n.t('teacher.' + currentPage.bm + '.title')}
        {data}
        {filterAttributes} />

<div class="content">
    <svelte:component
            this={currentPage.component}
            title={I18n.t('teacher.' + currentPage.bm + '.title')}
            scope={user.institution.name}
            bind:filteredData />
</div>

