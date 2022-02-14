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
import { OppfolgingContext } from '../../contexts/oppfolging';
import { Heading, BodyShort } from '@navikt/ds-react';
import { hentIDag } from '../../utils/chrono';
import { datoMedUkedag, datoUtenTid, plussDager } from '../../utils/date-utils';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

const TEKSTER = {
    nb: {
        heading: 'Du kan nå sende inn meldekort',
        fristenEr: 'Fristen er',
        klokken23: 'klokken 23.00.',
    },
    en: {
        heading: 'You may now submit the employment status form',
        fristenEr: 'The deadline is',
        klokken23: 'at 23:00.',
    },
};
function Meldekortstatus() {
    const { data: meldekortData } = useContext(Meldekort.MeldekortContext);
    const { kanReaktiveres } = useContext(OppfolgingContext).data;
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    if (!meldekortData || kanReaktiveres) return null;

    const iDag = datoUtenTid(hentIDag().toISOString());
    const dagerEtterFastsattMeldedag = beregnDagerEtterFastsattMeldedag(iDag, meldekortData);

    if (dagerEtterFastsattMeldedag === null) return null;

    const etterFoersteMeldedag = dagerEtterFastsattMeldedag > 0;

    const dagerTilInaktivering = beregnDagerTilInaktivering(dagerEtterFastsattMeldedag);
    const inaktiveringsDato = plussDager(iDag, dagerTilInaktivering);
    return (
        <div className={'blokk-xs'}>
            {etterFoersteMeldedag ? (
                <MeldekortAdvarsel dagerEtterFastsattMeldedag={dagerEtterFastsattMeldedag} />
            ) : (
                <>
                    <Heading size="medium" className="blokk-xs">
                        {tekst('heading')}
                    </Heading>
                    <BodyShort>{`${tekst('fristenEr')} ${datoMedUkedag(inaktiveringsDato, sprak)}, ${tekst(
                        'klokken23'
                    )}`}</BodyShort>
                </>
            )}
        </div>
    );
}

export default Meldekortstatus;
