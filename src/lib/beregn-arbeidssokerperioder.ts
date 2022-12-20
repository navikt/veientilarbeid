import ukerFraDato from '@alheimsins/uker-fra-dato';

import dagerFraDato from '../utils/dager-fra-dato';
import { Periode } from '../contexts/arbeidssoker';

export interface BeregnedePerioder {
    harAktivArbeidssokerperiode: 'INGEN_DATA' | 'N/A' | 'Ja' | 'Nei';
    aktivPeriodeStart: 'INGEN_DATA' | 'N/A' | string | 'Ingen aktive perioder';
    antallDagerSidenSisteArbeidssokerperiode: number | 'Ikke avsluttet' | 'INGEN_DATA' | 'N/A';
    antallUkerSidenSisteArbeidssokerperiode: number | 'Ikke avsluttet' | 'INGEN_DATA' | 'N/A';
    antallUkerMellomSisteArbeidssokerperioder: number | 'INGEN_DATA' | 'N/A' | 'Første periode';
    forrigePeriodeAvsluttetDato: 'INGEN_DATA' | 'N/A' | string | 'Første periode';
}

interface Props {
    arbeidssokerperioder: [] | Periode[];
    status?: number;
}

function sorterArbeidssokerperioderSisteForst(a: Periode, b: Periode) {
    const delta = new Date(b.fraOgMedDato).getTime() - new Date(a.fraOgMedDato).getTime();
    if (delta === 0) {
        if (b.tilOgMedDato === null) {
            return 1;
        } else if (a.tilOgMedDato === null) {
            return -1;
        }
    }
    return delta;
}

function harAktivArbeidssokerperiode(perioder: Periode[]) {
    const sistePeriode = perioder[0];
    return sistePeriode.tilOgMedDato === null;
}

function beregnAntallDagerSidenSisteArbeidssokerperiode(dato: string) {
    return dagerFraDato(new Date(dato));
}

function beregnAntallUkerSidenSisteArbeidssokerperiode(dato: string) {
    return ukerFraDato(new Date(dato));
}

function beregnAntallUkerMellomSisteArbeidssokerperioder(perioder: Periode[]) {
    const sistePeriode = perioder[0];
    const nestSistePeriode = perioder[1];
    return ukerFraDato(new Date(nestSistePeriode?.tilOgMedDato || '2020-01-01'), new Date(sistePeriode.fraOgMedDato));
}

function hentForrigePeriodeAvsluttetDato(perioder: Periode[]) {
    const forrigePeriode = perioder[1] || {};
    return forrigePeriode.tilOgMedDato || 'Første periode';
}

function beregnArbeidssokerperioder(props: Props | null | undefined): BeregnedePerioder {
    const { arbeidssokerperioder } = props ? props : { arbeidssokerperioder: null };

    if (arbeidssokerperioder === null) {
        return {
            harAktivArbeidssokerperiode: 'INGEN_DATA',
            aktivPeriodeStart: 'INGEN_DATA',
            antallDagerSidenSisteArbeidssokerperiode: 'INGEN_DATA',
            antallUkerSidenSisteArbeidssokerperiode: 'INGEN_DATA',
            antallUkerMellomSisteArbeidssokerperioder: 'INGEN_DATA',
            forrigePeriodeAvsluttetDato: 'INGEN_DATA',
        };
    }

    if (arbeidssokerperioder.length === 0) {
        return {
            harAktivArbeidssokerperiode: 'N/A',
            aktivPeriodeStart: 'N/A',
            antallDagerSidenSisteArbeidssokerperiode: 'N/A',
            antallUkerSidenSisteArbeidssokerperiode: 'N/A',
            antallUkerMellomSisteArbeidssokerperioder: 'N/A',
            forrigePeriodeAvsluttetDato: 'N/A',
        };
    }

    arbeidssokerperioder.sort(sorterArbeidssokerperioderSisteForst);

    const aktivArbeidssokerperiode = harAktivArbeidssokerperiode(arbeidssokerperioder);
    const sluttDatoSistePeriode = arbeidssokerperioder[0].tilOgMedDato ?? '';
    const harMerEnnEnPeriode = arbeidssokerperioder.length > 1;

    return {
        harAktivArbeidssokerperiode: aktivArbeidssokerperiode ? 'Ja' : 'Nei',
        aktivPeriodeStart: aktivArbeidssokerperiode
            ? new Date(arbeidssokerperioder[0].fraOgMedDato).toISOString().substring(0, 10)
            : 'Ingen aktive perioder',
        antallDagerSidenSisteArbeidssokerperiode: aktivArbeidssokerperiode
            ? 'Ikke avsluttet'
            : beregnAntallDagerSidenSisteArbeidssokerperiode(sluttDatoSistePeriode),
        antallUkerSidenSisteArbeidssokerperiode: aktivArbeidssokerperiode
            ? 'Ikke avsluttet'
            : beregnAntallUkerSidenSisteArbeidssokerperiode(sluttDatoSistePeriode),
        antallUkerMellomSisteArbeidssokerperioder: harMerEnnEnPeriode
            ? beregnAntallUkerMellomSisteArbeidssokerperioder(arbeidssokerperioder)
            : 'Første periode',
        forrigePeriodeAvsluttetDato: harMerEnnEnPeriode
            ? hentForrigePeriodeAvsluttetDato(arbeidssokerperioder)
            : 'Første periode',
    };
}

export default beregnArbeidssokerperioder;
