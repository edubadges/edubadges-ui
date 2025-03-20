export const catalogPageCount = 10;
export const pageCount = 10;

//https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
export const pagination = (page, totalResults) => {
    const current = page,
        last = totalResults,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = []
    let l;

    for (let i = 1; i <= last; i++) {
        // eslint-disable-next-line
        if (i === 1 || i === last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (const i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }
    return rangeWithDots;
}
