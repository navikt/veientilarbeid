import { Link, Heading, BodyShort, Button } from '@navikt/ds-react';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { settIBrowserStorage } from '../../utils/browserStorage-utils';
import { loggAktivitet } from '../../metrics/metrics';
import { behovsvurderingLenke } from '../../innhold/lenker';

export const INTRO_KEY_12UKER = '12uker-egenvurdering';

function EgenvurderingUke12() {
    const amplitudeData = useAmplitudeData();
    const { ukerRegistrert } = amplitudeData;

    function avslaarEgenvurdering() {
        settIBrowserStorage(INTRO_KEY_12UKER, Date.now().toString());
        loggAktivitet({ aktivitet: 'Avslår 12 ukers egenvurdering fra lenke', ...amplitudeData });
    }

    function sendTilEgenvurdering() {
        settIBrowserStorage(INTRO_KEY_12UKER, Date.now().toString());
        loggAktivitet({ aktivitet: 'Går til 12 ukers egenvurdering', ...amplitudeData });
        window.location.assign(`${behovsvurderingLenke}/hvilken-veiledning-trengs`);
    }

    return (
        <div>
            <Heading level="2" size="medium" className="blokk-xs">
                Du har vært registrert i {ukerRegistrert} uker
            </Heading>
            <div className="egenvurdering-wrapper blokk-xs">
                <div className="egenvurdering-innhold">
                    <BodyShort>
                        Har du fortsatt tro på at du greier å skaffe deg jobb på egenhånd, eller tenker du det er behov
                        for hjelp og støtte fra en veileder ved NAV-kontoret ditt?
                    </BodyShort>
                </div>
            </div>
            <div className="flex flex-column space-between">
                <Button variant="secondary" onClick={sendTilEgenvurdering} className="blokk-s">
                    Jeg ønsker hjelp
                </Button>
                <BodyShort>
                    <Link href="" onClick={avslaarEgenvurdering}>
                        Jeg klarer meg fint selv
                    </Link>
                </BodyShort>
            </div>
        </div>
    );
}

export default EgenvurderingUke12;
