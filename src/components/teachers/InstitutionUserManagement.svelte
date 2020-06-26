<script>
  import { queryData } from "../../api/graphql";
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import UserManagement from "./UserManagement.svelte";
  import {staffType} from "../../util/staffTypes";

  export let entity;

  let institutionStaffMembers = [];
  let userProvisionments = [];
  let permissions;
  let contentType;

  const query = `{
    currentInstitution {
      contentTypeId,
      userprovisionments {
        email,
        createdAt,
        entityId,
        data
      },
      permissions {
        mayAdministrateUsers
      },
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
  }`;

  onMount(() => {
    queryData(query).then(res => {
      institutionStaffMembers = res.currentInstitution.staff.map(staff => {
        staff._staffType = staffType.INSTITUTION_STAFF;
        return staff;
      });
      userProvisionments = res.currentInstitution.userprovisionments.map(staff => {
        staff._staffType = staffType.USER_PROVISIONMENT;
        return staff;
      });
      permissions = res.currentInstitution.permissions;
      contentType = res.currentInstitution.contentId;
    })
  });

  // Remove permissions modal
  let removeModalTitle = I18n.t(['editUsers', 'permissions', 'removePermissions']);
  let removeModalQuestion = I18n.t(['editUsers', 'permissions', 'removeAdmin']);

  const reload = () => {
    queryData(query).then(res => {
      institutionStaffMembers = res.currentInstitution.staff.map(staff => {
        staff._staffType = staffType.INSTITUTION_STAFF;
        return staff;
      });
      userProvisionments = res.currentInstitution.userprovisionments.map(staff => {
        staff._staffType = staffType.USER_PROVISIONMENT;
        return staff;
      });
    });
  };
</script>

<UserManagement
    {entity}
    {contentType}
    {permissions}
    institutionStaffs={institutionStaffMembers}
    {userProvisionments}
    {removeModalTitle}
    {removeModalQuestion}
    {reload}
/>
