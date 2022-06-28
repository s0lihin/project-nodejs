export const compareValues = (key, direction = 'asc') => {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (direction === 'desc') ? (comparison * -1) : comparison
        );
    };
}

export const paginator = (items, currentPage, perPageItems) => {
	let page = currentPage || 1,
	perPage = perPageItems || 10,
	offset = (page - 1) * perPage,

	paginatedItems = items.slice(offset).slice(0, perPageItems),
	totalPages = Math.ceil(items.length / perPage);

	return {
		page: page,
		perPage: perPage,
		prePage: page - 1 ? page - 1 : null,
		nextPage: (totalPages > page) ? page + 1 : null,
		total: items.length,
		totalPages: totalPages,
		data: paginatedItems
	};
}