<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { Breadcrumb, PermissionsHeader, PermissionsManagement } from "./index";
  import {entityType} from "../../util/entityTypes"
  import {addStaffType, staffType} from "../../util/staffTypes";

  export let entity;

  let institutionStaffMembers = [];
  let issuerGroupStaffMembers = [];
  let issuerStaffMembers = [];
  let badgeClassStaffMembers = [];
  let userProvisionments = [];

  const query = `{
    currentUser {
      entityId,
      firstName,
      lastName,
      email,
      institutionStaff {
        entityId,
        institution {
          name,
          entityId,
          faculties {
            name,
            entityId,
            issuers {
              name,
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
          name,
          entityId,
          issuers {
            name,
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
        issuer {
          name,
          entityId,
          badgeclasses {
            name,
            entityId
          }
        }
      }
      badgeclassStaffs {
        entityId,
        badgeclass {
          issuer {
            name,
            entityId,
            badgeclasses {
              name,
              entityId
            }
          }
        }
      },
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      institutionStaffMembers = addStaffType([res.currentUser.institutionStaff], staffType.INSTITUTION_STAFF);
      issuerGroupStaffMembers = addStaffType(res.currentUser.facultyStaffs, staffType.ISSUER_GROUP_STAFF);
      issuerStaffMembers = addStaffType(res.currentUser.issuerStaffs, staffType.ISSUER_STAFF);
      badgeClassStaffMembers = addStaffType(res.currentUser.badgeclassStaffs, staffType.BADGE_CLASS_STAFF);
      // userProvisionments = addStaffType(res.currentUser.userprovisionments, staffType.USER_PROVISIONMENT);
    })
  });

  const tabs = [
    {
      entity: "institution",
      href: `/permissions/${entityType.INSTITUTION}`,
    },
    {
      entity: "faculties",
      href: `/permissions/${entityType.ISSUER_GROUP}`,
    },
    {
      entity: "issuers",
      href: `/permissions/${entityType.ISSUER}`,
    },
    {
      entity: "badgeclasses",
      href: `/permissions/${entityType.BADGE_CLASS}`,
    },
  ];
</script>

<Breadcrumb />

<PermissionsHeader
    {tabs}
/>

<PermissionsManagement
    {entity}
    institutionStaffs={institutionStaffMembers}
    issuerGroupStaffs={issuerGroupStaffMembers}
    issuerStaffs={issuerStaffMembers}
    badgeClassStaffs={badgeClassStaffMembers}
    {userProvisionments}
/>