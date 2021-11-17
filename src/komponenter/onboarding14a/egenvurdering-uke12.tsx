import { Knapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
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
            <div className="flex space-between">
                <div>
                    <Systemtittel className={'blokk-xs'}>Du har vært registrert i {ukerRegistrert} uker</Systemtittel>
                </div>
            </div>
            <div className="egenvurdering-wrapper blokk-xs">
                <div className="egenvurdering-innhold">
                    <Normaltekst>
                        Har du fortsatt tro på at du greier å skaffe deg jobb på egenhånd, eller tenker du det er behov
                        for hjelp og støtte fra en veileder ved NAV-kontoret ditt?
                    </Normaltekst>
                </div>
            </div>
            <div className="flex flex-column space-between">
                <Knapp onClick={sendTilEgenvurdering} className="blokk-s">
                    Jeg ønsker hjelp
                </Knapp>
                <Normaltekst>
                    <Lenke className="tracking-wide" href={''} onClick={avslaarEgenvurdering}>
                        Jeg klarer meg fint selv
                    </Lenke>
                </Normaltekst>
            </div>
        </div>
    );
}

export default EgenvurderingUke12;
