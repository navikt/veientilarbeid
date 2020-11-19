import { ForeslattInnsatsgruppe } from '../ducks/brukerregistrering';
import { erDemo } from '../utils/app-state-utils';
import { FormidlingsgruppeOrNull, ServicegruppeOrNull } from '../ducks/oppfolging';
import { RegistreringTypeOrIngenVerdi } from '../ducks/bruker-info';
import { CreatedMetrics } from './created-metrics';
import { amplitudeLogger, setIdentifyProperty, AmplitudeAktivitetsData } from './amplitude-utils';
import { uniLogger } from './uni-logger';
import { POAGruppe } from '../utils/get-poa-group';

const createdMetrics = new CreatedMetrics();

const w = window as any;

const domene = 'veientilarbeid';

const logEvent = w.frontendlogger
    ? (navn: string, fields: object, tags: object) => {
          if (erDemo()) {
              return;
          }

          const metrikkId = `${domene}.${navn}`;

          const metrikkAlleredeOpprettet = createdMetrics.alreadyCreated(metrikkId);

          if (metrikkAlleredeOpprettet) {
              w.frontendlogger.event(`${domene}.duplikat`, {}, { metrikk: metrikkId });
          }

          if (!metrikkAlleredeOpprettet) {
              w.frontendlogger.event(metrikkId, fields, tags);
              createdMetrics.registerCreatedMetric(metrikkId);
          }
      }
    : () => {
          return;
      };

export const seVeientilarbeid = (
    erSykmeldtMedArbeidsgiver: boolean,
    servicegruppe: ServicegruppeOrNull,
    microfrontend: boolean,
    formidlingsgruppe: FormidlingsgruppeOrNull,
    rettighetsgruppe: String,
    dinSituasjon: String,
    underOppfolging: String,
    registreringType: RegistreringTypeOrIngenVerdi,
    fremtidigSituasjon: String,
    reservasjonKRR: string
) => {
    logEvent(
        'seveientilarbeid',
        {
            erSykmeldtMedArbeidsgiverField: erSykmeldtMedArbeidsgiver,
            servicegruppeField: servicegruppe,
            microfrontendField: microfrontend,
        },
        {
            erSykmeldtMedArbeidsgiver,
            servicegruppeTag: servicegruppe,
            microfrontendTag: microfrontend,
            formidlingsgruppe,
            rettighetsgruppe,
            dinSituasjon,
            underOppfolging,
            registreringType,
            fremtidigSituasjon,
            reservasjonKRR,
        }
    );
    amplitudeLogger(`${domene}.visning`, {
        erSykmeldtMedArbeidsgiver,
        servicegruppe,
        microfrontend,
        formidlingsgruppe,
        rettighetsgruppe,
        dinSituasjon,
        underOppfolging,
        registreringType,
        fremtidigSituasjon,
        reservasjonKRR,
    });
};

export const seVeientilarbeidNiva3 = () => {
    logEvent('seveientilarbeidniva3', {}, {});
    amplitudeLogger(`${domene}.nivaa3.visning`);
};

export const seIARBSPlaster = (
    formidlingsgruppe: String | null,
    servicegruppe: String | null,
    rettighetsgruppe: String
) => {
    logEvent(
        'viseriarbsplaster',
        {},
        { formidlingsgruppeTag: formidlingsgruppe, servicegruppeTag: servicegruppe, rettighetsgruppe }
    );
    amplitudeLogger(`${domene}.iarbsplaster.`, { formidlingsgruppe, servicegruppe, rettighetsgruppe });
};

export const gaTilDialog = (antall: number, servicegruppe: string | null) => {
    logEvent(
        'gatildialog',
        { antallField: antall, innsatsgruppeField: servicegruppe },
        { antallTag: antall, innsatsgruppeTag: servicegruppe }
    );
    amplitudeLogger(`${domene}.dialog.click`, { antall, servicegruppe });
};

export const gaTilDialogPermittert = (antall: number, servicegruppe: string | null) => {
    logEvent(
        'gatildialogpermittert',
        { antallField: antall, innsatsgruppeField: servicegruppe },
        { antallTag: antall, innsatsgruppeTag: servicegruppe }
    );
    amplitudeLogger(`${domene}.dialog.permittert.click`, { antall, servicegruppe });
};

export const antallUlesteDialoger = (antall: number) => {
    logEvent('antallulestedialoger', { antallField: antall }, { antallTag: antall });
};

export const seEgenvurdering = (foreslaattinnsatsgruppe: ForeslattInnsatsgruppe) => {
    logEvent('seegenvurdering', {}, { foreslaattInnsatsgruppe: foreslaattinnsatsgruppe });
    amplitudeLogger(`${domene}.egenvurdering.visning`, { foreslaattinnsatsgruppe });
};

export const gaTilEgenvurdering = (antallTimer: number, foreslaattinnsatsgruppe: ForeslattInnsatsgruppe) => {
    logEvent('gatilegenvurdering', { antallTimer: antallTimer }, { foreslaattInnsatsgruppe: foreslaattinnsatsgruppe });
    amplitudeLogger(`${domene}.egenvurdering.click`, { antallTimer, foreslaattinnsatsgruppe });
};

export const lesOmOkonomi = (stonad: string, servicegruppe: string | null) => {
    logEvent(
        'lesomokonomi',
        { stonadField: stonad, innsatsgruppeField: servicegruppe },
        { stonadTag: stonad, innsatsgruppeTag: servicegruppe }
    );
    amplitudeLogger(`${domene}.okonomi.click`, { stonad, servicegruppe });
};

type StandardMetrikkData = {
    servicegruppe: ServicegruppeOrNull;
    formidlingsgruppe: FormidlingsgruppeOrNull;
    rettighetsgruppe: string;
    dinSituasjon: string;
    underOppfolging: string;
    registreringType: RegistreringTypeOrIngenVerdi;
};

export const seDineOpplysninger = (metrikker: StandardMetrikkData) => {
    uniLogger('viser.dineopplysninger', metrikker);
};

interface KrrMetrikkData extends StandardMetrikkData {
    reservasjonKRR: string;
}

export const klikkPaDifiLenke = (metrikker: KrrMetrikkData) => {
    uniLogger('krr.difi.click', metrikker);
};

export const tellPoaGruppe = (amplitudeAktivitetsData: AmplitudeAktivitetsData) => {
    uniLogger('poagruppe', amplitudeAktivitetsData);
};

export const setIdentifyPoaGruppe = (gruppe: POAGruppe) => {
    setIdentifyProperty('poagruppe', gruppe);
};

export type AktivitetsMetrikkData = {
    aktivitet: string;
    gruppe: POAGruppe;
    geografiskTilknytning: string;
    isKSSX: string;
    ukerRegistrert: number;
};

export const loggAktivitet = (data: AktivitetsMetrikkData) => {
    amplitudeLogger(`${domene}.aktivitet`, data);
};
