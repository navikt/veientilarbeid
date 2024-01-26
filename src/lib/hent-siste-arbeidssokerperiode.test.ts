import { ArbeidssokerperioderResponse } from '../models/arbeidssokerperiode';
import { hentSisteArbeidssokerPeriode } from './hent-siste-arbeidssokerperiode';

describe('tester funksjonaliteten for hentSisteArbeidssokerPeriode', () => {
    test('returnerer tom periode ved tomt innhold', () => {
        const forventetPeriodeId = undefined;
        const { periodeId } = hentSisteArbeidssokerPeriode(arbeidssokerperioderTom);
        expect(periodeId).toBe(forventetPeriodeId);
    });

    test('returnerer perioden ved en periode', () => {
        const forventetPeriodeId = '1';
        const { periodeId } = hentSisteArbeidssokerPeriode(arbeidssokerperioderMedEnPeriode);
        expect(periodeId).toBe(forventetPeriodeId);
    });

    test('returnerer ikke avsluttet periode ved flere perioder', () => {
        const forventetPeriodeId = '3';
        const { periodeId } = hentSisteArbeidssokerPeriode(arbeidssokerperioderMedEnAapen);
        expect(periodeId).toBe(forventetPeriodeId);
    });

    test('returnerer sist avsluttetede periode ved alle perioder avslutet', () => {
        const forventetPeriodeId = '3';
        const { periodeId } = hentSisteArbeidssokerPeriode(arbeidssokerperioderMedKunAvsluttede);
        expect(periodeId).toBe(forventetPeriodeId);
    });
});

const arbeidssokerperioderTom = [] as ArbeidssokerperioderResponse;

const arbeidssokerperioderMedEnPeriode = [
    {
        periodeId: '1',
        startet: {
            tidspunkt: {},
            utfoertAv: {
                type: 'UKJENT_VERDI',
            },
            kilde: 'string',
            aarsak: 'string',
        },
        avsluttet: {
            tidspunkt: {},
            utfoertAv: {
                type: 'UKJENT_VERDI',
            },
            kilde: 'string',
            aarsak: 'string',
        },
    },
] as ArbeidssokerperioderResponse;

const arbeidssokerperioderMedEnAapen = [
    {
        periodeId: '1',
        startet: {
            tidspunkt: '2023-01-01',
            utfoertAv: {
                type: 'UKJENT_VERDI',
            },
            kilde: 'string',
            aarsak: 'string',
        },
        avsluttet: {
            tidspunkt: '2023-01-31',
            utfoertAv: {
                type: 'UKJENT_VERDI',
            },
            kilde: 'string',
            aarsak: 'string',
        },
    },
    {
        periodeId: '3',
        startet: {
            tidspunkt: '2024-01-01',
            utfoertAv: {
                type: 'UKJENT_VERDI',
            },
            kilde: 'string',
            aarsak: 'string',
        },
        avsluttet: {
            tidspunkt: {},
            utfoertAv: {
                type: 'UKJENT_VERDI',
            },
            kilde: '',
            aarsak: '',
        },
    },
    {
        periodeId: '2',
        startet: {
            tidspunkt: '2023-05-10',
            utfoertAv: {
                type: 'UKJENT_VERDI',
            },
            kilde: 'string',
            aarsak: 'string',
        },
        avsluttet: {
            tidspunkt: '2023-07-25',
            utfoertAv: {
                type: 'UKJENT_VERDI',
            },
            kilde: 'string',
            aarsak: 'string',
        },
    },
] as ArbeidssokerperioderResponse;

const arbeidssokerperioderMedKunAvsluttede = [
    {
        periodeId: '1',
        startet: {
            tidspunkt: '2023-01-15',
            utfoertAv: {
                type: 'UKJENT_VERDI',
            },
            kilde: 'string',
            aarsak: 'string',
        },
        avsluttet: {
            tidspunkt: '2023-03-07',
            utfoertAv: {
                type: 'UKJENT_VERDI',
            },
            kilde: 'string',
            aarsak: 'string',
        },
    },
    {
        periodeId: '3',
        startet: {
            tidspunkt: '2023-10-09',
            utfoertAv: {
                type: 'UKJENT_VERDI',
            },
            kilde: 'string',
            aarsak: 'string',
        },
        avsluttet: {
            tidspunkt: '2023-12-24',
            utfoertAv: {
                type: 'UKJENT_VERDI',
            },
            kilde: 'string',
            aarsak: 'string',
        },
    },
    {
        periodeId: '2',
        startet: {
            tidspunkt: '2023-05-17',
            utfoertAv: {
                type: 'UKJENT_VERDI',
            },
            kilde: 'string',
            aarsak: 'string',
        },
        avsluttet: {
            tidspunkt: '2023-08-23',
            utfoertAv: {
                type: 'UKJENT_VERDI',
            },
            kilde: 'string',
            aarsak: 'string',
        },
    },
] as ArbeidssokerperioderResponse;
