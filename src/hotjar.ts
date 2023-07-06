type HotJar = (e: string, n: string) => void;
export const hotjarTriggerEvent = (eventName: string) => {
    const hasWindow = () => typeof window !== 'undefined';

    if (hasWindow() && window.hasOwnProperty('hj')) {
        const hotjar: HotJar = window['hj' as any] as any;
        hotjar('event', eventName);
    }
};
