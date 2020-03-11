import { get, isEmpty } from 'lodash';

export function validSearch(item, search) {
	return !search || item['name'].toLowerCase().includes(search.toLowerCase())
}

export function validPresence(item, presenceFilters) {
	if (!presenceFilters || !presenceFilters.length) return true;

	return presenceFilters.map(({ attr, list }) => {
		if (isEmpty(list)) return true // nothing is selected

		return list.includes(get(item, attr))
	}).filter(Boolean).length === presenceFilters.length // item is valid for every presenceFilter
}