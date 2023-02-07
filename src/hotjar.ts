export const hotjarTriggerEvent = (brukHotJar: boolean, eventName: string) => {
    const hasWindow = () => typeof window !== 'undefined';

    if (hasWindow() && window.hasOwnProperty('hj') && brukHotJar) {
        const hotjar = window['hj'];
        hotjar('event', eventName);
    }
};
