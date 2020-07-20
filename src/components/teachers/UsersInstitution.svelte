<script>
  import {entityType} from "../../util/entityTypes";
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {Button, CheckBox} from "../../components";
  import {UsersTable} from "../teachers";
  import {sortType} from "../../util/sortData";
  import I18n from "i18n-js";
  import {makeUserInstitutionAdmin, removeUserInstitutionAdmin} from "../../api";
  import Spinner from "../Spinner.svelte";
  import {flash} from "../../stores/flash";
  import Modal from "../forms/Modal.svelte";

  export let userId;

  let user;
  let userNameDict;
  let currentUser;
  let faculties;
  let institutionName;
  let institutionId;
  let institutionSearch;

  let selection = [];
  let checkAllValue = false;
  let loaded = false;

  let showModal = false;
  let modalTitle;
  let modalQuestion;
  let modalAction;

  const doMakeUserInstitutionAdmin = showConfirmation => () => {
    if (showConfirmation) {
      modalTitle = I18n.t("editUsers.institution.makeUserInstitutionAdmin", userNameDict);
      modalQuestion = I18n.t("editUsers.institution.makeUserInstitutionAdminQuestion", userNameDict);
      modalAction = doMakeUserInstitutionAdmin(false);
      showModal = true;
    } else {
      showModal = false;
      makeUserInstitutionAdmin(institutionId, userId)
        .then(() => {
          refresh();
          flash.setValue(I18n.t("editUsers.institution.flash.makeUserInstitutionAdmin", userNameDict));
        });
    }
  }

  const doRemoveUserInstitutionAdmin = showConfirmation => () => {
    if (showConfirmation) {
      modalTitle = I18n.t("editUsers.institution.removeUserInstitutionAdmin", userNameDict);
      modalQuestion = I18n.t("editUsers.institution.removeUserInstitutionAdminQuestion", userNameDict);
      modalAction = doRemoveUserInstitutionAdmin(false);
      showModal = true;
    } else {
      showModal = false;
      removeUserInstitutionAdmin(user.institutionStaff.entityId)
        .then(() => {
          refresh();
          flash.setValue(I18n.t("editUsers.institution.flash.removeUserInstitutionAdmin", userNameDict));
        });
    }
  }

  const query = `{
  currentInstitution {
    name,
    entityId,
    faculties {
      name,
      entityId,
      issuers {
        name,
        entityId,
      }
    }
  },
  currentUser {
    institutionStaff {
      mayAdministrateUsers
    },
    facultyStaffs {
      mayAdministrateUsers
    },
    issuerStaffs {
      mayAdministrateUsers
    },
    badgeclassStaffs {
      mayAdministrateUsers
    },
  },
  user(id: "${userId}") {
    firstName,
    lastName,
    badgeclassStaffs {
      entityId,
      badgeclass {
        name,
        entityId
      },
      mayAdministrateUsers,
      mayAward
    }
    issuerStaffs {
      entityId,
      issuer {
        name,
        entityId,
      },
      mayAdministrateUsers
    }
    facultyStaffs {
      entityId,
      faculty {
        name,
        entityId
      },
      mayAdministrateUsers
    }
    institutionStaff {
      entityId,
      mayAdministrateUsers,
      institution {
        name,
        entityId
      }
    }
  }
 }`;


  const refresh = () => {
    loaded = false;
    queryData(query).then(res => {
      institutionId = res.currentInstitution.entityId;
      faculties = res.currentInstitution.faculties;
      user = res.user;
      currentUser = res.currentUser;
      institutionName = res.currentInstitution.name;
      userNameDict = {name: `${user.firstName} ${user.lastName}`};
      loaded = true;
    });
  }


  onMount(refresh);

  const tableHeaders = [
    {
      name: I18n.t("editUsers.institution.header"),
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
    title: `${I18n.t("editUsers.institutionPermissions", {instance: I18n.t("editUsers.institution.header")})}`,
    tableHeaders: tableHeaders
  };

  const isInstitutionAdmin = () => user.institutionStaff && user.institutionStaff.entityId;

  const toggleInstitutionAdmin = () => {
    if (isInstitutionAdmin()) {
      doRemoveUserInstitutionAdmin(true)();
    } else {
      doMakeUserInstitutionAdmin(true)();
    }
  };

  $: buttons = [
    {
      'action': toggleInstitutionAdmin,
      'text': user && isInstitutionAdmin() ?
        I18n.t(['editUsers', 'permissions', 'removeInstitutionAdmin']) :
        I18n.t(['editUsers', 'permissions', 'setInstitutionAdmin']),
      'allowed': (currentUser && currentUser.institutionStaff && currentUser.institutionStaff.mayAdministrateUsers),
      'disabled': false
    }
  ];

  function onCheckOne(val, entityId) {
    if (val) {
      selection = selection.concat(entityId);
    } else {
      selection = selection.filter(id => id !== entityId);
      checkAllValue = false;
    }
  }

</script>

<style>
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .container {
    display: flex;
    flex-direction: column;
  }
</style>

{#if loaded}
  <div class="container">
    <UsersTable
      {...table}
      isEmpty={false}
      bind:search={institutionSearch}
      withCheckAll={false}
      bind:buttons={buttons}
    >
      <tr>
        <td>{institutionName}</td>
        <td>
          {I18n.t(['editUsers', 'institution', user.institutionStaff ? 'allRights' : 'noRights'])}
        </td>
      </tr>
    </UsersTable>
  </div>
{:else}
  <Spinner/>
{/if}

{#if showModal}
  <Modal submit={modalAction}
      warning={isInstitutionAdmin()}
      cancel={() => showModal = false}
      question={modalQuestion}
      title={modalTitle}>
  </Modal>
{/if}