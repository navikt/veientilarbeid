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
import { OppfolgingContext } from '../../ducks/oppfolging';
import { Normaltekst } from 'nav-frontend-typografi';
import { hentIDag } from '../../utils/chrono';
import { datoUtenTid } from '../../utils/date-utils';

function Meldekortstatus() {
    const { data: meldekortData } = React.useContext(Meldekort.MeldekortContext);
    const { kanReaktiveres } = React.useContext(OppfolgingContext).data;

    const amplitudeData = React.useContext(AmplitudeContext);
    if (!meldekortData || kanReaktiveres) return null;

    const iDag = datoUtenTid(hentIDag().toISOString());
    const dagerEtterFastsattMeldedag = beregnDagerEtterFastsattMeldedag(iDag, meldekortData);

    // Bare vis melding fra dag 1 (tirsdag) til dag 7 (mandag)
    const mellomDag1Til7 =
        dagerEtterFastsattMeldedag !== null && dagerEtterFastsattMeldedag > 0 && dagerEtterFastsattMeldedag <= 7;
    const minstEttMeldekort = dagerEtterFastsattMeldedag !== null;
    const kanViseMeldekortstatus = minstEttMeldekort;

    if (!kanViseMeldekortstatus) return null;

    return (
        <div className={'onboarding-meldekortvarsel-container'}>
            {mellomDag1Til7 ? (
                <MeldekortAdvarsel
                    dagerEtterFastsattMeldedag={dagerEtterFastsattMeldedag}
                    amplitudeData={amplitudeData}
                />
            ) : (
                <>
                    <Normaltekst>Du kan nå sende inn meldekort.</Normaltekst>
                    <Normaltekst>{`Fristen er mandag, 1. mars, klokken 23:00.`}</Normaltekst>
                </>
            )}
        </div>
    );
}

export default Meldekortstatus;
