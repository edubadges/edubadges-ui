<script>
    import {onMount} from "svelte";
    import {FacultyForm} from "../teachers";
    import {queryData} from "../../api/graphql";
    import Spinner from "../Spinner.svelte";
    import {translateProperties} from "../../util/utils";
    import I18n from "i18n-js";

    export let entityId;

    const query = `query ($entityId: String) {
    currentInstitution {
      institutionType,
      virtualOrganizationAllowed
    },
    faculty(id: $entityId) {
      entityId,
      imageEnglish,
      imageDutch,
      nameEnglish,
      nameDutch,
      descriptionEnglish,
      descriptionDutch,
      hasUnrevokedAssertions,
      hasAssertions,
      archived,
      onBehalfOf,
      onBehalfOfUrl,
      onBehalfOfDisplayName,
      defaultLanguage,
      facultyType,
      visibilityType,
      linkedinOrgIdentifier
      permissions {
        mayCreate
        mayUpdate,
        mayDelete
      }
    },
  }`;

    let faculty = {};
    let currentInstitution = {};
    let permissions = {};
    let loaded = false;
    let mayDelete = false;

    onMount(() => {

        queryData(query, {entityId}).then(res => {
            faculty = res.faculty;
            currentInstitution = res.currentInstitution;
            translateProperties(faculty);
            faculty.facultyType = {value: faculty.facultyType, name: faculty.facultyType};
            faculty.visibilityType = {
                value: faculty.visibilityType,
                name: I18n.t(`models.faculty.visibility.${(faculty.visibilityType || "public").toLowerCase()}`)
            };
            permissions = res.faculty.permissions;
            mayDelete = permissions && permissions.mayDelete;
            loaded = true;
        })
    });
</script>

{#if loaded}
    <FacultyForm {faculty}
                 {entityId}
                 defaultLanguage={faculty.defaultLanguage}
                 mayDelete={mayDelete}
                 hasUnrevokedAssertions={faculty.hasUnrevokedAssertions}
                 hasAnyAssertions={faculty.hasAssertions}
                 virtualOrganizationAllowed={currentInstitution.virtualOrganizationAllowed}
                 institutionType={currentInstitution.institutionType}/>
{:else}
    <Spinner/>
{/if}

