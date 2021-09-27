<script>
    import {entityType} from "../../util/entityTypes";
    import {onMount} from "svelte";
    import {queryData} from "../../api/graphql";
    import {CheckBox} from "../../components";
    import {UsersTable} from "../teachers";
    import {sort, sortType} from "../../util/sortData";
    import I18n from "i18n-js";
    import {
        changeUserToIssuerGroupAwarder,
        changeUserToIssuerGroupOwner,
        makeUserIssuerGroupAdmin,
        makeUserIssuerGroupAwarder,
        removeUserIssuerGroupAdmin
    } from "../../api";
    import {AddPermissionsModal, Modal, Select} from "../forms";
    import Spinner from "../Spinner.svelte";
    import {permissionsRole} from "../../util/rolesToPermissions";
    import ListLink from "./ListLink.svelte";
    import {userHasPermissions} from "../../util/userPermissions";
    import {addStaffType, expandStaffsIssuerGroup, staffType} from "../../util/staffTypes";
    import {flash} from "../../stores/flash";
    import {facultyIcon} from "../../icons";
    import {translateProperties} from "../../util/utils";

    export let userId;

    let user;
    let currentUser;
    let userNameDict;
    let faculties = [];
    let newPermissionOptions = [];
    let removePermissionOptions = [];

    let institutionId;
    let issuerGroupSearch = '';

    let staffs = [];
    let filteredStaffs = [];
    let sortedFilteredStaffs = [];

    let institutionStaffs = [];
    let issuerGroupStaffs = [];

    let selection = [];
    let checkAllValue = false;
    let disabledCheckAll;

    let loaded;
    let isEmpty;

    const query = `query ($userId: String){
  currentInstitution {
    nameDutch,
    nameEnglish,
    entityId,
    faculties {
      nameDutch,
      nameEnglish,
      entityId,
      permissions {
        mayAdministrateUsers
      },
      issuers {
        nameDutch,
        nameEnglish,
        entityId,
      }
    }
  },
  currentUser {
    institutionStaff {
      mayAdministrateUsers
    },
    facultyStaffs {
      mayAdministrateUsers,
      mayUpdate,
      faculty {
        entityId
      }
    },
    issuerStaffs {
      mayAdministrateUsers,
      mayUpdate,
      issuer {
        entityId
      }
    },
    badgeclassStaffs {
      mayAdministrateUsers
      badgeclass {
        entityId
      }
    },
  },
  user(id: $userId) {
    firstName,
    lastName,
    facultyStaffs {
      entityId,
      mayUpdate,
      mayAdministrateUsers,
      faculty {
        nameDutch,
        nameEnglish,
        entityId
      },
    }
    institutionStaff {
      entityId,
      mayAdministrateUsers,
      institution {
        nameDutch,
        nameEnglish,
        entityId,
        faculties {
          nameDutch,
          nameEnglish,
          entityId
        }
      }
    }
  }
 }`;

    const changeUserRole = (role, id) => {
        loaded = false;
        switch (role.value) {
            case permissionsRole.ADMIN:
                changeUserToIssuerGroupOwner(id).then(() => {
                    reload();
                    flash.setValue(I18n.t("editUsers.flash.makeUserIssuerGroupAdmin", userNameDict));
                });
                break;
            case permissionsRole.AWARDER:
                changeUserToIssuerGroupAwarder(id).then(() => {
                    reload();
                    flash.setValue(I18n.t("editUsers.flash.makeUserIssuerGroupAwarder", userNameDict));
                });
                break;
        }
    };

    const reload = () => {
        loaded = false;
        checkAllValue = false;
        queryData(query, {userId}).then(res => {
            const institution = res.currentInstitution;
            user = res.user;

            translateProperties(institution);
            institution.faculties.forEach(faculty => {
                translateProperties(faculty);
                faculty.issuers.forEach(issuer => translateProperties(issuer));
            });
            user.facultyStaffs.forEach(staff => {
                translateProperties(staff.faculty);
            });
            if (user.institutionStaff) {
                const userInstitution = user.institutionStaff.institution;
                translateProperties(userInstitution);
                if (userInstitution) {
                    userInstitution.faculties.forEach(faculty => translateProperties(faculty));
                }
            }
            institutionId = institution.entityId;
            for (const faculty of institution.faculties) {
                if (faculty.permissions.mayAdministrateUsers) {
                    faculties = [...faculties, faculty];
                }
            }
            institutionStaffs = user.institutionStaff ? addStaffType([res.user.institutionStaff], staffType.INSTITUTION_STAFF) : [];
            issuerGroupStaffs = addStaffType(user.facultyStaffs, staffType.ISSUER_GROUP_STAFF);
            newPermissionOptions = faculties.filter(faculty => !userHasPermissions(faculty, entityType.ISSUER_GROUP, institutionStaffs, issuerGroupStaffs, [], []));
            removePermissionOptions = faculties.filter(faculty => userHasPermissions(faculty, entityType.ISSUER_GROUP, institutionStaffs, issuerGroupStaffs, [], []));
            modalSelectedEntity = newPermissionOptions[0];

            userNameDict = {name: `${user.firstName} ${user.lastName}`};
            currentUser = res.currentUser;
            isEmpty = user.facultyStaffs.length === 0 &&
                (!user.institutionStaff || (user.institutionStaff && faculties.length === 0));
            loaded = true;
        });
    };

    onMount(reload);

    const tableHeaders = [
        {
            name: "",
            width: "5%"
        },
        {
            name: I18n.t("editUsers.faculty.header"),
            attribute: "issuerGroup.name",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "25%"
        },
        {
            name: I18n.t("editUsers.role"),
            attribute: "role",
            reverse: false,
            sortType: sortType.COLLECTION,
            width: "20%"
        },
        {
            name: "",
            width: "50%"
        }
    ];

    let issuerGroupSort = tableHeaders[0];

    // Add permissions modal
    let showAddModal = false;
    let addModalTitle;
    let selectEntity;
    let addModalAction;
    let modalSelectedEntity;
    let modalChosenRole;
    let modalNotes;

    // Remove permissions modal
    let showRemoveModal = false;
    let removeModalTitle;
    let removeModalQuestion;
    let removeModalAction;

    $: table = {
        entity: "user",
        title: `${I18n.t("editUsers.institutionPermissions", {instance: I18n.t("editUsers.faculty.header")})}`,
        tableHeaders: tableHeaders
    };

    const submitPermissions = () => {
        switch (modalChosenRole.value) {
            case permissionsRole.ADMIN:
                makeUserIssuerGroupAdmin(modalSelectedEntity.entityId, userId, modalNotes).then(() => {
                    reload();
                    showAddModal = false;
                    flash.setValue(I18n.t("editUsers.flash.makeUserIssuerGroupAdmin", userNameDict));
                });
                break;
            case permissionsRole.AWARDER:
                makeUserIssuerGroupAwarder(modalSelectedEntity.entityId, userId, modalNotes).then(() => {
                    reload();
                    showAddModal = false;
                    flash.setValue(I18n.t("editUsers.flash.makeUserIssuerGroupAdmin", userNameDict));
                });
                break;
            default:
                throw new Error(`Invalid role ${modalChosenRole.value}`)
        }
    };

    const removeSelectedPermissions = () => {
        for (const selected of selection) {
            removeUserIssuerGroupAdmin(selected).then(() => {
                reload();
                showRemoveModal = false;
                flash.setValue(I18n.t("editUsers.flash.removeUserIssuerGroupAdmin", userNameDict));
            })
        }
        selection.length = 0;
    };

    const addPermissions = () => {
        showAddModal = true;
        addModalTitle = I18n.t(['editUsers', 'permissions', 'addPermissions']);
        selectEntity = 'issuerGroup';
        addModalAction = submitPermissions;
    };

    const removePermissions = () => {
        showRemoveModal = true;
        removeModalTitle = I18n.t(['editUsers', 'permissions', 'removePermissions']);
        removeModalQuestion = I18n.t(['editUsers', 'permissions', 'remove', entityType.ISSUER_GROUP]);
        removeModalAction = removeSelectedPermissions;
    };

    const permissionsRoles = [
        {value: permissionsRole.AWARDER, name: I18n.t("editUsers.faculty.awarder")},
        {value: permissionsRole.ADMIN, name: I18n.t("editUsers.faculty.admin")}
    ];

    $: buttons = [
        {
            'action': removePermissions,
            'text': I18n.t(['editUsers', 'permissions', 'removePermissions']),
            'allowed': (removePermissionOptions.length > 0 && selection.length > 0),
        },
        {
            'action': addPermissions,
            'text': I18n.t(['editUsers', 'permissions', 'addPermissions']),
            'allowed': faculties.some(faculty => faculty.permissions.mayAdministrateUsers),
            'disabled': newPermissionOptions.length === 0
        }
    ];

    $: staffs = expandStaffsIssuerGroup(institutionStaffs, issuerGroupStaffs);
    $: filteredStaffs = staffs.filter(({issuerGroup}) => issuerGroup.name.toLowerCase().includes(issuerGroupSearch.toLowerCase()));
    $: sortedFilteredStaffs = sort(filteredStaffs, issuerGroupSort.attribute, issuerGroupSort.reverse, issuerGroupSort.sortType);

    function onCheckOne(val, entityId) {
        if (val) {
            selection = selection.concat(entityId);
            checkAllValue = selection.length === filteredStaffs.filter(({_staffType, issuerGroup}) =>
                _staffType === staffType.ISSUER_GROUP_STAFF && userHasPermissions(
                    issuerGroup, entityType.ISSUER_GROUP,
                    currentUser.institutionStaff,
                    currentUser.facultyStaffs,
                    currentUser.issuerStaffs,
                    currentUser.badgeclassStaffs
                )).length;
        } else {
            selection = selection.filter(id => id !== entityId);
            checkAllValue = false;
        }
    }

    const onCheckAll = val => {
        selection = val ? filteredStaffs.filter(({_staffType, issuerGroup}) =>
            _staffType === staffType.ISSUER_GROUP_STAFF && userHasPermissions(
                issuerGroup, entityType.ISSUER_GROUP,
                currentUser.institutionStaff,
                currentUser.facultyStaffs,
                currentUser.issuerStaffs,
                currentUser.badgeclassStaffs
            )).map(({staffId}) => staffId) : [];
        checkAllValue = val;
    };

    $: disabledCheckAll = filteredStaffs.filter(({_staffType, issuerGroup}) =>
        _staffType === staffType.ISSUER_GROUP_STAFF && userHasPermissions(
            issuerGroup, entityType.ISSUER_GROUP,
            currentUser.institutionStaff,
            currentUser.facultyStaffs,
            currentUser.issuerStaffs,
            currentUser.badgeclassStaffs
        )).length === 0;
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

    .icon {
        display: block;
        height: 20px;
    }
