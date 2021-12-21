import { Alert, BodyShort, Link } from '@navikt/ds-react';

import { useBrukerinfoData } from '../../contexts/bruker-info';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { loggAktivitet } from '../../metrics/metrics';

const DAGPENGAR_OG_UTDANNING_URL = 'https://www.nav.no/arbeid/utdanning';

function DagpengerOgUtdanning() {
    const { rettighetsgruppe } = useBrukerinfoData();
    const amplitudeData = useAmplitudeData();
    const kanViseKomponent = rettighetsgruppe === 'DAGP';

    function onLinkClick() {
        loggAktivitet({ aktivitet: 'Går til Dagpengar og utdanning fra infoboksen', ...amplitudeData });
    }

    if (!kanViseKomponent) return null;

    return (
        <Alert variant="info" className="blokk-xs">
            <ErRendret loggTekst="Rendrer Dagpengar og utdanning" />
            <BodyShort className="blokk-xs">
                Mottek du dagpengar og skal ta utdanning eller opplæring i 2022, må du søke om å kombinere dagpengar og
                utdanning.
            </BodyShort>
            <BodyShort className="blokk-xs">
                Viss du har eit vedtak om at du kan kombinere dagpengar med utdanning eller opplæring fram til ein
                avtalt dato i 2022, eller seinare, treng du ikkje søke.
            </BodyShort>
            <BodyShort>
                <Link href={DAGPENGAR_OG_UTDANNING_URL} onClick={onLinkClick}>
                    Les meir om dagpengar og utdanning
                </Link>
            </BodyShort>
            <InViewport loggTekst="Dagpengar og utdanning i viewPort" />
        </Alert>
    );
}

export default DagpengerOgUtdanning;
