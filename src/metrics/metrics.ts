import { ForeslattInnsatsgruppe } from '../ducks/brukerregistrering';
import { FormidlingsgruppeOrNull, ServicegruppeOrNull } from '../ducks/oppfolging';
import { RegistreringTypeOrIngenVerdi } from '../ducks/bruker-info';
import { AmplitudeData, amplitudeLogger, setIdentifyProperty } from './amplitude-utils';
import { uniLogger } from './uni-logger';
import { POAGruppe } from '../utils/get-poa-group';

const domene = 'veientilarbeid';

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
    amplitudeLogger(`${domene}.nivaa3.visning`);
};

export const gaTilDialog = (antall: number, servicegruppe: string | null) => {
    amplitudeLogger(`${domene}.dialog.click`, { antall, servicegruppe });
};

export const gaTilDialogPermittert = (antall: number, servicegruppe: string | null) => {
    amplitudeLogger(`${domene}.dialog.permittert.click`, { antall, servicegruppe });
};

export const seEgenvurdering = (foreslaattinnsatsgruppe: ForeslattInnsatsgruppe) => {
    amplitudeLogger(`${domene}.egenvurdering.visning`, { foreslaattinnsatsgruppe });
};

export const gaTilEgenvurdering = (antallTimer: number, foreslaattinnsatsgruppe: ForeslattInnsatsgruppe) => {
    amplitudeLogger(`${domene}.egenvurdering.click`, { antallTimer, foreslaattinnsatsgruppe });
};

export const lesOmOkonomi = (stonad: string, servicegruppe: string | null) => {
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

export const tellPoaGruppe = (amplitudeData: AmplitudeData) => {
    uniLogger('poagruppe', amplitudeData);
};

export const setIdentifyPoaGruppe = (gruppe: POAGruppe) => {
    setIdentifyProperty('poagruppe', gruppe);
};

export type AktivitetsMetrikkData = {
    aktivitet: string;
};

export type AmplitudeStandardAktivitetsData = AktivitetsMetrikkData & AmplitudeData;

export const loggAktivitet = (data: AmplitudeStandardAktivitetsData) => {
    amplitudeLogger(`${domene}.aktivitet`, data);
};

export type VisningsMetrikkData = {
    viser: string;
};

export type AmplitudeStandardVisningsData = VisningsMetrikkData & AmplitudeData;

export const loggVisning = (data: AmplitudeStandardVisningsData) => {
    amplitudeLogger(`${domene}.visning`, data);
};
