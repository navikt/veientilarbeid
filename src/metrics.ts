const w = (window as any); // tslint:disable-line:no-any

const logEvent = w.frontendlogger ? w.frontendlogger.event : () => { return; };

const domene = 'veientilarbeid';

export const seVeientilarbeid = (erSykmeldtMedArbeidsgiver: boolean) => {
    logEvent(`${domene}.seveientilarbeid`, {}, {erSykmeldtMedArbeidsgiver});
};

export const klikkPaSokLedigeStillinger = (sokeKnappType: string) => {
    logEvent(`${domene}.sokledigestillinger`, {}, {sokeKnappType});
};

export const logInputSokLedigeStillinger = (inputSokefelt: string) => {
    logEvent(`${domene}.inputsokledigestillinger`, {inputSokefelt}, {});
};

export const gaTilAktivitetsplan = () => {
    logEvent(`${domene}.gatilaktivitetsplan`, {}, {});
};
