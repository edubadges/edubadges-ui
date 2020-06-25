<script>
  import {queryData} from "../../api/graphql";
  import { onMount } from "svelte";
  import { UsersTable, InvitationStatusWidget } from "./index";
  import { sortType } from "../../util/sortData";
  import I18n from "i18n-js";
  import { CheckBox } from "../index";
  import { removeUserIssuerGroupAdmin } from "../../api";
  import {navigate} from "svelte-routing";
  import UserManagement from "./UserManagement.svelte";

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

  onMount(() => {
    queryData(query).then(res => {
      institutionStaffMembers = res.faculty.institution.staff;
      issuerGroupStaffMembers = res.faculty.staff;
      permissions = res.faculty.permissions;
      userProvisionments = res.faculty.userprovisionments;
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
      sortType: sortType.COLLECTION
    }
  ];

  // Remove permissions modal
  let showRemoveModal = false;
  let removeModalTitle;
  let removeModalQuestion;
  let removeModalAction;

  const onCheckAll = val => {
    selection = val ? [...issuerGroupStaffMembers, ...userprovisionments].map(({entityId}) => entityId) : [];
    table.checkAllValue = val;
  };


  const onCheckOne = (val, entityId) => {
    if (val) {
      selection = selection.concat(entityId);
      table.checkAllValue = selection.length === issuerGroupStaffMembers.length + userprovisionments.length;
    } else {
      selection = selection.filter(id => id !== entityId);
      table.checkAllValue = false;
    }
  };

  $: table = {
    entity: "user",
    title: `${I18n.t("editUsers.usersPermissions")}`,
    tableHeaders: tableHeaders,
    onCheckAll
  };

  const reload = () => {
    queryData(query).then(res => {
      issuerGroupStaffMembers = res.faculty.staff;
    });
  };

  const removeSelectedPermissions = () => {
    for (const selected of selection) {
      removeUserIssuerGroupAdmin(selected).then(() => {
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
    navigate(`/manage/faculty/${entityId}/user-management/invite-new-user`, {replace: false});
  };

  $: buttons = [
    {
      'action': removePermissions,
      'text': I18n.t(['editUsers', 'permissions', 'removePermissions']),
      'allowed': (permissions && permissions.mayAdministrateUsers && selection.length > 0),
    },
    {
      'action': inviteNewUser,
      'text': I18n.t(['editUsers', 'permissions', 'addPermissions']),
      'allowed': (permissions && permissions.mayAdministrateUsers),
    }
  ];
</script>

<UserManagement
    {entity}
    {entityId}
    {permissions}
    {table}
    institutionStaffs={institutionStaffMembers}
    issuerGroupStaffs={issuerGroupStaffMembers}
    userProvisionments={userProvisionments}
/>
