const w = (window as any); // tslint:disable-line:no-any
import { erDemo } from './demo/demo-state';

const logEvent = w.frontendlogger ? w.frontendlogger.event : () => { return; };

const domene = 'veientilarbeid';

export const seVeientilarbeid = (erSykmeldtMedArbeidsgiver: boolean) => {
    if (!erDemo()) {
        logEvent(`${domene}.seveientilarbeid`, {erSykmeldtMedArbeidsgiverField: erSykmeldtMedArbeidsgiver}, {erSykmeldtMedArbeidsgiver});
    }
};

export const visInfoOmDagpenger = () => {
    if (!erDemo()) {
        logEvent(`${domene}.visinfoomdagpenger`, {}, {});
    }
};

export const klikkPaSokLedigeStillinger = (sokeKnappType: string) => {
    if (!erDemo()) {
        logEvent(`${domene}.sokledigestillinger`, {}, {sokeKnappType});
    }
};

export const logInputSokLedigeStillinger = (inputSokefelt: string) => {
    if (!erDemo()) {
        logEvent(`${domene}.inputsokledigestillinger`, {inputSokefelt}, {});
    }
};

export const gaTilAktivitetsplan = () => {
    if (!erDemo()) {
        logEvent(`${domene}.gatilaktivitetsplan`, {}, {});
    }
};

export const gaTilDialog = (antall: number) => {
    if (!erDemo()) {
        logEvent(`${domene}.gatildialog`, {antallField: antall}, {antallTag: antall});
    }
};

export const antallUlesteDialoger = (antall: number) => {
    if (!erDemo()) {
        logEvent(`${domene}.antallulestedialoger`, {antallField: antall}, {antallTag: antall});
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

export const seTiltaksinfo = () => {
    if (!erDemo()) {
        logEvent(`${domene}.setiltaksinfo`, {}, {});
    }
};

export const klikkPaSoknadDagpenger = (nyregistrert: boolean) => {
    if (!erDemo()) {
        logEvent(`${domene}.soknaddagpenger`, {nyregistrertField: nyregistrert}, {nyregistrertTag: nyregistrert});
    }
};