</style>

{#if loaded}
  <div class="container">
    <UsersTable
      {...table}
      isEmpty={isEmpty}
      bind:search={issuerGroupSearch}
      bind:sort={issuerGroupSort}
      withCheckAll={true}
      bind:buttons={buttons}
      {onCheckAll}
      {checkAllValue}
      {disabledCheckAll}
    >
      {#each sortedFilteredStaffs as {_staffType, role, issuerGroup, staffId}}
        {#if _staffType === staffType.ISSUER_GROUP_STAFF}
          <tr>
            <td>
              <CheckBox
                value={selection.includes(staffId)}
                disabled={!userHasPermissions(
                    issuerGroup, entityType.ISSUER_GROUP,
                    currentUser.institutionStaff,
                    currentUser.facultyStaffs,
                    currentUser.issuerStaffs,
                    currentUser.badgeclassStaffs,
                  )}
                onChange={val => onCheckOne(val, staffId)}/>
            </td>
            <td>
              <span class="icon">{@html facultyIcon}</span>
            </td>
            <td>
              <ListLink path={`/manage/faculty/${issuerGroup.entityId}/issuers`} name={issuerGroup.name}/>
            </td>
            <td>
              <Select
                nonEditable={!userHasPermissions(
                      issuerGroup, entityType.ISSUER_GROUP,
                      currentUser.institutionStaff,
                      currentUser.facultyStaffs,
                      currentUser.issuerStaffs
                    )}
                handleSelect={item => changeUserRole(item, staffId)}
                value={role === staffType.ISSUER_GROUP_ADMIN ? permissionsRoles[1] : permissionsRoles[0]}
                items={permissionsRoles}
                clearable={false}
                optionIdentifier="name"
              />

            </td>
          </tr>
        {:else if _staffType === staffType.INSTITUTION_STAFF}
          <tr>
            <td>
              <CheckBox
                disabled={true}/>
            </td>
            <td>
              <span class="icon">{@html facultyIcon}</span>
            </td>
            <td>
              <ListLink path={`/manage/faculty/${issuerGroup.entityId}/issuers`} name={issuerGroup.name}/>
            </td>
            <td>
              {I18n.t(['editUsers', 'permissions', 'allRights'])}
              <br/>
              <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'institutionAllRights'])}</span>
            </td>
          </tr>
        {/if}
      {/each}
      {#if isEmpty}
        <tr>
          <td colspan="4">{I18n.t("zeroState.permissions", {entity: I18n.t("userManagement.issuer_group_staff")})}</td>
        </tr>
      {/if}
    </UsersTable>
  </div>
{:else}
  <Spinner/>
{/if}


{#if showRemoveModal}
  <Modal
    submit={removeModalAction}
    cancel={() => showRemoveModal = false}
    question={removeModalQuestion}
    title={removeModalTitle}/>
{/if}

{#if showAddModal}
  <AddPermissionsModal
    submit={addModalAction}
    cancel={() => showAddModal = false}
    selectEntity={selectEntity}
    permissionsRoles={permissionsRoles}
    title={addModalTitle}
    bind:targetOptions={newPermissionOptions}
    bind:target={modalSelectedEntity}
    bind:chosenRole={modalChosenRole}
    bind:notes={modalNotes}
  />
{/if}
