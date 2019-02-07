const w = (window as any); // tslint:disable-line:no-any

const logEvent = w.frontendlogger ? w.frontendlogger.event : () => { return; };

const domene = 'veientilarbeid';

export const klikkPaSokLedigeStillinger = (sokeKnappType: string) => {
    logEvent(`${domene}.sokledigestillinger`, {}, {
        sokeKnappType
    });
};
