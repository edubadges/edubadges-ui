<script>
  import { queryData } from "../../api/graphql";
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import {UserManagement} from "../teachers";
  import {staffType, addStaffType} from "../../util/staffTypes";
  import {translateProperties} from "../../util/utils";

  export let entity;

  let institutionStaffMembers = [];
  let userProvisionments = [];
  let permissions;
  let contentType;

  const query = `query {
    currentInstitution {
      contentTypeId,
      nameEnglish,
      nameDutch,
      userprovisionments {
        email,
        createdAt,
        entityId,
        data
      },
      permissions {
        mayAdministrateUsers
      },
      staff {
        entityId,
        mayAdministrateUsers,
        user {
          firstName,
          lastName,
          fullName,
          entityId,
          email
        }
      }
		}
  }`;

  const reload = () => {
    queryData(query).then(res => {
      translateProperties(res.currentInstitution);

      institutionStaffMembers = addStaffType(res.currentInstitution.staff, staffType.INSTITUTION_STAFF);
      userProvisionments = addStaffType(res.currentInstitution.userprovisionments, staffType.USER_PROVISIONMENT);
      permissions = res.currentInstitution.permissions;
      contentType = res.currentInstitution.contentId;
    });
  };

  onMount(reload);
</script>

<UserManagement
    {entity}
    {contentType}
    {permissions}
    institutionStaffs={institutionStaffMembers}
    {userProvisionments}
    {reload}
/>
