import React, { useEffect, useState } from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import './behovsvurdering.less';

interface EndStateProps {
    lukkerKvittering: (loggTekst: string) => void;
    kvittering?: string;
}

function Sluttkort(props: EndStateProps) {
    const svarerJa = props.kvittering && props.kvittering === 'behovsvurderingJa';
    function handleLukkeKvitteringKnapp(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        props.lukkerKvittering('Lukker kvittering fra behovsvurderingen');
    }

    return (
        <div className={'sluttkort'}>
            <div className="p-1 flex space-between">
                <div>
                    <Element tag={'h1'}>Oppfølging</Element>
                    <Systemtittel>Egenvurdering</Systemtittel>
                </div>
                <button className="brukerundersokelse-avslaa-knapp" onClick={handleLukkeKvitteringKnapp}>
                    X
                </button>
            </div>
            <div className="p-1">
                <div>
                    <Normaltekst className={'blokk-xs'}>Svaret ditt er delt med veileder</Normaltekst>
                    {svarerJa && <Normaltekst>Du får svar i løpet av noen dager</Normaltekst>}
                </div>
            </div>
        </div>
    );
}

function Kvittering({ kvittering }: { kvittering?: string }) {
    const amplitudeData = React.useContext(AmplitudeContext);
    const [visKomponent, setVisKomponent] = useState(false);

    useEffect(() => {
        if (kvittering && kvittering.length > 0) {
            setVisKomponent(true);
        }
    }, [kvittering]);

    function lukkerKvittering(loggTekst: string) {
        loggAktivitet({ aktivitet: loggTekst, ...amplitudeData });
        setVisKomponent(false);
    }

    if (!visKomponent) {
        return null;
    }

    const innhold = (
        <div className="brukerundersokelse-omslutning blokk-s">
            <Panel className={'brukerundersokelse-intro'} border>
                <div className={'overall-wrapper'}>
                    <Sluttkort lukkerKvittering={lukkerKvittering} kvittering={kvittering} />
                </div>
            </Panel>
            <ErRendret loggTekst="Rendrer kvittering behovsundersøkelse" />
            <InViewport loggTekst="Viser kvittering behovsundersøkelse i viewport" />
        </div>
    );

    return innhold;
}

export default Kvittering;
