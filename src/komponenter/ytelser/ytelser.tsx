import { useContext } from 'react';
import * as Brukerregistrering from '../../ducks/brukerregistrering';
import * as Oppfolging from '../../ducks/oppfolging';
import * as BrukerInfo from '../../ducks/bruker-info';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';

import sjekkOmBrukerErStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import { erKSSBruker } from '../../lib/er-kss-bruker';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './ytelser.less';

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
        <div className={'ytelser-omslutning'}>
            <ErRendret loggTekst="Rendrer ytelser-kort" />
            <Panel className={'ytelser'}>
                <div className="overall-wrapper">
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
                                    'Går til STO fra ytelser-kort',
                                    'https://mininnboks.nav.no/sporsmal/skriv/ARBD'
                                )
                            }
                        >
                            skriv til oss
                        </Lenke>{' '}
                        eller{' '}
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
            </Panel>
            <InViewport loggTekst="Viser ytelser-kort i viewport" />
        </div>
    );
}

export default Ytelser;
