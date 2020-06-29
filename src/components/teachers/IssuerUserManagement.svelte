<script>
  import {queryData} from "../../api/graphql";
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import UserManagement from "./UserManagement.svelte";
  import {staffType, addStaffType} from "../../util/staffTypes";

  export let entity;
  export let entityId;

  let institutionStaffMembers = [];
  let issuerGroupStaffMembers = [];
  let issuerStaffMembers = [];
  let userProvisionments = [];
  let selection = [];
  let permissions;

  const query = `{
    issuer(id: "${entityId}") {
      name,
      userprovisionments {
        email,
        createdAt,
        entityId
      },
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
      },
      permissions {
        mayAdministrateUsers
      }
		}
  }`;

  onMount(() => {
    queryData(query).then(res => {
      institutionStaffMembers = addStaffType(res.issuer.faculty.institution.staff, staffType.INSTITUTION_STAFF);
      issuerGroupStaffMembers = addStaffType(res.issuer.faculty.staff, staffType.ISSUER_GROUP_STAFF);
      issuerStaffMembers = addStaffType(res.issuer.staff, staffType.ISSUER_STAFF);
      userProvisionments = addStaffType(res.issuer.userprovisionments, staffType.USER_PROVISIONMENT);
      permissions = res.issuer.permissions;
    })
  });

  // Remove permissions modal
  let removeModalTitle = I18n.t(['editUsers', 'permissions', 'removePermissions']);
  let removeModalQuestion = I18n.t(['editUsers', 'permissions', 'removeAdmin']);

  const reload = () => {
    queryData(query).then(res => {
      issuerStaffMembers = addStaffType(res.issuer.staff, staffType.ISSUER_STAFF);
      userProvisionments = addStaffType(res.issuer.userprovisionments, staffType.USER_PROVISIONMENT);
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
    {userProvisionments}
    {removeModalTitle}
    {removeModalQuestion}
    {reload}
/>
