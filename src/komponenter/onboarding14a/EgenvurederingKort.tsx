import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';
import OnboardingOmslutning from '../onboarding-omslutning/OnboardingOmslutning';
import { behovsvurderingLenke } from '../../innhold/lenker';

const EgenvurederingKort = () => {
    const amplitudeData = useAmplitudeData();

    const handleButtonClick = () => {
        loggAktivitet({ aktivitet: 'Går til egenvurdering', ...amplitudeData });
        window.location.assign(behovsvurderingLenke);
    };

    return (
        <OnboardingOmslutning title="Egenvurdering">
            <Systemtittel className={'blokk-xs'}>Hva trenger du for å komme i jobb?</Systemtittel>
            <Normaltekst className="blokk-s ">
                Du har krav på en skriftlig vurdering av behovet ditt for hjelp fra NAV. Derfor vil vi vite hva du selv
                mener.
            </Normaltekst>
            <Hovedknapp onClick={handleButtonClick} className="blokk-xs">
                Svar her
            </Hovedknapp>
        </OnboardingOmslutning>
    );
};

export default EgenvurederingKort;
