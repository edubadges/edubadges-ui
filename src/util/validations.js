export const isValidURL = url => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}