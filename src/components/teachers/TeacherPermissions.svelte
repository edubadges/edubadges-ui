<script>
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {PermissionsHeader, PermissionsManagement} from "./index";
  import {entityType} from "../../util/entityTypes"
  import {addStaffType, staffType} from "../../util/staffTypes";
  import {enrichUser} from "../../util/userPermissions";
  import {badgeclassIcon, facultyIcon, institutionIcon, issuerIcon} from "../../icons";
  import UserBreadcrumb from "./UserBreadcrumb.svelte";
  import Spinner from "../Spinner.svelte";
  import {translateProperties} from "../../util/utils";

  export let entity;

  let institution;
  let institutionStaffMemberships = [];
  let issuerGroupStaffMemberships = [];
  let issuerStaffMemberships = [];
  let badgeClassStaffMemberships = [];
  let currentUser = {};
  let loaded = false;

  const query = `query {
    currentInstitution {
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
            entityId
          },
          faculty {
            nameDutch,
            nameEnglish,
            entityId
          }
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
        mayAdministrateUsers,
        institution {
          nameDutch,
          nameEnglish,
          entityId,
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
                entityId
              }
            }
          }
        }
      },
      facultyStaffs {
        entityId,
        faculty {
          nameDutch,
          nameEnglish,
          entityId,
          issuers {
            nameDutch,
            nameEnglish,
            entityId,
            badgeclasses {
              name,
              entityId
            }
          }
        }
      }
      issuerStaffs {
        entityId,
        mayAdministrateUsers,
        mayUpdate,
        mayAward,
        issuer {
          nameDutch,
          nameEnglish,
          entityId,
          badgeclasses {
            name,
            entityId,
          },
          faculty {
            nameDutch,
            nameEnglish,
            entityId,
          }
        }
      }
      badgeclassStaffs {
        entityId,
        mayAdministrateUsers,
        mayUpdate,
        mayAward,
        badgeclass {
          entityId,
          name,
          issuer {
            nameDutch,
            nameEnglish,
            entityId,
            faculty {
              nameDutch,
              nameEnglish,
            }
          }
        }
      },
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      institution = res.currentInstitution;

      translateProperties(institution);
      institution.faculties.forEach(faculty => {
        translateProperties(faculty);
        faculty.issuers.forEach(issuer => {
          translateProperties(issuer);
          translateProperties(issuer.faculty);
        });
      });
      currentUser = res.currentUser;
      const institutionStaff = currentUser.institutionStaff;
      if (institutionStaff) {
        const nestedInstitution = institutionStaff.institution;
        translateProperties(nestedInstitution);
        nestedInstitution.faculties.forEach(faculty => {
          translateProperties(faculty);
          faculty.issuers.forEach(issuer => translateProperties(issuer));
        });
      }
      currentUser.facultyStaffs.forEach(staff => {
        translateProperties(staff.faculty);
        staff.faculty.issuers.forEach(issuer => translateProperties(issuer));
      });
      currentUser.issuerStaffs.forEach(staff => {
        translateProperties(staff.issuer);
        translateProperties(staff.issuer.faculty);
      });
      currentUser.badgeclassStaffs.forEach(staff => {
        translateProperties(staff.badgeclass.issuer);
        translateProperties(staff.badgeclass.issuer.faculty);
      });

      if (institutionStaff) {
        institutionStaffMemberships = addStaffType([res.currentUser.institutionStaff], staffType.INSTITUTION_STAFF);
      } else {
        institutionStaffMemberships = [];
      }
      issuerGroupStaffMemberships = addStaffType(res.currentUser.facultyStaffs, staffType.ISSUER_GROUP_STAFF);
      issuerStaffMemberships = addStaffType(res.currentUser.issuerStaffs, staffType.ISSUER_STAFF);
      badgeClassStaffMemberships = addStaffType(res.currentUser.badgeclassStaffs, staffType.BADGE_CLASS_STAFF);
      enrichUser(institution, institutionStaffMemberships, issuerGroupStaffMemberships, issuerStaffMemberships, badgeClassStaffMemberships);
      currentUser = res.currentUser;
      loaded = true;
    })
  });

  const tabs = [
    {
      entity: "institution",
      href: `/permissions/${entityType.INSTITUTION}`,
      icon: institutionIcon
    },
    {
      entity: "faculties",
      href: `/permissions/${entityType.ISSUER_GROUP}`,
      icon: facultyIcon
    },
    {
      entity: "issuers",
      href: `/permissions/${entityType.ISSUER}`,
      icon: issuerIcon
    },
    {
      entity: "badgeclasses",
      href: `/permissions/${entityType.BADGE_CLASS}`,
      icon: badgeclassIcon
    },
  ];
</script>
<style>
    div.container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
</style>
{#if loaded}
  <div class="container">
    <UserBreadcrumb isProfile={false} user={currentUser}/>

    <PermissionsHeader
      {tabs}
    />

    <PermissionsManagement
      {entity}
      institutionStaffs={institutionStaffMemberships}
      issuerGroupStaffs={issuerGroupStaffMemberships}
      issuerStaffs={issuerStaffMemberships}
      badgeClassStaffs={badgeClassStaffMemberships}
    />
  </div>
{:else}
  <Spinner/>
{/if}
