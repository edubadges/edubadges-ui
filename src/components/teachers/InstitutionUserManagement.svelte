<script>
  import { queryData } from "../../api/graphql";
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import {UserManagement} from "../teachers";
  import {staffType, addStaffType} from "../../util/staffTypes";

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
      institutionStaffMembers = addStaffType(res.currentInstitution.staff, staffType.INSTITUTION_STAFF);
      userProvisionments = addStaffType(res.currentInstitution.userprovisionments, staffType.USER_PROVISIONMENT);
      permissions = res.currentInstitution.permissions;
      contentType = res.currentInstitution.contentId;
    })
  });

  // Remove permissions modal
  let removeModalTitle = I18n.t(['editUsers', 'permissions', 'removePermissions']);
  let removeModalQuestion = I18n.t(['editUsers', 'permissions', 'removeAdmin']);

  const reload = () => {
    queryData(query).then(res => {
      institutionStaffMembers = addStaffType(res.currentInstitution.staff, staffType.INSTITUTION_STAFF);
      userProvisionments = addStaffType(res.currentInstitution.userprovisionments, staffType.USER_PROVISIONMENT);
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
