export const hotjarTrigger = (brukHotJar: boolean) => {
    if (typeof window !== 'undefined' && window.hasOwnProperty('hj') && brukHotJar) {
        const hotjar = 'hj';
        window[hotjar]('trigger', 'aia-hotjar');
    }
};
