<script>
    import {staffType} from "../../util/staffTypes"
    import {entityType} from "../../util/entityTypes"
    import {CheckBox} from "../index";
    import {InvitationStatusWidget, UsersTable} from "../teachers";
    import {Modal, Select} from "../forms";
    import I18n from "i18n-js";
    import {navigate} from "svelte-routing";
    import memberCheck from "../../icons/single-neutral-check.svg";
    import inviteCheck from "../../icons/single-neutral-question.svg";
    import {
        changeProvisionmentToBadgeclassAwarder,
        changeProvisionmentToBadgeclassEditor,
        changeProvisionmentToBadgeclassOwner,
        changeProvisionmentToIssuerAwarder,
        changeProvisionmentToIssuerOwner,
        changeProvisionmentToIssuerGroupAwarder,
        changeProvisionmentToIssuerGroupOwner,
        changeUserToBadgeclassAwarder,
        changeUserToBadgeclassEditor,
        changeUserToBadgeclassOwner,
        changeUserToIssuerAwarder,
        changeUserToIssuerOwner,
        changeUserToIssuerGroupAwarder,
        changeUserToIssuerGroupOwner,
        disinviteUser,
        removeStaffMembership
    } from "../../api";
    import {sort, sortType} from "../../util/sortData";
    import {searchMultiple} from "../../util/searchData";
    import {flash} from "../../stores/flash";
    import ListLink from "./ListLink.svelte";
    import {pageCount} from "../../util/pagination";

    export let entity;
    export let entityId;
    export let permissions;
    export let reload;

    export let institutionStaffs = [];
    export let issuerGroupStaffs = [];
    export let issuerStaffs = [];
    export let badgeClassStaffs = [];
    export let userProvisionments = [];

    let removeModalTitle = I18n.t(['editUsers', 'permissions', 'removePermissions']);
    let removeModalQuestion = I18n.t(['editUsers', 'permissions', 'remove', entity]);

    let staffs = [];
    let selection = [];
    let checkAllValue;
    let disabledCheckAll;

    $: staffs = [
        ...institutionStaffs,
        ...issuerGroupStaffs,
        ...issuerStaffs,
        ...badgeClassStaffs,
        ...userProvisionments
    ];

    let searchedStaffIds = [];
    let sortedFilteredStaffs = [];

    // Remove permissions modal
    let showRemoveModal = false;
    let removeModalAction;

    let targetOptionsBadgeClass = [
        {name: I18n.t(['editUsers', 'badgeclass', 'badgeclassOwner']), value: 'badgeclassOwner'},
        {name: I18n.t(['editUsers', 'badgeclass', 'badgeclassEditor']), value: 'badgeclassEditor'},
        {name: I18n.t(['editUsers', 'badgeclass', 'badgeclassAwarder']), value: 'badgeclassAwarder'},
    ];

    let targetOptionsIssuer = [
        {name: I18n.t(['editUsers', 'issuer', 'admin']), value: 'issuerOwner'},
        {name: I18n.t(['editUsers', 'issuer', 'awarder']), value: 'issuerAwarder'},
    ];

    let targetOptionsIssuerGroup = [
        {name: I18n.t(['editUsers', 'faculty', 'admin']), value: 'issuerGroupOwner'},
        {name: I18n.t(['editUsers', 'faculty', 'awarder']), value: 'issuerGroupAwarder'},
    ];

    const reloadAndReset = flashMessage => {
        reload();
        showRemoveModal = false;
        flash.setValue(I18n.t(flashMessage));
    }

    const changeBadgeClassUserRole = (role, id) => {
        switch (role.value) {
            case 'badgeclassOwner':
                selection = [];
                changeUserToBadgeclassOwner(id).then(() => reloadAndReset('editUsers.badgeclass.switchToOwner'));
                break;
            case 'badgeclassEditor':
                selection = [];
                changeUserToBadgeclassEditor(id).then(() => reloadAndReset('editUsers.badgeclass.switchToEditor'));
                break;
            case 'badgeclassAwarder':
                selection = [];
                changeUserToBadgeclassAwarder(id).then(() => reloadAndReset('editUsers.badgeclass.switchToAwarder'));
                break;
        }
    };

    const changeBadgeClassProvisionmentRole = (role, id) => {
        switch (role.value) {
            case 'badgeclassOwner':
                selection = [];
                changeProvisionmentToBadgeclassOwner(id).then(() => reloadAndReset('editUsers.badgeclass.switchToOwner'));
                break;
            case 'badgeclassEditor':
                selection = [];
                changeProvisionmentToBadgeclassEditor(id).then(() => reloadAndReset('editUsers.badgeclass.switchToEditor'));
                break;
            case 'badgeclassAwarder':
                selection = [];
                changeProvisionmentToBadgeclassAwarder(id).then(() => reloadAndReset('editUsers.badgeclass.switchToAwarder'));
                break;
        }
    };

    const changeIssuerProvisionmentRole = (role, id) => {
        switch (role.value) {
            case 'issuerOwner':
                selection = [];
                changeProvisionmentToIssuerOwner(id).then(() => reloadAndReset('editUsers.issuer.switchToOwner'));
                break;
            case 'issuerAwarder':
                selection = [];
                changeProvisionmentToIssuerAwarder(id).then(() => reloadAndReset('editUsers.issuer.switchToAwarder'));
                break;
        }
    };

    const changeIssuerUserRole = (role, id) => {
        switch (role.value) {
            case 'issuerOwner':
                selection = [];
                changeUserToIssuerOwner(id).then(() => reloadAndReset('editUsers.issuer.switchToOwner'));
                break;
            case 'issuerAwarder':
                selection = [];
                changeUserToIssuerAwarder(id).then(() => reloadAndReset('editUsers.issuer.switchToAwarder'));
                break;
        }
    };

    const changeIssuerGroupProvisionmentRole = (role, id) => {
        switch (role.value) {
            case 'issuerGroupOwner':
                selection = [];
                changeProvisionmentToIssuerGroupOwner(id).then(() => reloadAndReset('editUsers.issuer.switchToOwner'));
                break;
            case 'issuerGroupAwarder':
                selection = [];
                changeProvisionmentToIssuerGroupAwarder(id).then(() => reloadAndReset('editUsers.issuer.switchToAwarder'));
                break;
        }
    };

    const changeIssuerGroupUserRole = (role, id) => {
        switch (role.value) {
            case 'issuerGroupOwner':
                selection = [];
                changeUserToIssuerGroupOwner(id).then(() => reloadAndReset('editUsers.issuer.switchToOwner'));
                break;
            case 'issuerGroupAwarder':
                selection = [];
                changeUserToIssuerGroupAwarder(id).then(() => reloadAndReset('editUsers.issuer.switchToAwarder'));
                break;
        }
    };

    const removeSelectedPermissions = () => {
        for (const {entityId, _staffType} of selection) {
            selection = [];
            if (_staffType === staffType.USER_PROVISIONMENT) {
                disinviteUser(entityId).then(() => reloadAndReset('editUsers.flash.invite'));
            } else {
                removeStaffMembership(entity, entityId).then(() => reloadAndReset('editUsers.flash.removed'));
            }
        }
    };

    const removePermissions = () => {
        showRemoveModal = true;
        removeModalAction = removeSelectedPermissions;
    };

    const inviteNewUser = () => {
        navigate(`/manage/${entity}${entity !== entityType.INSTITUTION ? '/' + entityId : ''}/user-management/invite-new-user`, {replace: false});
    };

    $: oneInstitutionStaff = entity === entityType.INSTITUTION && institutionStaffs.length < 2;
    $: lastUnselectedInstitutionStaff = entityId => {
        return (staffs.filter(staff => staff._staffType === staffType.INSTITUTION_STAFF).length - selection.filter(selected => selected._staffType === staffType.INSTITUTION_STAFF).length < 2) &&
            !selection.some(selected => selected.entityId === entityId)
    };

    $: buttons = [
        {
            'action': removePermissions,
            'text': I18n.t(['editUsers', 'permissions', 'removePermissions']),
            'allowed': permissions && permissions.mayAdministrateUsers && selection.length > 0,
        },
        {
            'action': inviteNewUser,
            'text': I18n.t(['editUsers', 'permissions', 'inviteNewUser']),
            'allowed': permissions && permissions.mayAdministrateUsers,
        }
    ];

    const tableHeaders = [
        {name: null},
        {
            name: I18n.t(["teacher", "nameEmail"]),
            attribute: "name",
            reverse: false,
            sortType: sortType.PERSONAL_DATA,
            width: "35%"
        },
        {
            name: I18n.t("editUsers.role"),
            attribute: "roles",
            reverse: false,
            sortType: sortType.ROLES,
            width: "20%"
        },
        {
            name: I18n.t(["inviteUsers", "inviteStatus"]),
            attribute: "invitation",
            reverse: false,
            sortType: sortType.INVITATION_STATUS,
            width: "20%",
            center: true
        },
        {
            name: "",
            width: "25%"
        }
    ];

    $: table = {
        entity: "user",
        title: `${I18n.t("editUsers.usersPermissions")}`,
        tableHeaders: tableHeaders,
        withCheckAll: true,
    };

    let staffSearch = '';
    let staffSort = tableHeaders[3];

    $: searchedStaffIds = searchMultiple(staffs, staffSearch, "entityId", "user.fullName", "email", "user.email");

    $: sortedFilteredStaffs = sort(
        staffs.filter(el => searchedStaffIds.includes(el.entityId)),
        staffSort.attribute,
        staffSort.reverse,
        staffSort.sortType
    );

    let page = 1;
    $: minimalPage = Math.min(page, Math.ceil(sortedFilteredStaffs.length / pageCount));


    const onCheckAll = val => {
        selection = val ? staffs.filter(({_staffType}) => {
            if (_staffType === staffType.USER_PROVISIONMENT) {
                return true;
            }
            switch (entity) {
                case entityType.INSTITUTION:
                    return _staffType === staffType.INSTITUTION_STAFF;
                case entityType.ISSUER_GROUP:
                    return _staffType === staffType.ISSUER_GROUP_STAFF;
                case entityType.ISSUER:
                    return _staffType === staffType.ISSUER_STAFF;
                case entityType.BADGE_CLASS:
                    return _staffType === staffType.BADGE_CLASS_STAFF;
            }
        }).map(({entityId, _staffType}) => ({entityId, _staffType})) : [];
        checkAllValue = val;
    };

    const onCheckOne = (val, _entityId, _staffType) => {
        if (val) {
            selection = selection.concat({entityId: _entityId, _staffType});
            checkAllValue = selection.length === staffs.filter(({_staffType}) => {
                if (_staffType === staffType.USER_PROVISIONMENT) {
                    return true;
                }
                switch (entity) {
                    case entityType.INSTITUTION:
                        return _staffType === staffType.INSTITUTION_STAFF;
                    case entityType.ISSUER_GROUP:
                        return _staffType === staffType.ISSUER_GROUP_STAFF;
                    case entityType.ISSUER:
                        return _staffType === staffType.ISSUER_STAFF;
                    case entityType.BADGE_CLASS:
                        return _staffType === staffType.BADGE_CLASS_STAFF;
                }
            }).length;
        } else {
            selection = selection.filter(({entityId}) => entityId !== _entityId);
            checkAllValue = false;
        }
    };

    $: disabledCheckAll = (!permissions || !permissions.mayAdministrateUsers) ||
        (entity === entityType.INSTITUTION ? true :
            entity === entityType.ISSUER_GROUP ? sortedFilteredStaffs.filter(({_staffType}) => _staffType === staffType.ISSUER_GROUP_STAFF).length +
                sortedFilteredStaffs.filter(({_staffType}) => _staffType === staffType.USER_PROVISIONMENT).length === 0 :
                entity === entityType.ISSUER ? sortedFilteredStaffs.filter(({_staffType}) => _staffType === staffType.ISSUER_STAFF).length +
                    sortedFilteredStaffs.filter(({_staffType}) => _staffType === staffType.USER_PROVISIONMENT).length === 0 :
                    entity === entityType.BADGE_CLASS ? sortedFilteredStaffs.filter(({_staffType}) => _staffType === staffType.BADGE_CLASS_STAFF).length +
                        sortedFilteredStaffs.filter(({_staffType}) => _staffType === staffType.USER_PROVISIONMENT).length === 0 : '');
