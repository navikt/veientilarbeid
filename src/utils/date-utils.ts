import virkedager from '@alheimsins/virkedager';

import { Sprak } from '../contexts/sprak';
import lagHentTekstForSprak from '../lib/lag-hent-tekst-for-sprak';

const msPerDoegn = 1000 * 60 * 60 * 24;
const DAGPENGER_SAKSBEHANDLINGSTID = 45;

export function datoUtenTid(dato: string) {
    return new Date(dato.substr(0, 10));
}

export function plussDager(dato: Date, antallDager: number) {
    const kopi = new Date(dato);
    kopi.setDate(kopi.getDate() + antallDager);
    return kopi;
}

export function foerstkommendeMandag(iDag: Date) {
    let foerstkommendeMandag = datoUtenTid(iDag.toISOString());

    do {
        foerstkommendeMandag.setUTCMilliseconds(foerstkommendeMandag.getUTCMilliseconds() + msPerDoegn);
    } while (foerstkommendeMandag.getDay() !== 1);
    return foerstkommendeMandag;
}

export function hentISOUke(datoMedTid: string) {
    const dato = datoUtenTid(datoMedTid);
    const dagIUken = dato.getUTCDay() || 7;
    dato.setUTCDate(dato.getUTCDate() + 4 - dagIUken);
    const foersteDatoIAaret = new Date(Date.UTC(dato.getUTCFullYear(), 0, 1));
    return Math.ceil(((dato.getTime() - foersteDatoIAaret.getTime()) / msPerDoegn + 1) / 7);
}

const norsk = {
    ukeDager: ['søndag', 'mandag', 'tirdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'],
    maneder: [
        'januar',
        'februar',
        'mars',
        'april',
        'mai',
        'juni',
        'juli',
        'august',
        'september',
        'oktober',
        'november',
        'desember',
    ],
};

const TEKSTER = {
    nb: norsk,
    nn: norsk,
    en: {
        ukeDager: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        maneder: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
    },
};
export function datoMedUkedag(dato: Date, sprak: Sprak = 'nb') {
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const dager = tekst('ukeDager');
    const maneder = tekst('maneder');
    return `${dager[dato.getDay()]} ${dato.getDate()}. ${maneder[dato.getMonth()]}`;
}

export const formaterDato = (dato: Date, sprak: Sprak = 'nb'): string => {
    const locale = sprak === 'en' ? 'en' : 'no';
    return new Date(dato).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const formaterDatoString = (dato: string, sprak: Sprak = 'nb'): string => {
    return formaterDato(new Date(dato), sprak);
};

export const datoForForventetSvar = (dato: Date) => {
    return new Date(virkedager(new Date(dato), DAGPENGER_SAKSBEHANDLINGSTID));
};

export const antallDagerSiden = (start: Date, slutt = new Date()) => {
    const ms = slutt.getTime() - start.getTime();
    const days = ms / msPerDoegn;
    return Math.floor(days);
};
