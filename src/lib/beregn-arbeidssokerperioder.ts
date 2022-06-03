import { Periode } from '../contexts/arbeidssokerperioder';
import dagerFraDato from '../utils/dager-fra-dato';
import ukerFraDato from '../utils/uker-fra-dato';

export interface BeregnedePerioder {
    harAktivArbeidssokerperiode: 'INGEN_DATA' | 'N/A' | 'Ja' | 'Nei';
    antallDagerSidenSisteArbeidssokerperiode: number | 'Ikke avsluttet' | 'INGEN_DATA' | 'N/A';
    antallUkerSidenSisteArbeidssokerperiode: number | 'Ikke avsluttet' | 'INGEN_DATA' | 'N/A';
    antallUkerMellomSisteArbeidssokerperioder: number | 'INGEN_DATA' | 'N/A';
}

interface Props {
    perioder: [] | Periode[] | null;
}

function sorterArbeidssokerperioderSisteForst(a: Periode, b: Periode) {
    return new Date(b.fraOgMedDato).getTime() - new Date(a.fraOgMedDato).getTime();
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

    const aktivArbeidssokerperiode = harAktivArbeidssokerperiode(perioder);
    const sluttDatoSistePeriode = perioder[0].tilOgMedDato ?? '';

    // @ts-ignore
    return {
        harAktivArbeidssokerperiode: aktivArbeidssokerperiode ? 'Ja' : 'Nei',
        antallDagerSidenSisteArbeidssokerperiode: aktivArbeidssokerperiode
            ? 'Ikke avsluttet'
            : beregnAntallDagerSidenSisteArbeidssokerperiode(sluttDatoSistePeriode),
        antallUkerSidenSisteArbeidssokerperiode: aktivArbeidssokerperiode
            ? 'Ikke avsluttet'
            : beregnAntallUkerSidenSisteArbeidssokerperiode(sluttDatoSistePeriode),
        antallUkerMellomSisteArbeidssokerperioder: 'INGEN_DATA',
    };
}

export default beregnArbeidssokerperioder;
