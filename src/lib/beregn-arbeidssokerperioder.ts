import { Periode } from '../contexts/arbeidssokerperioder';

export interface BeregnedePerioder {
    harAktivArbeidssokerperiode: 'INGEN_DATA' | 'N/A' | 'Ja' | 'Nei';
    antallDagerSidenSisteArbeidssokerperiode: number | 'INGEN_DATA' | 'N/A';
    antallUkerSidenSisteArbeidssokerperiode: number | 'INGEN_DATA' | 'N/A';
    antallUkerMellomSisteArbeidssokerperioder: number | 'INGEN_DATA' | 'N/A';
}

interface Props {
    perioder: [] | Periode[] | null;
}

function sorterArbeidssokerperioderSisteForst(a: Periode, b: Periode) {
    return new Date(b.fraOgMedDato).getTime() - new Date(a.fraOgMedDato).getTime();
}

function sjekkOmHarAktivArbeidssokerperiode(perioder: Periode[]) {
    const sistePeriode = perioder[0];
    return sistePeriode.tilOgMedDato === null ? 'Ja' : 'Nei';
}

function beregnArbeidssokerperioder(props: Props): BeregnedePerioder {
    const { perioder } = props;

    if (perioder === null) {
        return {
            harAktivArbeidssokerperiode: 'INGEN_DATA',
            antallDagerSidenSisteArbeidssokerperiode: 'INGEN_DATA',
            antallUkerSidenSisteArbeidssokerperiode: 'INGEN_DATA',
            antallUkerMellomSisteArbeidssokerperioder: 'INGEN_DATA',
        };
    }

    if (perioder.length === 0) {
        return {
            harAktivArbeidssokerperiode: 'N/A',
            antallDagerSidenSisteArbeidssokerperiode: 'N/A',
            antallUkerSidenSisteArbeidssokerperiode: 'N/A',
            antallUkerMellomSisteArbeidssokerperioder: 'N/A',
        };
    }

    perioder.sort(sorterArbeidssokerperioderSisteForst);

    return {
        harAktivArbeidssokerperiode: sjekkOmHarAktivArbeidssokerperiode(perioder),
        antallDagerSidenSisteArbeidssokerperiode: 'INGEN_DATA',
        antallUkerSidenSisteArbeidssokerperiode: 'INGEN_DATA',
        antallUkerMellomSisteArbeidssokerperioder: 'INGEN_DATA',
    };
}

export default beregnArbeidssokerperioder;
