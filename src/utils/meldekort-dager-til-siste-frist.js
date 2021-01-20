/**
 * Vi nullstiller klokkeslettet hele vegen
 * Argumentet er at inaktiveringsbatchen kjøres 02:00 dagen etter siste frist (14 timer etter 12)
 */

const dagIms = 1000 * 3600 * 24;

function arrify(input) {
  if (!input) {
    return [];
  } else {
    return Array.isArray(input) ? input : [input];
  }
}

function getSisteFrist(datoStreng) {
  const dato = new Date(datoStreng);
  return dato.setDate(dato.getDate() + 8);
}

function dagerFraPeriodeSlutt(meldekortHistorie) {
  const iDag = new Date(new Date("2021-02-08").toISOString().substr(0, 10));
  let dager = null;
  if (meldekortHistorie) {
    const muligeMeldekort = arrify(meldekortHistorie.meldekort)
      .filter((meldekort) => !meldekort.mottattDato)
      .filter((meldekort) => new Date(meldekort.meldeperiode.kortKanSendesFra.substr(0, 10)) <= iDag)
      .filter((meldekort) => getSisteFrist(meldekort.meldeperiode.til.substr(0, 10)) >= iDag);
    if (muligeMeldekort.length === 1) {
      const meldekort = muligeMeldekort[0];
      const periodeSlutt = new Date(meldekort.meldeperiode.til.substr(0, 10));
      dager = Math.floor((iDag - periodeSlutt) / dagIms);
    }
  }
  return dager;
}

export default dagerFraPeriodeSlutt;
