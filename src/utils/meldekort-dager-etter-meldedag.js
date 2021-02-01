/**
 * Vi nullstiller klokkeslettet hele vegen
 * Argumentet er at inaktiveringsbatchen kjøres 02:00 dagen etter siste frist (14 timer etter 12)
 */

import { datoUtenTid } from './date-utils';

const dagIms = 1000 * 60 * 60 * 24;
const dagerIMeldeperiode = 14;

function plussDager(dato, antallDager) {
    const kopi = new Date(dato);
    kopi.setDate(kopi.getDate() + antallDager);
    return kopi;
}

function antallDagerMellom(startDato, sluttDato) {
    const ms = Math.abs(sluttDato.getTime() - startDato.getTime());
    return Math.round(ms / dagIms); // Avrunding for å ta hensyn til sommer/vintertid
}

function fastsattMeldedagForMeldekort(meldekort) {
    // Fastsatt meldedag er mandag, og siste dag i perioden er søndag
    const sisteDagIPeriode = datoUtenTid(meldekort.meldeperiode.til);
    return plussDager(sisteDagIPeriode, 1);
}

function foersteSendedagForMeldekort(meldekort) {
    // Meldekort kan sendes fra lørdag, to dager før fastsatt meldedag (mandag)
    return datoUtenTid(meldekort.meldeperiode.kortKanSendesFra);
}

function sisteDagFoerNesteMeldekortsFoersteSendedag(meldekort) {
    const foersteSendedag = foersteSendedagForMeldekort(meldekort); // Lørdag (dag -2)
    const fastsattMeldedag = fastsattMeldedagForMeldekort(meldekort); // Mandag (dag 0)

    const dagerFraSendedagTilMeldedag = antallDagerMellom(foersteSendedag, fastsattMeldedag); // 2
    const antallDagerFraMeldedagTilNesteSendedag = dagerIMeldeperiode - dagerFraSendedagTilMeldedag; // 12

    const nesteMeldekortsSendedag = plussDager(fastsattMeldedag, antallDagerFraMeldedagTilNesteSendedag);
    const sisteDag = plussDager(nesteMeldekortsSendedag, -1); // Fredag (dag 11)
    return sisteDag;
}

function antallDagerEtterFastsattMeldedag(iDag, meldekort) {
    const fastsattMeldedag = fastsattMeldedagForMeldekort(meldekort);
    const antallDager = antallDagerMellom(iDag, fastsattMeldedag);

    if (iDag < fastsattMeldedag) {
        return -antallDager;
    }
    return antallDager;
}

function harBrukerLevertMeldekort(meldekort) {
    return !!meldekort.mottattDato;
}

function beregnDagerEtterFastsattMeldedag(iDag, meldekortHistorie) {
    if (!meldekortHistorie) {
        return null;
    }

    const antallDagerEtterFastsattMeldedagPerMeldekort = meldekortHistorie.meldekort
        .filter((meldekort) => !harBrukerLevertMeldekort(meldekort))
        .filter((meldekort) => foersteSendedagForMeldekort(meldekort) <= iDag)
        .filter((meldekort) => sisteDagFoerNesteMeldekortsFoersteSendedag(meldekort) >= iDag)
        .map((meldekort) => antallDagerEtterFastsattMeldedag(iDag, meldekort));

    if (antallDagerEtterFastsattMeldedagPerMeldekort.length === 0) {
        return null;
    }
    const flestAntallDager = antallDagerEtterFastsattMeldedagPerMeldekort.reduce((a, b) => Math.max(a, b));
    return flestAntallDager;
}

export default beregnDagerEtterFastsattMeldedag;
