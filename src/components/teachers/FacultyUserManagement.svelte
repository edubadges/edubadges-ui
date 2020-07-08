<script>
  import {queryData} from "../../api/graphql";
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import {UserManagement} from "../teachers";
  import {staffType, addStaffType} from "../../util/staffTypes";

  export let entity;
  export let entityId;

  let institutionStaffMembers = [];
  let issuerGroupStaffMembers = [];
  let selection = [];
  let permissions;
  let userProvisionments = [];

  const query = `{
    faculty(id: "${entityId}") {
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
      },
      permissions {
        mayAdministrateUsers
      }
		}
  }`;
  const reload = () => {
    queryData(query).then(res => {
      institutionStaffMembers = addStaffType(res.faculty.institution.staff, staffType.INSTITUTION_STAFF);
      issuerGroupStaffMembers = addStaffType(res.faculty.staff, staffType.ISSUER_GROUP_STAFF);
      userProvisionments = addStaffType(res.faculty.userprovisionments, staffType.USER_PROVISIONMENT);
      permissions = res.faculty.permissions;
    })
  };

  onMount(reload);

  // Remove permissions modal
  let removeModalTitle = I18n.t(['editUsers', 'permissions', 'removePermissions']);
  let removeModalQuestion = I18n.t(['editUsers', 'permissions', 'removeAdmin']);

</script>

<UserManagement
    {entity}
    {entityId}
    {permissions}
    institutionStaffs={institutionStaffMembers}
    issuerGroupStaffs={issuerGroupStaffMembers}
    {userProvisionments}
    {removeModalTitle}
    {removeModalQuestion}
    {reload}
/>
