const w = (window as any); // tslint:disable-line:no-any
import { erDemo } from './demo/demo-state';

const logEvent = w.frontendlogger ? w.frontendlogger.event : () => { return; };

const domene = 'veientilarbeid';

export const seVeientilarbeid = (erSykmeldtMedArbeidsgiver: boolean) => {
    if (!erDemo()) {
        logEvent(`${domene}.seveientilarbeid`, {}, {erSykmeldtMedArbeidsgiver});
    }
};

export const visInfoOmDagpenger = () => {
    if (!erDemo()) {
        logEvent(`${domene}.visinfoomdagpenger`, {}, {});
    }
};

export const klikkPaSokLedigeStillinger = () => {
    if (!erDemo()) {
        logEvent(`${domene}.sokledigestillinger`, {}, {});
    }
};

export const gaTilAktivitetsplan = () => {
    if (!erDemo()) {
        logEvent(`${domene}.gatilaktivitetsplan`, {}, {});
    }
};

export const gaTilDialog = () => {
    if (!erDemo()) {
        logEvent(`${domene}.gatildialog`, {}, {});
    }
};

export const loggeUlesteDialoger = (antall: number) => {
    if (!erDemo()) {
        logEvent(`${domene}.loggeulestedialoger`, {antallField: antall}, {antallTag: antall});
    }
};

export const gaTilMeldekort = () => {
    if (!erDemo()) {
        logEvent(`${domene}.gatilmeldekort`, {}, {});
    }
};

export const gaTilMIA = () => {
    if (!erDemo()) {
        logEvent(`${domene}.gatilmia`, {}, {});
    }
};

export const gaTilCV = () => {
    if (!erDemo()) {
        logEvent(`${domene}.gatilcv`, {}, {});
    }
};

export const gaTilJobbsokerkompetanse = () => {
    if (!erDemo()) {
        logEvent(`${domene}.gatiljobbsokerkompetanse`, {}, {});
    }
};

export const gaTilTiltaksinfo = () => {
    if (!erDemo()) {
        logEvent(`${domene}.gatiltiltaksinfo`, {}, {});
    }
};

export const klikkPaSoknadDagpenger = () => {
    if (!erDemo()) {
        logEvent(`${domene}.soknaddagpenger`, {}, {});
    }
};
