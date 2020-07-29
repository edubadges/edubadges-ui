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
  import ListLink from "./ListLink.svelte";

  export let userId;

  let user;
  let userNameDict;
  let currentUser;
  let institution;
  let institutionStaff = [];
  let institutionSearch;

  let loaded = false;

  let showModal = false;
  let modalTitle;
  let modalQuestion;
  let modalAction;

  const query = `{
    currentInstitution {
      name,
      entityId,
      staff {
        entityId
      }
    },
    currentUser {
      institutionStaff {
        mayAdministrateUsers
      }
    },
    user(id: "${userId}") {
      firstName,
      lastName,
      institutionStaff {
        entityId,
        mayAdministrateUsers
      }
    }
 }`;


  const refresh = () => {
    loaded = false;
    queryData(query).then(res => {
      institution = res.currentInstitution;
      institutionStaff = institution.staff;
      user = res.user;
      currentUser = res.currentUser;
      userNameDict = {name: `${user.firstName} ${user.lastName}`};
      loaded = true;
    });
  };

  onMount(refresh);


  const doMakeUserInstitutionAdmin = showConfirmation => () => {
    if (showConfirmation) {
      modalTitle = I18n.t("editUsers.institution.makeUserInstitutionAdmin", userNameDict);
      modalQuestion = I18n.t("editUsers.institution.makeUserInstitutionAdminQuestion", userNameDict);
      modalAction = doMakeUserInstitutionAdmin(false);
      showModal = true;
    } else {
      showModal = false;
      makeUserInstitutionAdmin(institution.entityId, userId)
        .then(() => {
          refresh();
          flash.setValue(I18n.t("editUsers.flash.makeUserInstitutionAdmin", userNameDict));
        });
    }
  };

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
          flash.setValue(I18n.t("editUsers.flash.removeUserInstitutionAdmin", userNameDict));
        });
    }
  };

  const tableHeaders = [
    {
      name: I18n.t("editUsers.institution.header"),
      attribute: "name",
      reverse: false,
      sortType: sortType.ALPHA,
      width: "65%"
    },
    {
      name: I18n.t("editUsers.role"),
      attribute: "roles",
      reverse: false,
      sortType: sortType.COLLECTION,
      width: "35%"
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
      'text': I18n.t(['editUsers', 'permissions', 'setInstitutionAdmin']),
      'allowed': (currentUser && currentUser.institutionStaff && currentUser.institutionStaff.mayAdministrateUsers && user && !isInstitutionAdmin()),
    },
    {
      'action': toggleInstitutionAdmin,
      'text': I18n.t(['editUsers', 'permissions', 'removeInstitutionAdmin']),
      'allowed': (currentUser && currentUser.institutionStaff && currentUser.institutionStaff.mayAdministrateUsers && user && isInstitutionAdmin()),
      'disabled': institutionStaff.length === 1
    }
  ];

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
        <td>
          <ListLink path="/manage/institution/issuers" name={institution.name}/>
        </td>
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
  <Modal
      submit={modalAction}
      warning={isInstitutionAdmin()}
      cancel={() => showModal = false}
      question={modalQuestion}
      title={modalTitle} />
{/if}