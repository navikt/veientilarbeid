import { AmplitudeData, amplitudeLogger } from './amplitude-utils';

const domene = 'veientilarbeid';

export const lesOmOkonomi = (stonad: string, servicegruppe: string | null) => {
    amplitudeLogger(`${domene}.okonomi.click`, { stonad, servicegruppe });
};

export type AktivitetsMetrikkData = {
    aktivitet: string;
};

export type AmplitudeStandardAktivitetsData = AktivitetsMetrikkData & AmplitudeData;

// Brukes for å beskrive aktiviteter brukeren utfører (målet man ønsker å oppnå med interaksjonen)
export const loggAktivitet = (data: AmplitudeStandardAktivitetsData) => {
    amplitudeLogger(`${domene}.aktivitet`, data);
};

export type VisningsMetrikkData = {
    viser: string;
};

export type AmplitudeStandardVisningsData = VisningsMetrikkData & AmplitudeData;

// Brukes for å beskrive hva brukerene ser i viewport
export const loggVisning = (data: AmplitudeStandardVisningsData) => {
    amplitudeLogger(`${domene}.visning`, data);
};

// Brukes for å beskrive hva brukerene ser i viewport
export const loggAiAVisning = (data: AmplitudeStandardVisningsData) => {
    amplitudeLogger(`aia.visning`, data);
};

export type RendringsMetrikkData = {
    rendrer: string;
};

export type AmplitudeStandardRendringsData = RendringsMetrikkData & AmplitudeData;

// Brukes når vi ønsker å indikere at noe er rendret, men ikke nødvendigvis sett av bruker
export const loggRendring = (data: AmplitudeStandardRendringsData) => {
    amplitudeLogger(`${domene}.rendring`, data);
};
