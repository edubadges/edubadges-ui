<script>
    import {queryData} from "../../api/graphql";
    import {onMount} from "svelte";
    import {UserManagement} from "../teachers";
    import {addStaffType, staffType} from "../../util/staffTypes";
    import {translateProperties} from "../../util/utils";

    export let entity;
    export let entityId;

    let institutionStaffMembers = [];
    let issuerGroupStaffMembers = [];
    let selection = [];
    let permissions;
    let userProvisionments = [];

    const query = `query ($entityId: String){
    faculty(id: $entityId) {
      nameEnglish,
      nameDutch,
      userprovisionments {
        email,
        createdAt,
        entityId,
        data
      },
      staff {
        entityId,
        mayAdministrateUsers,
        mayUpdate,
        mayAward,
        user {
          firstName,
          lastName,
          fullName,
          entityId,
          email
        }
      },
      institution {
        nameEnglish,
        nameDutch,
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
      },
      permissions {
        mayAdministrateUsers
      }
		}
  }`;
    const reload = () => {
        queryData(query, {entityId}).then(res => {
            translateProperties(res.faculty);
            translateProperties(res.faculty.institution);

            institutionStaffMembers = addStaffType(res.faculty.institution.staff, staffType.INSTITUTION_STAFF);
            issuerGroupStaffMembers = addStaffType(res.faculty.staff, staffType.ISSUER_GROUP_STAFF);
            userProvisionments = addStaffType(res.faculty.userprovisionments, staffType.USER_PROVISIONMENT);
            permissions = res.faculty.permissions;
        })
    };

    onMount(reload);

</script>

<UserManagement
  {entity}
  {entityId}
  {permissions}
  institutionStaffs={institutionStaffMembers}
  issuerGroupStaffs={issuerGroupStaffMembers}
  {userProvisionments}
  {reload}
/>
