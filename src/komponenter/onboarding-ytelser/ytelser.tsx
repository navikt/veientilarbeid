import { useContext } from 'react';
import * as Brukerregistrering from '../../contexts/brukerregistrering';
import * as Oppfolging from '../../contexts/oppfolging';
import * as BrukerInfo from '../../contexts/bruker-info';
import { FeaturetoggleContext } from '../../contexts/feature-toggles';
import { AmplitudeContext } from '../../contexts/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';

import sjekkOmBrukerErStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import { erKSSBruker } from '../../lib/er-kss-bruker';
import Lenke from 'nav-frontend-lenker';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import OnboardingOmslutning from '../onboarding-omslutning/OnboardingOmslutning';

function Ytelser() {
    const { data: registreringData } = useContext(Brukerregistrering.BrukerregistreringContext);
    const { data: oppfolgingData } = useContext(Oppfolging.OppfolgingContext);
    const { data: featuretoggleData } = useContext(FeaturetoggleContext);
    const { data: brukerInfoData } = useContext(BrukerInfo.BrukerInfoContext);
    const amplitudeData = useContext(AmplitudeContext);
    const brukerregistreringData = registreringData?.registrering ?? null;
    const erStandardInnsatsgruppe = sjekkOmBrukerErStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData });
    const erDetteKSSBruker = erKSSBruker({
        amplitudeData,
        featuretoggleData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
    });
    const kanViseKomponent = erStandardInnsatsgruppe && !erDetteKSSBruker;

    function loggLenkeKlikk(action: string, url: string) {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
        window.location.assign(url);
    }

    if (!kanViseKomponent) return null;

    return (
        <OnboardingOmslutning title="SPØRSMÅL OM YTELSER">
            <ErRendret loggTekst="Rendrer ytelser-kort" />
            <Systemtittel className={'blokk-xs'}>
                Har du spørsmål om å søke om eller motta pengestøtte fra NAV?
            </Systemtittel>
            <Normaltekst className={'blokk-xs'}>
                Har du spørsmål om å søke eller motta ytelser fra NAV, må du bruke{' '}
                <Lenke
                    href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                    onClick={() =>
                        loggLenkeKlikk('Går til STO fra ytelser-kort', 'https://mininnboks.nav.no/sporsmal/skriv/ARBD')
                    }
                >
                    skriv til oss
                </Lenke>{' '}
                eller{' '}
                <Lenke
                    href="https://www.nav.no/person/kontakt-oss/chat/"
                    onClick={() =>
                        loggLenkeKlikk('Går til chat fra ytelser-kort', 'https://www.nav.no/person/kontakt-oss/chat/')
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
            <InViewport loggTekst="Viser ytelser-kort i viewport" />
        </OnboardingOmslutning>
    );
}

export default Ytelser;
