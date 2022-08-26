import { useContext } from 'react';
import { Heading, BodyLong } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';

import MeldekortAdvarsel from './meldekort-advarsel';
import * as Meldekort from '../../contexts/meldekort';
import { beregnDagerEtterFastsattMeldedag, beregnDagerTilInaktivering } from '../../utils/meldekort-utils';
import { OppfolgingContext } from '../../contexts/oppfolging';
import { hentIDag } from '../../utils/chrono';
import { datoMedUkedag, datoUtenTid, plussDager } from '../../utils/date-utils';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';

const TEKSTER = {
    nb: {
        heading: 'Du kan nå sende inn meldekort',
        fristenEr: 'Siste frist er',
        klokken23: 'klokken 23.00.',
        sendIDag: 'Du bør sende inn meldekortet så fort som mulig',
    },
    en: {
        heading: 'You may now submit the employment status form',
        fristenEr: 'The deadline is',
        klokken23: 'at 23:00.',
        sendIDag: 'It is recommended to submit the employment status form as soon as possible',
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
        <div>
            {etterFoersteMeldedag ? (
                <MeldekortAdvarsel dagerEtterFastsattMeldedag={dagerEtterFastsattMeldedag} />
            ) : (
                <>
                    <Heading size="medium" className="blokk-xs">
                        {tekst('heading')}
                    </Heading>
                    <BodyLong className="blokk-xs">
                        {`${tekst('fristenEr')} ${datoMedUkedag(inaktiveringsDato, sprak)}, ${tekst('klokken23')}`}
                    </BodyLong>
                    <BodyLong>{tekst('sendIDag')}</BodyLong>
                </>
            )}
        </div>
    );
}

export default Meldekortstatus;
