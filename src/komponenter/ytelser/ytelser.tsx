import { useContext } from 'react';
import * as Brukerregistrering from '../../ducks/brukerregistrering';
import * as Oppfolging from '../../ducks/oppfolging';
import * as BrukerInfo from '../../ducks/bruker-info';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { amplitudeLogger } from '../../metrics/amplitude-utils';

import sjekkOmBrukerErStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import { erKSSBruker } from '../../lib/er-kss-bruker';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';

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
        amplitudeLogger('veientilarbeid.action', {
            action,
            ...amplitudeData,
        });
        window.location.assign(url);
    }

    if (!kanViseKomponent) return null;

    return (
        <div className={'ytelser-omslutning'}>
            <Panel className={'ytelser'} border>
                <Element tag={'h1'}>SPØRSMÅL OM YTELSER</Element>
                <Systemtittel className={'blokk-xs'}>
                    Har du spørsmål om å søke om eller motta pengestøtte fra NAV?
                </Systemtittel>
                <Normaltekst className={'blokk-xs'}>
                    Har du spørsmål om å søke eller motta ytelser fra NAV, må du bruke{' '}
                    <Lenke
                        href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                        onClick={() =>
                            loggLenkeKlikk(
                                'Går til STO fra ytelse kort',
                                'https://mininnboks.nav.no/sporsmal/skriv/ARBD'
                            )
                        }
                    >
                        «Skriv til oss»
                    </Lenke>{' '}
                    eller{' '}
                    <Lenke
                        href="https://www.nav.no/person/kontakt-oss/chat/"
                        onClick={() =>
                            loggLenkeKlikk(
                                'Går til Chat fra ytelse kort',
                                'https://www.nav.no/person/kontakt-oss/chat/'
                            )
                        }
                    >
                        «Chat»
                    </Lenke>
                    .
                </Normaltekst>
                <Normaltekst className={'blokk-m'}>
                    Du kan lese om livssituasjoner NAV kan hjelpe med på{' '}
                    <Lenke
                        href="https://www.nav.no/"
                        onClick={() => loggLenkeKlikk('Går til forsiden fra ytelse kort', 'https://www.nav.no/')}
                    >
                        forsiden{' '}
                    </Lenke>
                    av nav.no
                </Normaltekst>
            </Panel>
        </div>
    );
}

export default Ytelser;
