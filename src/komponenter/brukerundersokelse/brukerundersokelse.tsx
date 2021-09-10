import React, { useState } from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { EksperimentId } from '../../eksperiment/eksperimenter';
import './brukerundersokelse.less';
import { hentFraBrowserStorage, settIBrowserStorage } from '../../utils/browserStorage-utils';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';

const KEY_VTA_BRUKERUNDERSOKELSE = 'vta-brukerundersokelse';
const sisteUndersokelseDato = '2021-09-09';
const undersokelseUrl = 'mailto:brukertest@nav.no?subject=Intervju%20dittNAV';

interface EndStateProps {
    avslaarBrukerundersokelse: (loggTekst: string) => void;
    sendTilBrukerundersokelse: (loggTekst: string) => void;
}

function Sluttkort(props: EndStateProps) {
    function handleAvslaaUndersokelseKnapp(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        props.avslaarBrukerundersokelse('Avslår brukerundersøkelse fra x-knapp');
    }

    function handleAvslaaUndersokelseLenke(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        props.avslaarBrukerundersokelse('Avslår brukerundersøkelse fra lenke');
    }

    function handleOnskerUndersokelseFraKnapp(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        props.sendTilBrukerundersokelse('Takker ja til brukerundersøkelse fra knapp');
    }

    function handleOnskerUndersokelseFraLenke(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        props.sendTilBrukerundersokelse('Takker ja til brukerundersøkelse fra lenke');
    }

    return (
        <div className={'sluttkort'}>
            <div className="p-1 flex space-between">
                <div>
                    <Element tag={'h1'}>BRUKERUNDERSØKELSE</Element>
                    <Systemtittel>Hjelp oss å bli bedre</Systemtittel>
                </div>
                <button className="brukerundersokelse-avslaa-knapp" onClick={handleAvslaaUndersokelseKnapp}>
                    X
                </button>
            </div>
            <div className="p-1">
                <div>
                    <Normaltekst className={'blokk-xs'}>
                        Kunne du tenkte deg å bli med på et intervju sånn at vi kan legge bedre til rette for at du skal
                        kunne klare deg selv som arbeidssøker?
                    </Normaltekst>
                    <Normaltekst>
                        Send en e-post til{' '}
                        <Lenke className="tracking-wide" href={''} onClick={handleOnskerUndersokelseFraLenke}>
                            brukertest@nav.no
                        </Lenke>{' '}
                        med emnet "Intervju dittNAV" så tar vi kontakt med mer informasjon de neste dagene.
                    </Normaltekst>
                </div>
            </div>
            <div className="flex flex-column space-between p-1">
                <Knapp onClick={handleOnskerUndersokelseFraKnapp} className="blokk-s">
                    Jeg kan hjelpe
                </Knapp>
                <Normaltekst>
                    <Lenke className="tracking-wide" href={''} onClick={handleAvslaaUndersokelseLenke}>
                        Nei takk
                    </Lenke>
                </Normaltekst>
            </div>
        </div>
    );
}

export function kanViseUndersokelse({
    ukerRegistrert,
    gruppe,
    eksperimenter,
    featureToggleAktiv,
    sistSettUndersokelse,
}: {
    ukerRegistrert: number | 'INGEN_DATO';
    gruppe: 'kss' | 'boo';
    eksperimenter: EksperimentId[];
    featureToggleAktiv: boolean;
    sistSettUndersokelse: number;
}): boolean {
    const erInnenfor0til11ukerRegistrert =
        ukerRegistrert !== 'INGEN_DATO' && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(ukerRegistrert);
    const deltarIeksperimentGruppen = eksperimenter.includes('onboarding14a');
    const erKSS = gruppe === 'kss';

    const viseUndersokelseIgjen =
        sistSettUndersokelse === 0 ? true : new Date(sisteUndersokelseDato).getTime() > sistSettUndersokelse;

    return (
        erInnenfor0til11ukerRegistrert &&
        deltarIeksperimentGruppen &&
        erKSS &&
        featureToggleAktiv &&
        viseUndersokelseIgjen
    );
}

function Brukerundersokelse() {
    const amplitudeData = React.useContext(AmplitudeContext);
    const { data: featuretoggleData } = React.useContext(FeaturetoggleContext);
    const { gruppe, ukerRegistrert, eksperimenter } = amplitudeData;
    const featureToggleAktiv = featuretoggleData['veientilarbeid.visbrukerundersokelse'];

    const sistSettUndersokelse = Number(hentFraBrowserStorage(KEY_VTA_BRUKERUNDERSOKELSE)) ?? 0;
    const [visKomponent, setVisKomponent] = useState(
        kanViseUndersokelse({
            gruppe,
            ukerRegistrert,
            eksperimenter,
            featureToggleAktiv,
            sistSettUndersokelse,
        })
    );

    function avslaarBrukerundersokelse(loggTekst: string) {
        settIBrowserStorage(KEY_VTA_BRUKERUNDERSOKELSE, Date.now().toString());
        loggAktivitet({ aktivitet: loggTekst, ...amplitudeData });
        setVisKomponent(false);
    }

    function sendTilBrukerundersokelse(loggTekst: string) {
        settIBrowserStorage(KEY_VTA_BRUKERUNDERSOKELSE, Date.now().toString());
        loggAktivitet({ aktivitet: loggTekst, ...amplitudeData });
        window.location.assign(undersokelseUrl);
    }

    if (!visKomponent) {
        return null;
    }

    const innhold = (
        <div className="brukerundersokelse-omslutning blokk-s">
            <Panel className={'brukerundersokelse-intro'} border>
                <div className={'overall-wrapper'}>
                    <Sluttkort
                        avslaarBrukerundersokelse={avslaarBrukerundersokelse}
                        sendTilBrukerundersokelse={sendTilBrukerundersokelse}
                    />
                </div>
            </Panel>
            <ErRendret loggTekst="Rendrer brukerundersøkelse" />
            <InViewport loggTekst="Viser brukerundersøkelse i viewport" />
        </div>
    );

    return innhold;
}

export default Brukerundersokelse;
