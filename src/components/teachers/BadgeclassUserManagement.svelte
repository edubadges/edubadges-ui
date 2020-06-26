<script>
  import {queryData} from "../../api/graphql";
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import UserManagement from "./UserManagement.svelte";
  import {staffType} from "../../util/staffTypes";

  export let entity;
  export let entityId;

  let institutionStaffMembers = [];
  let issuerGroupStaffMembers = [];
  let issuerStaffMembers = [];
  let badgeClassStaffMembers = [];
  let userProvisionments = [];
  let selection = [];
  let permissions;

  const query = `{
    badgeClass(id: "${entityId}") {
      name,
      userprovisionments {
        email,
        createdAt,
        entityId,
        data
      },
      staff {
        entityId,
        mayAdministrateUsers,
        mayUpdate,
        mayAward,
        user {
          firstName,
          lastName,
          email
        }
      },
      issuer {
        name,
        staff {
          entityId,
          mayAdministrateUsers,
          user {
            firstName,
            lastName,
            email
          }
        },
        faculty {
          name,
          staff {
            entityId,
            mayAdministrateUsers,
            user {
              firstName,
              lastName,
              email
            }
          },
          institution {
            name,
            staff {
              entityId,
              mayAdministrateUsers,
              user {
                firstName,
                lastName,
                email
              }
            }
          }
        }
      },
      permissions {
        mayAdministrateUsers
      }
		}
	}`;

  onMount(() => {
    queryData(query).then(res => {
      institutionStaffMembers = res.badgeClass.issuer.faculty.institution.staff.map(staff => {
        staff._staffType = staffType.INSTITUTION_STAFF;
        return staff;
      });
      issuerGroupStaffMembers = res.badgeClass.issuer.faculty.staff.map(staff => {
        staff._staffType = staffType.ISSUER_GROUP_STAFF;
        return staff;
      });
      issuerStaffMembers = res.badgeClass.issuer.staff.map(staff => {
        staff._staffType = staffType.ISSUER_STAFF;
        return staff;
      });
      badgeClassStaffMembers = res.badgeClass.staff.map(staff => {
        staff._staffType = staffType.BADGE_CLASS_STAFF;
        return staff;
      });
      userProvisionments = res.badgeClass.userprovisionments.map(staff => {
        staff._staffType = staffType.USER_PROVISIONMENT;
        return staff;
      });
      permissions = res.badgeClass.permissions;
    })
  });

  // Remove permissions modal
  let removeModalTitle = I18n.t(['editUsers', 'permissions', 'removePermissions']);
  let removeModalQuestion = I18n.t(['editUsers', 'permissions', 'removeBadgeClassUser']);

  const reload = () => {
    queryData(query).then(res => {
      badgeClassStaffMembers = res.badgeClass.staff.map(staff => {
        staff._staffType = staffType.BADGE_CLASS_STAFF;
        return staff;
      });
      userProvisionments = res.badgeClass.userprovisionments.map(staff => {
        staff._staffType = staffType.USER_PROVISIONMENT;
        return staff;
      });
    });
  };
</script>

<UserManagement
    {entity}
    {entityId}
    {permissions}
    institutionStaffs={institutionStaffMembers}
    issuerGroupStaffs={issuerGroupStaffMembers}
    issuerStaffs={issuerStaffMembers}
    badgeClassStaffs={badgeClassStaffMembers}
    {userProvisionments}
    {removeModalTitle}
    {removeModalQuestion}
    {reload}
/>
