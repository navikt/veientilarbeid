import { Next } from '@navikt/ds-icons/cjs';
import { Heading, BodyShort, Button, Link } from '@navikt/ds-react';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';
import { behovsvurderingLenke } from '../../innhold/lenker';
import { settIBrowserStorage } from '../../utils/browserStorage-utils';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';

export const AVSLAATT_EGENVURDERING = 'egenvurdering-avslaatt';

const EgenvurderingIVURD = () => {
    const amplitudeData = useAmplitudeData();

    const handleButtonClick = () => {
        settIBrowserStorage(AVSLAATT_EGENVURDERING, Date.now().toString());
        loggAktivitet({ aktivitet: 'Går til egenvurdering fra sluttkort', ...amplitudeData });
        window.location.assign(behovsvurderingLenke);
    };

    function avslaarEgenvurdering() {
        settIBrowserStorage(AVSLAATT_EGENVURDERING, Date.now().toString());
        loggAktivitet({ aktivitet: 'Avslår egenvurdering fra sluttkort', ...amplitudeData });
    }

    return (
        <>
            <ErRendret loggTekst="Rendrer egenvurdering på sluttkort" />
            <Heading level="2" size="medium" className="blokk-xs">
                Hva trenger du for å komme i jobb?
            </Heading>
            <BodyShort className="blokk-s ">
                Du har krav på en skriftlig vurdering av behovet ditt for hjelp fra NAV. Derfor vil vi vite hva du selv
                mener.
            </BodyShort>
            <Button variant="primary" size="small" onClick={handleButtonClick} className="blokk-xs">
                <span>Svar her</span>
                <Next />
            </Button>
            <BodyShort className={'blokk-l'}>
                <Link href={''} onClick={avslaarEgenvurdering}>
                    Jeg ønsker å klare meg selv
                </Link>
            </BodyShort>
            <InViewport loggTekst="Viser egenvurdering i viewport på sluttkort" />
        </>
    );
};

export default EgenvurderingIVURD;
