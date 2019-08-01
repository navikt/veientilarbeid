import { ForeslattInnsatsgruppe } from '../ducks/brukerregistrering';
import { erDemo } from '../utils/app-state-utils';
import { ServicegruppeOrNull } from '../ducks/oppfolging';
import { CreatedMetrics } from './created-metrics';

const createdMetrics = new CreatedMetrics();

const w = (window as any); // tslint:disable-line:no-any

const domene = 'veientilarbeid';

const logEvent = w.frontendlogger ? (navn: string, fields: object, tags: object) => {
    const metrikkId = `${domene}.${navn}`;

    const metrikkAlleredeOpprettet = createdMetrics.alreadyCreated(metrikkId);

    if (metrikkAlleredeOpprettet) {
        w.frontendlogger.event(`${domene}.duplikat`, {}, {metrikk: metrikkId});
    }

    if (!metrikkAlleredeOpprettet) {
        w.frontendlogger.event(metrikkId, fields, tags);
        createdMetrics.registerCreatedMetric(metrikkId);
    }
} : () => { return; };

export const seVeientilarbeid = (erSykmeldtMedArbeidsgiver: boolean, servicegruppe: ServicegruppeOrNull, microfrontend: boolean) => {
    if (!erDemo()) {
        logEvent('seveientilarbeid',
            {erSykmeldtMedArbeidsgiverField: erSykmeldtMedArbeidsgiver, servicegruppeField: servicegruppe, microfrontendField: microfrontend},
            {erSykmeldtMedArbeidsgiver, servicegruppeTag: servicegruppe, microfrontendTag: microfrontend});
    }
};

export const seVeientilarbeidNiva3 = () => {
    if (!erDemo()) {
        logEvent('seveientilarbeidniva3', {}, {});
    }
};

export const klikkPaSokLedigeStillinger = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent('sokledigestillinger', {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const gaTilAktivitetsplan = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent('gatilaktivitetsplan', {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const gaTilDialog = (antall: number, servicegruppe: string | null) => {
    if (!erDemo()) {
        logEvent('gatildialog', {antallField: antall, innsatsgruppeField: servicegruppe}, {antallTag: antall, innsatsgruppeTag: servicegruppe});
    }
};

export const antallUlesteDialoger = (antall: number) => {
    if (!erDemo()) {
        logEvent('antallulestedialoger', {antallField: antall}, {antallTag: antall});
    }
};

export const gaTilMeldekort = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent('gatilmeldekort', {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const seEgenvurdering = (foreslaattinnsatsgruppe: ForeslattInnsatsgruppe) => {
    if (!erDemo()) {
        logEvent('seegenvurdering', {}, {foreslaattInnsatsgruppe: foreslaattinnsatsgruppe});
    }
};

export const seMotestotte = (foreslaattinnsatsgruppe: ForeslattInnsatsgruppe) => {
    if (!erDemo()) {
        logEvent('semotestotte', {}, {foreslaattInnsatsgruppe: foreslaattinnsatsgruppe});
    }
};

export const gaTilEgenvurdering = (antallTimer: number, foreslaattinnsatsgruppe: ForeslattInnsatsgruppe) => {
    if (!erDemo()) {
        logEvent('gatilegenvurdering', {antallTimer: antallTimer}, {foreslaattInnsatsgruppe: foreslaattinnsatsgruppe});
    }
};

export const gaTilMotestotte = (antallTimer: number, foreslaattinnsatsgruppe: ForeslattInnsatsgruppe) => {
    if (!erDemo()) {
        logEvent('gatilmotestotte', {antallTimer: antallTimer}, {foreslaattInnsatsgruppe: foreslaattinnsatsgruppe});
    }
};

export const gaTilDittSykefravaer = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent('gatildittsykefravaer', {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const gaTilMIA = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent('gatilmia', {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const gaTilCV = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent('gatilcv', {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const gaTilJobbsokerkompetanse = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent('gatiljobbsokerkompetanseresultat', {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const gaTilVeiviserarbeidssoker = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent('gatilveiviserarbeidssoker', {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const gaTilTiltaksinfo = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent('gatiltiltaksinfo', {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const seTiltaksinfo = (servicegruppe: String | null) => {
    if (!erDemo()) {
        logEvent('setiltaksinfo', {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const klikkPaSoknadDagpenger = (servicegruppe: string | null) => {
    if (!erDemo()) {
        logEvent('soknaddagpenger', {innsatsgruppeField: servicegruppe}, {innsatsgruppeTag: servicegruppe});
    }
};

export const lesOmOkonomi = (stonad: string, servicegruppe: string | null) => {
    if (!erDemo()) {
        logEvent('lesomokonomi', {stonadField: stonad, innsatsgruppeField: servicegruppe}, {stonadTag: stonad, innsatsgruppeTag: servicegruppe});
    }
};
