import { FormidlingsgruppeOrNull, ServicegruppeOrNull } from '../ducks/oppfolging';
import { RegistreringTypeOrIngenVerdi } from '../ducks/bruker-info';
import { AmplitudeData, amplitudeLogger, setIdentifyProperty } from './amplitude-utils';
import { uniLogger } from './uni-logger';
import { POAGruppe } from '../utils/get-poa-group';

const domene = 'veientilarbeid';

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
