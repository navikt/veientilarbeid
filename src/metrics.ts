const w = (window as any); // tslint:disable-line:no-any
import { erDemo } from './mock/utils';

const logEvent = w.frontendlogger ? w.frontendlogger.event : () => { return; };

const domene = 'veientilarbeid';

function erDemo(): boolean {
    const path: string = window.location.pathname;
    return path.includes('/demo/index.html');
}

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

export const gaTilDialog = () => {
    if (!erDemo()) {
        logEvent(`${domene}.gatildialog`, {}, {});
    }
};

export const loggeUlesteDialoger = (antall: number) => {
    if (!erDemo()) {
        logEvent(`${domene}.loggeulestedialoger`, {}, {antall});
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

export const klikkPaSoknadDagpenger = () => {
    if (!erDemo()) {
        logEvent(`${domene}.soknaddagpenger`, {}, {});
    }
};
