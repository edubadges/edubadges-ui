<script>
    import {onMount} from "svelte";
    import {queryData} from "../../../api/graphql";
    import I18n from "i18n-js";
    import {addStaffType, expandStaffsBadgeClass, staffType} from "../../../util/staffTypes";
    import {translateProperties} from "../../../util/utils";
    import Button from "../../Button.svelte";
    import RequestEndorsementModal from "./RequestEndorsementModal.svelte";
    import loader from "../../../icons/loader.svg"
    import {createEndorsement} from "../../../api";
    import {flash} from "../../../stores/flash";

    export let badgeClass = {issuer: {faculty: {institution}}};
    let currentUser;
    let showModal = false;
    let badgeClasses = [];

    let claim = "";
    let description = "";
    let selectedBadgeClass;

    let hasStaff = false;
    let loaded = false;
    let otherInstitution = false;

    const query = `query {
        currentInstitution {
          id,
          entityId,
          nameDutch,
          nameEnglish,
          faculties {
            nameDutch,
            nameEnglish,
            entityId,
            issuers {
              nameDutch,
              nameEnglish,
              entityId,
              badgeclasses {
                name,
                entityId,
                image
              },
            }
          }
        },
        currentUser {
          entityId,
          firstName,
          lastName,
          email,
          institutionStaff {
            entityId,
            mayAdministrateUsers
          },
          facultyStaffs {
            entityId,
            mayUpdate,
            faculty {
              entityId
            }
          }
          issuerStaffs {
            entityId,
            mayAdministrateUsers,
            mayUpdate,
            mayAward,
            issuer {
              entityId
            }
          }
          badgeclassStaffs {
            entityId,
            mayAdministrateUsers,
            mayUpdate,
            mayAward,
            badgeclass {
              entityId
            }
          },
        }
    }`;

    const reload = entityIdentifiers => {
        queryData(query).then(res => {
            const currentInstitution = res.currentInstitution;
            translateProperties(currentInstitution);

            const facultyMap = {};
            const issuerMap = {};
            const badgeClassMap = {};

            currentInstitution.faculties.forEach(faculty => {
                translateProperties(faculty);
                faculty.institution = currentInstitution;
                facultyMap[faculty.entityId] = faculty;
                faculty.issuers.forEach(issuer => {
                    translateProperties(issuer);
                    issuerMap[issuer.entityId] = issuer;
                    issuer.faculty = faculty;
                    issuer.badgeclasses.forEach(badgeclass => {
                        badgeclass.issuer = issuer
                        badgeClassMap[badgeclass.entityId] = badgeclass;
                    })
                })
            });
            currentUser = res.currentUser;
            const institutionStaffs = currentUser.institutionStaff ? addStaffType([currentUser.institutionStaff], staffType.INSTITUTION_STAFF) : [];
            const issuerGroupStaffs = addStaffType(currentUser.facultyStaffs, staffType.ISSUER_GROUP_STAFF);
            const issuerStaffs = addStaffType(currentUser.issuerStaffs, staffType.ISSUER_STAFF);
            const badgeClassStaffs = addStaffType(currentUser.badgeclassStaffs, staffType.BADGE_CLASS_STAFF);

            institutionStaffs.forEach(staff => staff.institution = currentInstitution);
            issuerGroupStaffs.forEach(staff => staff.faculty = facultyMap[staff.faculty.entityId]);
            issuerStaffs.forEach(staff => staff.issuer = issuerMap[staff.issuer.entityId]);
            badgeClassStaffs.forEach(staff => staff.badgeclass = badgeClassMap[staff.badgeclass.entityId]);

            const staffs = expandStaffsBadgeClass(institutionStaffs, issuerGroupStaffs, issuerStaffs, badgeClassStaffs);
            badgeClasses = staffs
                .map(staff => ({
                    name: staff.badgeClass.name,
                    image: staff.badgeClass.image,
                    entityId: staff.badgeClass.entityId,
                }))
                .filter(bc => !entityIdentifiers.includes(bc.entityId) && !(badgeClass.endorsed || []).some(s => s === bc.entityId));
            hasStaff = staffs.length > 0;
            otherInstitution = badgeClass.issuer.faculty.institution.entityId !== currentInstitution.entityId;
            claim = "";
            description = "";
            selectedBadgeClass = null;

            loaded = true;
        });
    }

    onMount(() => reload([]));

    const endorse = () => showModal = true;
    const cancel = () => showModal = false;
    const submit = () => {
        showModal = false;
        loaded = false;
        createEndorsement({
            endorsee: selectedBadgeClass.entityId,
            endorser: badgeClass.entityId,
            claim: claim,
            description: description
        }).then(() => {
            //cache is emptied async, soo we need to exclude manually
            reload([selectedBadgeClass.entityId]);
            flash.setValue(I18n.t("endorsements.flash.created"))
        })

    }

</script>

<style>
    .endorsement-view {
        display: flex;
    }

    :global(.endorsement-view span.svg svg) {
        width: 48px;
        height: auto;
    }
</style>

<div class="endorsement-view">
    {#if !loaded}
        <span class="svg">{@html loader}</span>
    {:else}
        {#if hasStaff && otherInstitution}
            <Button action={() => endorse()} text={I18n.t("endorsements.request")}/>
        {/if}
        {#if showModal}
            <RequestEndorsementModal badgeClass={badgeClass}
                                     badgeClasses={badgeClasses}
                                     submit={submit}
                                     bind:claim={claim}
                                     bind:description={description}
                                     bind:selectedBadgeClass={selectedBadgeClass}
                                     cancel={cancel}/>
        {/if}

    {/if}
</div>