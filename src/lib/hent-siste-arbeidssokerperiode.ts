import { ArbeidssokerperioderResponse, ArbeidssokerPeriode } from '../models/arbeidssokerperiode';

function sorterEtterSistAvsluttedePeriode(a: ArbeidssokerPeriode, b: ArbeidssokerPeriode) {
    return new Date(b.avsluttet.tidspunkt).getTime() - new Date(a.avsluttet.tidspunkt).getTime();
}

function hentSisteArbeidssokerPeriode(arbeidssokerperioder: ArbeidssokerperioderResponse): ArbeidssokerPeriode {
    // Hvis ingen perioder er registrert
    if (arbeidssokerperioder.length === 0) return {} as ArbeidssokerPeriode;
    // Hvis 1 periode er registrert
    if (arbeidssokerperioder.length === 1) return arbeidssokerperioder[0];
    // Hvis det finnes 1 åpen periode
    const aapneArbeidssokerperioder = arbeidssokerperioder.filter((periode) => !periode.avsluttet.kilde);
    if (aapneArbeidssokerperioder.length === 1) return aapneArbeidssokerperioder[0];
    // Returnerer sist avslutted periode
    return arbeidssokerperioder.sort(sorterEtterSistAvsluttedePeriode)[0];
}

export { hentSisteArbeidssokerPeriode };
