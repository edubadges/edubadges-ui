import { writable, derived } from "svelte/store";

export const faculties = writable([]);

export const search = writable();
export const facultyIds = writable([]);
export const issuerIds = writable([]);

function filterBySearch(badgeclasses, search) {
  if (!search) return badgeclasses;

  return badgeclasses.filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase())
  );
}

function sort(collection, count = false) {
  return collection.sort((a, b) => {
    if (!count) return a.name.localeCompare(b.name);
    return b.count - a.count || a.name.localeCompare(b.name);
  });
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
  [faculties, search, facultyIds, issuerIds],
  ([faculties, search, facultyIds, issuerIds]) => {
    const tree = faculties.reduce(
      (acc, cur) => {
        // different faculty selected
        if (facultyIds.length && !facultyIds.includes(cur.entityId)) {
          return acc;
        }

        let issuers = cur.issuers.filter(
          ({ entityId }) => !issuerIds.length || issuerIds.includes(entityId)
        );

        // faculty is not the parent of issuer selected
        if (issuerIds.length && !issuers.length) {
          return acc;
        }

        let badgeClasses = [];
        const enrichedIssuers = issuers.map(
          ({ badgeclasses, entityId, name }) => {
            const _badgeClasses = filterBySearch(badgeclasses, search);
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
      { faculties: [], issuers: [], badgeClasses: [] }
    );

    return {
      faculties: sort(tree.faculties, true),
      issuers: sort(tree.issuers, true),
      badgeClasses: sort(tree.badgeClasses),
    };
  },
  { faculties: [], issuers: [], badgeClasses: [] }
);
