const w = (window as any); // tslint:disable-line:no-any

const logEvent = w.frontendlogger ? w.frontendlogger.event : () => { return; };

const domene = 'veientilarbeid';

export const seVeientilarbeid = (erSykmeldtMedArbeidsgiver: boolean) => {
    logEvent(`${domene}.seveientilarbeid`, {}, {erSykmeldtMedArbeidsgiver});
};

export const visInfoOmDagpenger = () => {
    logEvent(`${domene}.visinfoomdagpenger`, {}, {});
};

export const klikkPaSokLedigeStillinger = () => {
    logEvent(`${domene}.sokledigestillinger`, {}, {});
};

export const gaTilAktivitetsplan = () => {
    logEvent(`${domene}.gatilaktivitetsplan`, {}, {});
};

export const gaTilDialog = () => {
    logEvent(`${domene}.gatildialog`, {}, {});
};

export const gaTilMeldekort = () => {
    logEvent(`${domene}.gatilmeldekort`, {}, {});
};

export const gaTilMIA = () => {
    logEvent(`${domene}.gatilmia`, {}, {});
};

export const gaTilCV = () => {
    logEvent(`${domene}.gatilcv`, {}, {});
};

export const gaTilJobbsokerkompetanse = () => {
    logEvent(`${domene}.gatiljobbsokerkompetanse`, {}, {});
};

export const gaTilTiltaksinfo = () => {
    logEvent(`${domene}.gatiltiltaksinfo`, {}, {});
};

export const klikkPaSoknadDagpenger = () => {
    logEvent(`${domene}.soknaddagpenger`, {}, {});
};
