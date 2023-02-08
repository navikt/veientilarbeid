export const hotjarTriggerEvent = (eventName: string) => {
    const hasWindow = () => typeof window !== 'undefined';

    if (hasWindow() && window.hasOwnProperty('hj')) {
        const hotjar = window['hj'];
        hotjar('event', eventName);
    }
};
