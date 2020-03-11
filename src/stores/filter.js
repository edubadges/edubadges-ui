import { readable, writable, derived } from "svelte/store";
import { get, forEach } from "lodash";
import { validSearch, validPresence } from "../util/filter";
import { queryData } from "../api/graphql";

const query = `{
    faculties {
      entityId,
      name,
      issuers {
        entityId,
        name,
        badgeclasses {
          name
        }
      }
    }
  }`;

const graphqlFaculties = readable([], set => {
  queryData(query).then(({ faculties }) => set(faculties));
});

export const search = writable();

export const facultyIds = writable([]);
export const facultyIdPath = writable();

export const issuerIds = writable([]);
export const issuerIdPath = writable();

export const collection = writable();
export const filteredCollection = derived(
  [collection, search, facultyIds, facultyIdPath, issuerIds, issuerIdPath],
  ([coll, search, facIds, facPath, issIds, issPath]) => {
    if (!coll) return [];
    if (!search && !facIds.length && !issIds.length) return coll;

    const facFilter = facPath && { list: facIds, attr: facPath };
    const issFilter = issPath && { list: issIds, attr: issPath };
    const filters = [facFilter, issFilter].filter(Boolean);

    return coll.filter(
      item => validSearch(item, search) && validPresence(item, filters)
    );
  },
  []
);

function setCountForList(collection, pathToId, filters) {
  return forEach(filters, item => {
    const matches = collection.filter(i => get(i, pathToId) === item.entityId);
    item["count"] = matches.length || 0;
  });
}

function enrichFilters(...args) {
  return setCountForList(...args)
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) => b.count - a.count);
}

export const faculties = derived(
  [filteredCollection, graphqlFaculties, facultyIdPath],
  ([coll, fac, path], set) => set(enrichFilters(coll, path, fac)),
  []
);

export const issuers = derived(
  [filteredCollection, faculties, facultyIds, issuerIdPath],
  ([coll, faculties, facIds, path]) => {
    if (!path) return [];

    const _faculties = !facIds.length
      ? faculties
      : faculties.filter(({ entityId }) => facIds.includes(entityId));

    return _faculties.flatMap(fac => enrichFilters(coll, path, fac.issuers));
  },
  []
);

export function resetFilters() {
  collection.set();
  search.set();
  facultyIds.set([]);
  facultyIdPath.set();
  issuerIds.set([]);
  issuerIdPath.set();
}
