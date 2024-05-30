// Paginate objects
function paginate(count, page, items) {
    if (count <= 0) {
        return {
            max_page: null,
            next_page: null,
            previous_page: null,
            offset: 0
        };
    }

    let max_page = Math.floor(count / items);

    if (count % items >= 1) {
        max_page += 1;
    }

    if (page * items > count) {
        page = max_page;
    }

    const next_page = page < max_page ? page + 1 : null;
    const previous_page = page === 1 ? null : page - 1;

    const offset = (page - 1) * items > 0 ? (page - 1) * items : 0;

    return {
        max_page: max_page,
        offset: offset,
        limit: items,
        next_page: next_page,
        previous_page: previous_page
    };
}

module.exports = {
    paginate,
  };