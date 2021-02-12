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
import { beregnDagerEtterFastsattMeldedag } from '../../utils/meldekort-dager-etter-meldedag';
import { OppfolgingContext } from '../../ducks/oppfolging';
import './meldekortstatus.less';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { BrukerInfoContext } from '../../ducks/bruker-info';

function Meldekortstatus({ iDag }: { iDag: Date }) {
    const { data: meldekortData } = React.useContext(Meldekort.MeldekortContext);
    const { kanReaktiveres } = React.useContext(OppfolgingContext).data;
    const { rettighetsgruppe } = React.useContext(BrukerInfoContext).data;
    const amplitudeData = React.useContext(AmplitudeContext);

    if (!meldekortData || kanReaktiveres) return null;

    const dagerEtterFastsattMeldedag = beregnDagerEtterFastsattMeldedag(iDag, meldekortData);

    const minstEttMeldekort = dagerEtterFastsattMeldedag !== null;
    const erDagpengerMottaker = rettighetsgruppe === 'DAGP';
    const mellomDag1Til7 = dagerEtterFastsattMeldedag > 0 && dagerEtterFastsattMeldedag <= 7; // Bare vis melding fra dag 1 (tirsdag) til dag 7 (mandag)
    const kanViseMeldekortstatus = minstEttMeldekort && erDagpengerMottaker && mellomDag1Til7;

    if (!kanViseMeldekortstatus) return null;

    return (
        <div className={'meldekortvarsel-container'}>
            <MeldekortAdvarsel dagerEtterFastsattMeldedag={dagerEtterFastsattMeldedag} amplitudeData={amplitudeData} />
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
