import { Hovedknapp } from 'nav-frontend-knapper';
import { Next } from '@navikt/ds-icons/cjs';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';
import { behovsvurderingLenke } from '../../innhold/lenker';
import { settIBrowserStorage } from '../../utils/browserStorage-utils';
import Lenke from 'nav-frontend-lenker';
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
            <Systemtittel className={'blokk-xs'}>Hva trenger du for å komme i jobb?</Systemtittel>
            <Normaltekst className="blokk-s ">
                Du har krav på en skriftlig vurdering av behovet ditt for hjelp fra NAV. Derfor vil vi vite hva du selv
                mener.
            </Normaltekst>
            <Hovedknapp mini onClick={handleButtonClick} className="blokk-xs">
                <span>Svar her</span>
                <Next />
            </Hovedknapp>
            <Normaltekst className={'blokk-l'}>
                <Lenke className={'tracking-wide'} href={''} onClick={avslaarEgenvurdering}>
                    Jeg ønsker å klare meg selv
                </Lenke>
            </Normaltekst>
            <InViewport loggTekst="Viser egenvurdering i viewport på sluttkort" />
        </>
    );
};

export default EgenvurderingIVURD;
