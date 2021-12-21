import { Alert, BodyShort, Link } from '@navikt/ds-react';

import { useBrukerinfoData } from '../../contexts/bruker-info';

function DagpengerOgUtdanning() {
    const { rettighetsgruppe } = useBrukerinfoData();
    const kanViseKomponent = rettighetsgruppe === 'DAGP';

    if (!kanViseKomponent) return null;

    return (
        <Alert variant="info" className="blokk-xs">
            <BodyShort className="blokk-xs">
                Mottek du dagpengar og skal ta utdanning eller opplæring i 2022, må du søke om å kombinere dagpengar og
                utdanning.
            </BodyShort>
            <BodyShort className="blokk-xs">
                Viss du har eit vedtak om at du kan kombinere dagpengar med utdanning eller opplæring fram til ein
                avtalt dato i 2022, eller seinare, treng du ikkje søke.
            </BodyShort>
            <BodyShort>
                <Link href="https://www.nav.no/arbeid/utdanning">Les meir om dagpengar og utdanning</Link>
            </BodyShort>
        </Alert>
    );
}

export default DagpengerOgUtdanning;
