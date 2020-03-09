import { writable, derived } from 'svelte/store';
import { validSearch, validPresence } from '../util/filter';

export const collection = writable(); // [{}]
export const searchFilter = writable(); // { attrs: ['name'], text: '' }
export const presenceFilters = writable(); // [{ attr: 'badge.issuer.id', list: [] }]

export const filteredCollection = derived(
	[collection, searchFilter, presenceFilters],
	([coll, search, presence]) => coll
		? coll.filter(item => validSearch(item, search) && validPresence(item, presence))
		: []
	,
	[]
)

export function resetFilterStores() {
	collection.set();
	searchFilter.set();
	presenceFilters.set();
}