<script>
  import { queryData } from "../../api/graphql";
  import { onMount } from "svelte";
  import { UsersTable, InvitationStatusWidget } from "../teachers";
  import { sortType } from "../../util/sortData";
  import I18n from "i18n-js";
  import { CheckBox } from "../index";
  import { removeUserInstitutionAdmin } from "../../api";
  import { navigate } from "svelte-routing";
  import { Modal } from "../forms";
  import UserManagement from "./UserManagement.svelte";
  import {staffType} from "../../util/staffTypes";

  export let entity;

  let institutionStaffMembers = [];
  let selection = [];
  let permissions;
  let userProvisionments = [];

  const query = `{
    currentInstitution {
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
      institutionStaffMembers = res.currentInstitution.staff.map(staff => staff._staffType = staffType.INSTITUTION_STAFF);
      permissions = res.currentInstitution.permissions;
      userProvisionments = res.currentInstitution.userprovisionments.map(staff => staff._staffType = staffType.USER_PROVISIONMENT);
    })
  });

  const tableHeaders = [
    {
      name: I18n.t(["teacher", "nameEmail"]),
      attribute: "name",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("editUsers.role"),
      attribute: "roles",
      reverse: false,
      sortType: sortType.ROLES
    },
    {
      name: I18n.t(["inviteUsers", "inviteStatus"]),
      attribute: "",
      reverse: false,
      sortType: sortType.INVITATION_STATUS
    }
  ];

  // Remove permissions modal
  let showRemoveModal = false;
  let removeModalTitle;
  let removeModalQuestion;
  let removeModalAction;

  $: table = {
    entity: "user",
    title: `${I18n.t("editUsers.usersPermissions")}`,
    tableHeaders: tableHeaders,
  };

  const reload = () => {
    queryData(query).then(res => {
      institutionStaffMembers = res.currentInstitution.staff;
    });
  };

  const removeSelectedPermissions = () => {
    for (const selected of selection) {
      removeUserInstitutionAdmin(selected).then(() => {
        reload();
        showRemoveModal = false;
      })
    }
    selection.length = 0;
  };

  const removePermissions = () => {
    showRemoveModal = true;
    removeModalTitle = I18n.t(['editUsers', 'permissions', 'removePermissions']);
    removeModalQuestion = I18n.t(['editUsers', 'permissions', 'removeAdmin']);
    removeModalAction = removeSelectedPermissions;
  };

  const inviteNewUser = () => {
    navigate('/manage/institution/user-management/invite-new-user', {replace: false});
  };

  $: buttons = [
    {
      'action': removePermissions,
      'text': I18n.t(['editUsers', 'permissions', 'removePermissions']),
      'allowed': (permissions && permissions.mayAdministrateUsers && selection.length > 0),
    },
    {
      'action': inviteNewUser,
      'text': I18n.t(['editUsers', 'permissions', 'inviteNewUser']),
      'allowed': (permissions && permissions.mayAdministrateUsers),
    }
  ];
</script>

<style>
  tr {
    height: 53px;
  }
</style>

<UserManagement
    {entity}
    {permissions}
    {table}
    institutionStaffs={institutionStaffMembers}
    {userProvisionments}
/>
