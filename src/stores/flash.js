import {writable} from 'svelte/store';

const createFlash = () => {
    const {subscribe, set} = writable("");

    return {
        subscribe,
        setValue: value => setTimeout(() => {
            set(value);
            setTimeout(() => set(""), 3000)
        }, 125),
    };
};
export const flash = createFlash();