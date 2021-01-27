/**
 * Vi nullstiller klokkeslettet hele vegen
 * Argumentet er at inaktiveringsbatchen kjøres 02:00 dagen etter siste frist (14 timer etter 12)
 */

const dagIms = 1000 * 60 * 60 * 24;

function getSisteFrist(datoStreng) {
    const fristDato = datoUtenTid(datoStreng);
    fristDato.setDate(fristDato.getDate() + 8);
    return fristDato;
}

function datoUtenTid(dato) {
    return new Date(dato.substr(0, 10));
}

function antallDagerOverFrist(iDag, meldekort) {
    const periodeSlutt = datoUtenTid(meldekort.meldeperiode.til);
    const dager = Math.floor((iDag - periodeSlutt) / dagIms);
    return dager;
}

function dagerFraPeriodeSlutt(iDag, meldekortHistorie) {
    if (!meldekortHistorie) {
        return null;
    }

    const dagerOverFristPerMeldekort = meldekortHistorie.meldekort
        .filter((meldekort) => !meldekort.mottattDato)
        .filter((meldekort) => datoUtenTid(meldekort.meldeperiode.kortKanSendesFra) <= iDag)
        .filter((meldekort) => getSisteFrist(meldekort.meldeperiode.til) >= iDag)
        .map((meldekort) => antallDagerOverFrist(iDag, meldekort));

    if (dagerOverFristPerMeldekort.length === 0) {
        return null;
    }
    const flestDagerOverFrist = dagerOverFristPerMeldekort.reduce((a, b) => Math.max(a, b));
    return flestDagerOverFrist;
}

export default dagerFraPeriodeSlutt;
