/**
 * Viser faresignal siste uken - viktigst
 *
 * dato for neste, dato for frist
 *
 * link til meldekort
 */

import { useContext } from 'react';
import MeldekortAdvarsel from './meldekort-advarsel';
import * as Meldekort from '../../contexts/meldekort';
import { beregnDagerEtterFastsattMeldedag, beregnDagerTilInaktivering } from '../../utils/meldekort-utils';
import './meldekortstatus.less';
import { OppfolgingContext } from '../../contexts/oppfolging';
import { Heading, BodyShort } from '@navikt/ds-react';
import { hentIDag } from '../../utils/chrono';
import { datoMedUkedag, datoUtenTid, plussDager } from '../../utils/date-utils';

function Meldekortstatus() {
    const { data: meldekortData } = useContext(Meldekort.MeldekortContext);
    const { kanReaktiveres } = useContext(OppfolgingContext).data;

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
                    <Heading size="medium" className="blokk-xs">
                        Du kan nå sende inn meldekort
                    </Heading>
                    <BodyShort size="small">{`Fristen er ${datoMedUkedag(
                        inaktiveringsDato
                    )}, klokken 23.00.`}</BodyShort>
                </>
            )}
        </div>
    );
}

export default Meldekortstatus;
