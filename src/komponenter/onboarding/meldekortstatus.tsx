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
import { beregnDagerEtterFastsattMeldedag, beregnDagerTilInaktivering } from '../../utils/meldekort-utils';
import './meldekortstatus.less';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { Normaltekst } from 'nav-frontend-typografi';
import { hentIDag } from '../../utils/chrono';
import { datoUtenTid, plussDager, datoMedUkedag } from '../../utils/date-utils';

function Meldekortstatus() {
    const { data: meldekortData } = React.useContext(Meldekort.MeldekortContext);
    const { kanReaktiveres } = React.useContext(OppfolgingContext).data;

    if (!meldekortData || kanReaktiveres) return null;

    const iDag = datoUtenTid(hentIDag().toISOString());
    const dagerEtterFastsattMeldedag = beregnDagerEtterFastsattMeldedag(iDag, meldekortData);

    if (dagerEtterFastsattMeldedag === null) return null;

    const etterFoersteMeldedag = dagerEtterFastsattMeldedag > 0;

    const dagerTilInaktivering = beregnDagerTilInaktivering(dagerEtterFastsattMeldedag);
    const inaktiveringsDato = plussDager(iDag, dagerTilInaktivering);

    return (
        <div className={'onboarding-meldekortvarsel-container'}>
            {etterFoersteMeldedag ? (
                <MeldekortAdvarsel dagerEtterFastsattMeldedag={dagerEtterFastsattMeldedag} />
            ) : (
                <>
                    <Normaltekst>Du kan nå sende inn meldekort.</Normaltekst>
                    <Normaltekst>{`Fristen er ${datoMedUkedag(inaktiveringsDato)}, klokken 23.00.`}</Normaltekst>
                </>
            )}
        </div>
    );
}

export default Meldekortstatus;
