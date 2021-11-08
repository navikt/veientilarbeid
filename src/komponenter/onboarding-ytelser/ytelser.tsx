import { useContext } from 'react';
import * as Brukerregistrering from '../../contexts/brukerregistrering';
import * as Oppfolging from '../../contexts/oppfolging';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { FeaturetoggleContext } from '../../contexts/feature-toggles';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';

import Lenke from 'nav-frontend-lenker';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import OnboardingOmslutning from '../onboarding-omslutning/OnboardingOmslutning';
import { kanViseOnboardingYtelser } from '../../lib/kan-vise-ytelser';

function Ytelser() {
    const registreringData = Brukerregistrering.useBrukerregistreringData();
    const { data: oppfolgingData } = useContext(Oppfolging.OppfolgingContext);
    const { data: featuretoggleData } = useContext(FeaturetoggleContext);
    const brukerInfoData = useBrukerinfoData();
    const amplitudeData = useAmplitudeData();

    const kanViseKomponent = kanViseOnboardingYtelser({
        amplitudeData,
        featuretoggleData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
    });

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    if (!kanViseKomponent) return null;

    return (
        <OnboardingOmslutning title="Spørsmål om ytelser">
            <ErRendret loggTekst="Rendrer ytelser-kort" />
            <div className={'kortflate'}>
                <Systemtittel className={'blokk-xs'}>Har du spørsmål om å søke eller motta pengestøtte?</Systemtittel>
                <Normaltekst className={'blokk-xs'}>
                    Du kan stille spørsmål om ytelser via{' '}
                    <Lenke
                        href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                        onClick={() =>
                            loggLenkeKlikk(
                                'Går til STO fra ytelser-kort',
                                'https://mininnboks.nav.no/sporsmal/skriv/ARBD'
                            )
                        }
                    >
                        skriv til oss
                    </Lenke>{' '}
                    og{' '}
                    <Lenke
                        href="https://www.nav.no/person/kontakt-oss/chat/"
                        onClick={() =>
                            loggLenkeKlikk(
                                'Går til chat fra ytelser-kort',
                                'https://www.nav.no/person/kontakt-oss/chat/'
                            )
                        }
                    >
                        chat
                    </Lenke>
                    .
                </Normaltekst>
                <Normaltekst className={'blokk-m'}>
                    Du kan lese om livssituasjoner NAV kan hjelpe med på{' '}
                    <Lenke
                        href="https://www.nav.no/"
                        onClick={() => loggLenkeKlikk('Går til forsiden fra ytelse kort', 'https://www.nav.no/')}
                    >
                        forsiden
                    </Lenke>
                    {' '}av nav.no
                </Normaltekst>
            </div>
            <InViewport loggTekst="Viser ytelser-kort i viewport" />
        </OnboardingOmslutning>
    );
}

export default Ytelser;
