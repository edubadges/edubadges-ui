import {derived, writable} from "svelte/store";
import {filterBySearch, sort, sortBadgeAssertions, sortCreatedAt} from "./filterBadges";
import {educationalLevels, studyLoadCategories} from "../util/catalogFilters";
import I18n from "i18n-js";

export const sortTarget = writable();
export const badgeClasses = writable([]);
export const search = writable();

export const educationalLevelSelected = writable([]);
export const institutionSelected = writable([]);
export const studyLoadSelected = writable([]);
export const eqfLevelSelected = writable([]);

export const tree = derived(
  [badgeClasses, search, educationalLevelSelected, institutionSelected, studyLoadSelected, eqfLevelSelected, sortTarget],
  ([badgeClasses, search, educationalLevelSelected, institutionSelected, studyLoadSelected, eqfLevelSelected, sortTarget]) => {
    const filteredBadgeClasses = filterBySearch(badgeClasses, search)
      .filter(badge => {
        return !educationalLevelSelected.length || educationalLevelSelected.includes(badge.institutionType);
      })
      .filter(badge => {
        return !institutionSelected.length || institutionSelected.includes(badge.institution.entityId);
      })
      .filter(badge => {
        return !studyLoadSelected.length || studyLoadSelected.includes(badge.studyLoadType);
      })
      .filter(badge => {
        return !eqfLevelSelected.length || eqfLevelSelected.includes(badge.eqf);
      });
    const educationLevels = filteredBadgeClasses.reduce((acc, badge) => {
        const item = acc.find(v => v.value === badge.institutionType);
        ++item.count;
        return acc;
      },
      Object.keys(educationalLevels).map(level => ({
        name: I18n.t(`catalog.education.${level}`),
        value: educationalLevels[level],
        count: 0
      })));

    const institutions = filteredBadgeClasses.reduce((acc, badge) => {
      const item = acc.find(v => v.entityId === badge.institution.entityId);
      if (item) {
        ++item.count;
      } else {
        acc.push({
          name: badge.institution.name,
          entityId: badge.institution.entityId,
          count: 1
        })
      }
      return acc;
    }, []);

    const studyLoads = filteredBadgeClasses.reduce((acc, badge) => {
        const item = acc.find(v => v.value === badge.studyLoadType);
        ++item.count;
        return acc;
      },
      Object.keys(studyLoadCategories).map(level => ({
        name: I18n.t(`catalog.studyLoad.${level}`),
        value: studyLoadCategories[level],
        count: 0
      })));

    const eqfLevels = filteredBadgeClasses.reduce((acc, badge) => {
        const item = acc.find(v => v.value === badge.eqf);
        ++item.count;
        return acc;
      },
      Array(8).fill(0).map((v, i) => ({
        name: I18n.t(`catalog.eqf.eqf${i === 0 ? "None" : ""}`, {level: i + 1}),
        value: i === 0 ? null : i + 1,
        count: 0
      })));

    const tree = {filteredBadgeClasses, educationLevels, institutions, studyLoads, eqfLevels};
    const sortedBadgeClasses = (sortTarget && sortTarget.value === "recent") ? sortCreatedAt(tree.filteredBadgeClasses) : sortBadgeAssertions(tree.filteredBadgeClasses);

    return {
      badgeClasses: sortedBadgeClasses,
      educationLevels: sort(tree.educationLevels, true),
      institutions: sort(tree.institutions, true),
      studyLoads: sort(tree.studyLoads, true),
      eqfLevels: sort(tree.eqfLevels, true),
    };
  });
