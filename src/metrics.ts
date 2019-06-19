import { ForeslattInnsatsgruppe } from './ducks/brukerregistrering';

const w = (window as any); // tslint:disable-line:no-any
import { erDemo } from './utils/app-state-utils';
import { Innsatsgruppe } from './ducks/innsatsgruppe';

const logEvent = w.frontendlogger ? w.frontendlogger.event : () => { return; };

const domene = 'veientilarbeid';

export const seVeientilarbeid = (erSykmeldtMedArbeidsgiver: boolean, servicegruppe: Innsatsgruppe | null, microfrontend: boolean) => {
    if (!erDemo()) {
        logEvent(`${domene}.seveientilarbeid`,
            {erSykmeldtMedArbeidsgiverField: erSykmeldtMedArbeidsgiver, servicegruppeField: servicegruppe, microfrontendField: microfrontend},
            {erSykmeldtMedArbeidsgiver, servicegruppeTag: servicegruppe, microfrontendTag: microfrontend});
    }
};

export const seVeientilarbeidNiva3 = () => {
    if (!erDemo()) {
        logEvent(`${domene}.seveientilarbeidniva3`, {}, {});
    }
};

export const klikkPaSokLedigeStillinger = (innsatsgruppe: String | null) => {
    if (!erDemo()) {
        logEvent(`${domene}.sokledigestillinger`, {innsatsgruppeField: innsatsgruppe}, {innsatsgruppeTag: innsatsgruppe});
    }
};

export const gaTilAktivitetsplan = () => {
    if (!erDemo()) {
        logEvent(`${domene}.gatilaktivitetsplan`, {}, {});
    }
};

export const gaTilDialog = (antall: number, innsatsgruppe: string | null) => {
    if (!erDemo()) {
        logEvent(`${domene}.gatildialog`, {antallField: antall, innsatsgruppeField: innsatsgruppe}, {antallTag: antall, innsatsgruppeTag: innsatsgruppe});
    }
};

export const antallUlesteDialoger = (antall: number) => {
    if (!erDemo()) {
        logEvent(`${domene}.antallulestedialoger`, {antallField: antall}, {antallTag: antall});
    }
};

export const gaTilMeldekort = (innsatsgruppe: String | null) => {
    if (!erDemo()) {
        logEvent(`${domene}.gatilmeldekort`, {innsatsgruppeField: innsatsgruppe}, {innsatsgruppeTag: innsatsgruppe});
    }
};

export const seEgenvurdering = (foreslaattinnsatsgruppe: ForeslattInnsatsgruppe) => {
    if (!erDemo()) {
        logEvent(`${domene}.seegenvurdering`, {}, {foreslaattInnsatsgruppe: foreslaattinnsatsgruppe});
    }
};

export const seMotestotte = (foreslaattinnsatsgruppe: ForeslattInnsatsgruppe) => {
    if (!erDemo()) {
        logEvent(`${domene}.semotestotte`, {}, {foreslaattInnsatsgruppe: foreslaattinnsatsgruppe});
    }
};

export const gaTilEgenvurdering = (antallTimer: number, foreslaattinnsatsgruppe: ForeslattInnsatsgruppe) => {
    if (!erDemo()) {
        logEvent(`${domene}.gatilegenvurdering`, {antallTimer: antallTimer}, {foreslaattInnsatsgruppe: foreslaattinnsatsgruppe});
    }
};

export const gaTilMotestotte = (antallTimer: number, foreslaattinnsatsgruppe: ForeslattInnsatsgruppe) => {
    if (!erDemo()) {
        logEvent(`${domene}.gatilmotestotte`, {antallTimer: antallTimer}, {foreslaattInnsatsgruppe: foreslaattinnsatsgruppe});
    }
};

export const gaTilDittSykefravaer = (innsatsgruppe: String | null) => {
    if (!erDemo()) {
        logEvent(`${domene}.gatildittsykefravaer`, {innsatsgruppeField: innsatsgruppe}, {innsatsgruppeTag: innsatsgruppe});
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
        logEvent(`${domene}.gatiljobbsokerkompetanseresultat`, {}, {});
    }
};

export const gaTilVeiviserarbeidssoker = () => {
    if (!erDemo()) {
        logEvent(`${domene}.gatilveiviserarbeidssoker`, {}, {});
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

export const klikkPaSoknadDagpenger = () => {
    if (!erDemo()) {
        logEvent(`${domene}.soknaddagpenger`, {}, {});
    }
};

export const lesOmOkonomi = (stonad: string, innsatsgruppe: string | null) => {
    if (!erDemo()) {
        logEvent(`${domene}.lesomokonomi`, {stonadField: stonad, innsatsgruppeField: innsatsgruppe}, {stonadTag: stonad, innsatsgruppeTag: innsatsgruppe});
    }
};
