/**
 * Viser faresignal siste uken - viktigst
 *
 * dato for neste, dato for frist
 *
 * link til meldekort
 */

import React from 'react';
import MeldekortAdvarsel from './meldekort-advarsel';
import * as Meldekort from '../../ducks/meldekort';
import { beregnDagerEtterFastsattMeldedag } from '../../utils/meldekort-utils';
import './meldekortstatus.less';
import { AmplitudeContext } from '../../ducks/amplitude-context';

function Meldekortstatus({ iDag }: { iDag: Date }) {
    const { data: meldekortData } = React.useContext(Meldekort.MeldekortContext);

    const amplitudeData = React.useContext(AmplitudeContext);

    const dagerEtterFastsattMeldedag = beregnDagerEtterFastsattMeldedag(iDag, meldekortData);

    // Bare vis melding fra dag 1 (tirsdag) til dag 7 (mandag)
    const mellomDag1Til7 =
        dagerEtterFastsattMeldedag !== null && dagerEtterFastsattMeldedag > 0 && dagerEtterFastsattMeldedag <= 7;
    const minstEttMeldekort = dagerEtterFastsattMeldedag !== null;
    const kanViseMeldekortstatus = minstEttMeldekort && mellomDag1Til7;

    if (!kanViseMeldekortstatus) return null;

    return (
        <div className={'meldekortvarsel-container'}>
            <MeldekortAdvarsel dagerEtterFastsattMeldedag={dagerEtterFastsattMeldedag} amplitudeData={amplitudeData} />
        </div>
    );
}

export default Meldekortstatus;
