import { get, isEmpty } from 'lodash';

export function validSearch(item, search) {
	if (!search || !search.text) return true;

	return search.attrs.filter(attr =>
		item[attr].toLowerCase().includes(search.text.toLowerCase())
	).length // the text is found on any of the attrs
}

export function validPresence(item, presenceFilters) {
	if (!presenceFilters || !presenceFilters.length) return true;

	return presenceFilters.map(({ attr, list }) => {
		if (isEmpty(list)) return true // nothing is selected

		return list.includes(get(item, attr))
	}).filter(Boolean).length === presenceFilters.length // item is valid for every presenceFilter
}