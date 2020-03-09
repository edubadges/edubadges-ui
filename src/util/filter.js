export const applyFilter = (collection, searchText) => {
	if (!searchText) return collection;

	return collection.filter(({ name }) =>
		name.toLowerCase().includes(searchText.toLowerCase())
	);
}