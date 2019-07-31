import { ForeslattInnsatsgruppe } from './ducks/brukerregistrering';
import { erDemo } from './utils/app-state-utils';
import { ServicegruppeOrNull } from './ducks/oppfolging';
import { CreatedMetrics } from './created-metrics';

const createdMetrics = new CreatedMetrics();

const w = (window as any); // tslint:disable-line:no-any

const logEvent = w.frontendlogger ? (name: string, fields: any, tags: any) => {
    if (!createdMetrics.alreadyCreated(name)) {
        w.frontendlogger.event(name, fields, tags);
        createdMetrics.registerCreatedMetric(name);
    }
} : () => { return; };

const domene = 'veientilarbeid';

export const seVeientilarbeid = (erSykmeldtMedArbeidsgiver: boolean, servicegruppe: ServicegruppeOrNull, microfrontend: boolean) => {
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

export const klikkPaSokLedigeStillinger = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent(`${domene}.sokledigestillinger`, {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const gaTilAktivitetsplan = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent(`${domene}.gatilaktivitetsplan`, {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const gaTilDialog = (antall: number, servicegruppe: string | null) => {
    if (!erDemo()) {
        logEvent(`${domene}.gatildialog`, {antallField: antall, innsatsgruppeField: servicegruppe}, {antallTag: antall, innsatsgruppeTag: servicegruppe});
    }
};

export const antallUlesteDialoger = (antall: number) => {
    if (!erDemo()) {
        logEvent(`${domene}.antallulestedialoger`, {antallField: antall}, {antallTag: antall});
    }
};

export const gaTilMeldekort = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent(`${domene}.gatilmeldekort`, {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
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

export const gaTilDittSykefravaer = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent(`${domene}.gatildittsykefravaer`, {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const gaTilMIA = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent(`${domene}.gatilmia`, {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const gaTilCV = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent(`${domene}.gatilcv`, {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const gaTilJobbsokerkompetanse = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent(`${domene}.gatiljobbsokerkompetanseresultat`, {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const gaTilVeiviserarbeidssoker = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent(`${domene}.gatilveiviserarbeidssoker`, {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const gaTilTiltaksinfo = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent(`${domene}.gatiltiltaksinfo`, {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const seTiltaksinfo = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent(`${domene}.setiltaksinfo`, {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const klikkPaSoknadDagpenger = (servicegruppe: string | null) => {
    if (!erDemo()) {
        logEvent(`${domene}.soknaddagpenger`, {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const lesOmOkonomi = (stonad: string, servicegruppe: string | null) => {
    if (!erDemo()) {
        logEvent(`${domene}.lesomokonomi`, {stonadField: stonad, innsatsgruppeField: servicegruppe}, {stonadTag: stonad, innsatsgruppeTag: servicegruppe});
    }
};
