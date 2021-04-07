import {derived, writable} from "svelte/store";

export const sortTarget = writable();
export const faculties = writable([]);

export const search = writable("");
export const facultyIds = writable([]);
export const issuerIds = writable([]);
export const awardFilter = writable(false);

export const filterBySearch = (badgeclasses, search) => {
  if (!search || search.trim().length === 0) {
    return badgeclasses;
  }

  return badgeclasses.filter(({name}) =>
    name.toLowerCase().includes(search.toLowerCase())
  );
}

export const sort = (collection, count = false) => {
  return !collection ? [] : collection.sort((a, b) => count ? b.count - a.count || a.name.localeCompare(b.name) : a.name.localeCompare(b.name));
}

export const sortCreatedAt = collection => !collection ? [] : collection.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

export const sortBadgeAssertions = collection => {
  return !collection ? [] : collection.sort((a, b) => b.assertionsCount !== undefined ? b.assertionsCount - a.assertionsCount : b.badgeAssertions.length - a.badgeAssertions.length)
}

export const selectedEntity = derived(
  [faculties, facultyIds, issuerIds],
  ([faculties, facultyIds, issuerIds]) => {
    if (issuerIds.length) {
      const issuers = faculties.flatMap((fac) => fac.issuers);
      return issuers.find((iss) => issuerIds.includes(iss.entityId));
    }

    if (facultyIds.length) {
      return faculties.find((fac) => facultyIds.includes(fac.entityId));
    }
  }
);

export const tree = derived(
  [faculties, awardFilter, search, issuerIds, sortTarget],
  ([faculties, awardFilter, search, issuerIds, sortTarget]) => {
    const tree = faculties.reduce(
      (acc, cur) => {
        let issuers = cur.issuers.filter(
          ({entityId}) => !issuerIds.length || issuerIds.includes(entityId)
        );

        let badgeClasses = [];
        const enrichedIssuers = issuers.map(
          ({badgeclasses, entityId, name}) => {
            const _badgeClasses = filterBySearch(badgeclasses, search).filter(badgeClass => !awardFilter || (awardFilter && badgeClass.permissions.mayAward));
            badgeClasses.push(_badgeClasses);

            const issuer = {
              name,
              entityId,
              count: _badgeClasses ? _badgeClasses.length : 0,
            };

            return issuer;
          }
        );

        acc.issuers.push(...enrichedIssuers);
        acc.badgeClasses.push(...badgeClasses.flat());

        const enrichedFaculty = {
          name: cur.name,
          entityId: cur.entityId,
          count: enrichedIssuers.reduce((acc, cur) => acc + cur.count, 0),
        };

        acc.faculties.push(enrichedFaculty);

        return acc;
      },
      {faculties: [], issuers: [], badgeClasses: []}
    );
    const sortedBadgeClasses = (sortTarget && sortTarget.value === "recent") ? sortCreatedAt(tree.badgeClasses) : sortBadgeAssertions(tree.badgeClasses);
    return {
      faculties: sort(tree.faculties, true),
      issuers: sort(tree.issuers, true),
      badgeClasses: sortedBadgeClasses,
    };
  },
  {faculties: [], issuers: [], badgeClasses: []}
);
