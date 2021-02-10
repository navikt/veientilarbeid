import { AmplitudeData, amplitudeLogger } from './amplitude-utils';

const domene = 'veientilarbeid';

export const lesOmOkonomi = (stonad: string, servicegruppe: string | null) => {
    amplitudeLogger(`${domene}.okonomi.click`, { stonad, servicegruppe });
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