</script>

<style>
    .container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .badgeclass-role-select {
        width: 220px;
    }

    .container {
        display: flex;
        flex-direction: column;
    }

    tr {
        height: 53px;
    }
</style>

<div class="container">
  <UsersTable
    {...table}
    isEmpty={staffs.length === 0}
    {onCheckAll}
    bind:buttons={buttons}
    bind:search={staffSearch}
    bind:sort={staffSort}
    filteredCount={sortedFilteredStaffs.length}
    page={minimalPage}
    onPageChange={nbr => page = nbr}
    {checkAllValue}
    bind:disabledCheckAll={disabledCheckAll}
  >
    {#each sortedFilteredStaffs.slice((minimalPage - 1) * pageCount, minimalPage * pageCount) as {
        _staffType,
        user,
        entityId,
        email,
        createdAt,
        rejected,
        mayAdministrateUsers,
        mayUpdate,
        mayAward,
        data
    } (entityId)}
      <tr>
        {#if _staffType === staffType.USER_PROVISIONMENT}
          <td>
            <CheckBox
              value={selection.some(el => el.entityId === entityId)}
              name={`select-${entityId}`}
              disabled={!permissions || !permissions.mayAdministrateUsers}
              onChange={val => onCheckOne(val, entityId, _staffType)}/>
          </td>
          <td class="member-icon">
            <div class="member-icon">
              {@html inviteCheck}
            </div>
          </td>
          <td>
            -
            <br/>
            <span class="sub-text">{email}</span>
          </td>
          {#if entity === entityType.BADGE_CLASS}
            <td>
              <div class="badgeclass-role-select">
                <Select
                  nonEditable={!permissions || !permissions.mayAdministrateUsers}
                  handleSelect={item => changeBadgeClassProvisionmentRole(item, entityId)}
                  value={
                      data.may_administrate_users ? targetOptionsBadgeClass[0] :
                      (data.may_update ? targetOptionsBadgeClass[1] :
                      (data.may_award ? targetOptionsBadgeClass[2] : 'error'))
                    }
                  items={targetOptionsBadgeClass}
                  clearable={false}
                  optionIdentifier="name"
                />
              </div>
            </td>
          {:else if entity === entityType.ISSUER}
            <td>
              <div class="badgeclass-role-select">
                <Select
                  nonEditable={!permissions || !permissions.mayAdministrateUsers}
                  handleSelect={item => changeIssuerProvisionmentRole(item, entityId)}
                  value={
                      data.may_administrate_users ? targetOptionsIssuer[0] :
                      (data.may_award ? targetOptionsIssuer[1] : 'error')
                    }
                  items={targetOptionsIssuer}
                  clearable={false}
                  optionIdentifier="name"
                />
              </div>
            </td>
          {:else if entity === entityType.ISSUER_GROUP}
            <td>
              <div class="badgeclass-role-select">
                <Select
                  nonEditable={!permissions || !permissions.mayAdministrateUsers}
                  handleSelect={item => changeIssuerGroupProvisionmentRole(item, entityId)}
                  value={
                      data.may_administrate_users ? targetOptionsIssuerGroup[0] :
                      (data.may_award ? targetOptionsIssuerGroup[1] : 'error')
                    }
                  items={targetOptionsIssuerGroup}
                  clearable={false}
                  optionIdentifier="name"
                />
              </div>
            </td>
          {:else}
            <td>{I18n.t(['editUsers', entity, 'allRights'])}</td>
          {/if}
          <td class="center">
            <InvitationStatusWidget date={createdAt}/>
          </td>
        {:else if _staffType === staffType.BADGE_CLASS_STAFF}
          <td>
            <CheckBox
              value={selection.some(el => el.entityId === entityId)}
              name={`select-${entityId}`}
              disabled={!permissions || !permissions.mayAdministrateUsers}
              onChange={val => onCheckOne(val, entityId)}/>
          </td>
          <td class="member-icon">
            <div class="member-icon">
              {@html memberCheck}
            </div>
          </td>
          <td>
            <ListLink path={`/users/${user.entityId}/institution`} name={`${user.firstName} ${user.lastName}`}/>
            <br/>
            <span class="sub-text">{user.email}</span>
          </td>
          <td>
            <div class="badgeclass-role-select">
              <Select
                nonEditable={!permissions || !permissions.mayAdministrateUsers}
                handleSelect={item => changeBadgeClassUserRole(item, entityId)}
                value={
                    mayAdministrateUsers ? targetOptionsBadgeClass[0] :
                    (mayUpdate ? targetOptionsBadgeClass[1] :
                    (mayAward ? targetOptionsBadgeClass[2] : 'error'))
                  }
                items={targetOptionsBadgeClass}
                clearable={false}
                optionIdentifier="name"
              />
            </div>
          </td>
          <td class="center">
            <InvitationStatusWidget accepted={true}/>
          </td>
        {:else if _staffType === staffType.ISSUER_STAFF}
          <td>
            <CheckBox
              value={selection.some(el => el.entityId === entityId)}
              name={`select-${entityId}`}
              disabled={entity !== entityType.ISSUER || !permissions || !permissions.mayAdministrateUsers}
              onChange={val => onCheckOne(val, entityId)}/>
          </td>
          <td class="member-icon">
            <div class="member-icon">
              {@html memberCheck}
            </div>
          </td>
          <td>
            <ListLink path={`/users/${user.entityId}/institution`} name={`${user.firstName} ${user.lastName}`}/>
            <br/>
            <span class="sub-text">{user.email}</span>
          </td>
          <td>
            {#if entity === entityType.ISSUER}
              <div class="badgeclass-role-select">
                <Select
                  nonEditable={!permissions || !permissions.mayAdministrateUsers}
                  handleSelect={item => changeIssuerUserRole(item, entityId)}
                  value={
                      mayAdministrateUsers ? targetOptionsIssuer[0] :
                      (mayAward ? targetOptionsIssuer[1] : 'error')
                    }
                  items={targetOptionsIssuer}
                  clearable={false}
                  optionIdentifier="name"
                />
              </div>
            {:else if entity === entityType.BADGE_CLASS}
              {#if mayUpdate}
                {I18n.t('editUsers.permissions.allRights')}
                <br/>
                <span class="sub-text">{I18n.t('editUsers.permissions.issuerAllRights')}</span>
              {:else}
                {I18n.t('editUsers.permissions.awarderRights')}
                <br/>
                <span class="sub-text">{I18n.t('editUsers.permissions.issuerAwarderRights')}</span>
              {/if}
            {:else}
              {I18n.t('editUsers.permissions.allRights')}
              <br/>
              <span class="sub-text">{I18n.t(['editUsers.permissions.issuerGroupAllRights'])}</span>
            {/if}
          </td>
          <td class="center">
            <InvitationStatusWidget accepted={true}/>
          </td>
        {:else if _staffType === staffType.ISSUER_GROUP_STAFF}
          <td>
            <CheckBox
              value={selection.some(el => el.entityId === entityId)}
              name={`select-${entityId}`}
              disabled={entity !== entityType.ISSUER_GROUP || !permissions || !permissions.mayAdministrateUsers}
              onChange={val => onCheckOne(val, entityId)}/>
          </td>
          <td class="member-icon">
            <div class="member-icon">
              {@html memberCheck}
            </div>
          </td>
          <td>
            <ListLink path={`/users/${user.entityId}/institution`} name={`${user.firstName} ${user.lastName}`}/>
            <br/>
            <span class="sub-text">{user.email}</span>
          </td>
          <td>
            {#if entity === entityType.ISSUER_GROUP}
              <div class="badgeclass-role-select">
                <Select
                  nonEditable={!permissions || !permissions.mayAdministrateUsers}
                  handleSelect={item => changeIssuerGroupUserRole(item, entityId)}
                  value={
                      mayAdministrateUsers ? targetOptionsIssuerGroup[0] :
                      (mayAward ? targetOptionsIssuerGroup[1] : 'error')
                    }
                  items={targetOptionsIssuerGroup}
                  clearable={false}
                  optionIdentifier="name"
                />
              </div>
            {:else if entity === entityType.ISSUER}
              {#if mayUpdate}
                {I18n.t('editUsers.permissions.allRights')}
                <br/>
                <span class="sub-text">{I18n.t('editUsers.permissions.issuerGroupAllRights')}</span>
              {:else}
                {I18n.t('editUsers.permissions.awarderRights')}
                <br/>
                <span class="sub-text">{I18n.t('editUsers.permissions.issuerGroupAwarderRights')}</span>
              {/if}
            {:else if entity === entityType.BADGE_CLASS}
              {#if mayUpdate}
                {I18n.t('editUsers.permissions.allRights')}
                <br/>
                <span class="sub-text">{I18n.t('editUsers.permissions.issuerGroupAllRights')}</span>
              {:else}
                {I18n.t('editUsers.permissions.awarderRights')}
                <br/>
                <span class="sub-text">{I18n.t('editUsers.permissions.issuerGroupAwarderRights')}</span>
              {/if}
            {:else}
              {I18n.t('editUsers.permissions.allRights')}
              <br/>
              <span class="sub-text">{I18n.t(['editUsers.permissions.issuerGroupAllRights'])}</span>
            {/if}
          </td>
          <td class="center">
            <InvitationStatusWidget accepted={true}/>
          </td>
        {:else if _staffType === staffType.INSTITUTION_STAFF}
          <td>
            <CheckBox
              value={selection.some(el => el.entityId === entityId)}
              name={`select-${entityId}`}
              disabled={entity !== entityType.INSTITUTION || oneInstitutionStaff || lastUnselectedInstitutionStaff(entityId) || !permissions || !permissions.mayAdministrateUsers}
              onChange={val => onCheckOne(val, entityId, _staffType)}/>
          </td>
          <td class="member-icon">
            <div class="member-icon">
              {@html memberCheck}
            </div>
          </td>
          <td>
            <ListLink path={`/users/${user.entityId}/institution`} name={`${user.firstName} ${user.lastName}`}/>
            <br/>
            <span class="sub-text">{user.email}</span>
          </td>
          <td>
            {#if entity !== entityType.INSTITUTION}
              {I18n.t(['editUsers', 'permissions', 'allRights'])}
              <br/>
              <span class="sub-text">{I18n.t(['editUsers', 'permissions', 'institutionAllRights'])}</span>
            {:else}
              {I18n.t(['editUsers', 'institution', 'allRights'])}
            {/if}
          </td>
          <td class="center">
            <InvitationStatusWidget accepted={true}/>
          </td>
        {/if}
        <td></td>
      </tr>
    {/each}
    {#if staffs.length === 0}
      <tr>
        <td colspan="5">{I18n.t("zeroState.badgeClasses", {name: I18n.t(`userManagement.${"institution_staff"}`)})}</td>
      </tr>
    {/if}
  </UsersTable>
</div>

{#if showRemoveModal}
  <Modal
    submit={removeModalAction}
    cancel={() => showRemoveModal = false}
    question={removeModalQuestion}
    title={removeModalTitle}/>
{/if}
