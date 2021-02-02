/**
 * Viser faresignal siste uken - viktigst
 *
 * dato for neste, dato for frist
 *
 * link til meldekort
 */

import React from 'react';
import MeldekortAdvarsel from './meldekort-advarsel';
import { Normaltekst } from 'nav-frontend-typografi';
import * as Meldekort from '../../ducks/meldekort';
import { datoUtenTid } from '../../utils/date-utils';
import beregnDagerEtterFastsattMeldedag from '../../utils/meldekort-dager-etter-meldedag';
import { OppfolgingContext } from '../../ducks/oppfolging';
import './meldekortstatus.less';

function Meldekortstatus() {
    const { data: meldekortData } = React.useContext(Meldekort.MeldekortContext);
    const { kanReaktiveres } = React.useContext(OppfolgingContext).data;

    if (!meldekortData || kanReaktiveres) return null;

    const iDag = datoUtenTid(new Date().toISOString());
    const dagerEtterFastsattMeldedag = beregnDagerEtterFastsattMeldedag(iDag, meldekortData);

    console.log(dagerEtterFastsattMeldedag);

    // Bare vis melding fra dag 1 (tirsdag) til dag 7 (mandag)
    if (dagerEtterFastsattMeldedag === null || dagerEtterFastsattMeldedag > 7 || dagerEtterFastsattMeldedag <= 0)
        return null;

    return (
        <div className={'meldekortvarsel-container'}>
            <MeldekortAdvarsel frister={dagerEtterFastsattMeldedag} />
            <Normaltekst>
                Det er innsending av meldekortet som opprettholder din status som arbeidssøker hos NAV.
            </Normaltekst>
            <Normaltekst>
                Opplysningene du oppgir i meldekortet brukes også til å beregne utbetalingen av dagpenger.
            </Normaltekst>
        </div>
    );
}

export default Meldekortstatus;
