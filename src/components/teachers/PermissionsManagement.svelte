<script>
  import I18n from "i18n-js";
  import { UsersTable } from "../teachers";
  import { sortType } from "../../util/sortData";

  let entitySearch = '';
  let checkAllValue = false;
  let permissions;
  let selection = [];

  // Add permissions modal
  let showAddModal = false;
  let addModalTitle;
  let selectEntity;
  let addModalAction;
  let modalSelectedBadgeClass;
  let modalChosenRole;
  let modalNotes;

  // Remove permissions modal
  let showRemoveModal = false;
  let removeModalTitle;
  let removeModalQuestion;
  let removeModalAction;

  const addPermissions = () => {
    showAddModal = true;
    addModalTitle = I18n.t(['editUsers', 'permissions', 'addPermissions']);
    selectEntity = 'badgeClass';
    addModalAction = submitPermissions;
  };

  const removePermissions = () => {
    showRemoveModal = true;
    removeModalTitle = I18n.t(['editUsers', 'permissions', 'removePermissions']);
    removeModalQuestion = I18n.t(['editUsers', 'permissions', 'removeBadgeClassUser']);
    removeModalAction = removeSelectedPermissions;
  };

  $: buttons = [
    {
      'action': removePermissions,
      'text': I18n.t(['editUsers', 'permissions', 'removePermissions']),
      'allowed': (permissions && permissions.mayAdministrateUsers && selection.length > 0),
    },
    {
      'action': addPermissions,
      'text': I18n.t(['editUsers', 'permissions', 'addPermissions']),
      'allowed': (permissions && permissions.mayAdministrateUsers),
    }
  ];

  const tableHeaders = [
    {
      name: I18n.t("editUsers.issuer.header"),
      attribute: "name",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("editUsers.badgeClass.header"),
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

  $: table = {
    entity: "user",
    title: `${I18n.t("editUsers.institutionPermissions")}`,
    tableHeaders: tableHeaders
  };

  const onCheckAll = () => {

  };
</script>

<UsersTable
    {...table}
    bind:search={entitySearch}
    withCheckAll={true}
    bind:checkAllValue={checkAllValue}
    bind:buttons={buttons}
    {onCheckAll}
>
</UsersTable>
