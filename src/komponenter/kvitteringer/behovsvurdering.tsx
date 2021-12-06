import { useEffect } from 'react';
import * as React from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import './behovsvurdering.less';
import { SuccessFilled } from '@navikt/ds-icons';
import { Knapp } from 'nav-frontend-knapper';
import { settIBrowserStorage } from '../../utils/browserStorage-utils';
import { fjernQueryParam } from '../../utils/query-param-utils';

export const HAR_MOTTATT_EGENVURDERING_KVITTERING = 'har_mottatt_egenvurdering_kvittering';

interface EndStateProps {
    lukkerKvittering: (loggTekst: string) => void;
    kvittering?: string;
}

function Sluttkort(props: EndStateProps) {
    const svarerJa = props.kvittering && props.kvittering === 'behovsvurderingJa';

    function handleLukkeKvitteringKnapp(event: React.SyntheticEvent, fraKnapp: string) {
        event.preventDefault();
        event.stopPropagation();
        props.lukkerKvittering(`Lukker kvittering fra behovsvurderingen: ${fraKnapp}`);
    }

    useEffect(() => {
        settIBrowserStorage(HAR_MOTTATT_EGENVURDERING_KVITTERING, 'true');
    }, []);

    return (
        <div className={'sluttkort'}>
            <div className="p-1 flex space-between">
                <div>
                    <Element tag={'h1'} className="p-1">
                        Egenvurdering
                    </Element>
                    <div className={'behovsvurdering-kort'}>
                        <div className="flex behovsvurdering-header">
                            <Systemtittel>
                                <SuccessFilled color="currentColor" className={'mr-05 nav-oransje'} />
                                Svaret ditt er delt med din veileder
                            </Systemtittel>{' '}
                            <button
                                className="behovsvurdering-lukk-knapp"
                                onClick={(e) => handleLukkeKvitteringKnapp(e, 'kryss-knapp')}
                            >
                                X
                            </button>
                        </div>
                        {svarerJa && (
                            <div className="behovsvurdering-innhold">
                                <Normaltekst>Du får svar i løpet av noen dager.</Normaltekst>
                            </div>
                        )}
                        <div className="behovsvurdering-innhold">
                            <Knapp onClick={(e) => handleLukkeKvitteringKnapp(e, 'ok-knapp')}>Ok</Knapp>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Kvittering({ kvittering, onClose }: { kvittering?: string; onClose: () => void }) {
    const amplitudeData = useAmplitudeData();

    function lukkerKvittering(loggTekst: string) {
        loggAktivitet({ aktivitet: loggTekst, ...amplitudeData });
        fjernQueryParam('visKvittering');
        onClose();
    }

    return (
        <div className="behovsvurdering-omslutning blokk-s">
            <Panel className={'behovsvurdering-intro'} border>
                <div className={'overall-wrapper'}>
                    <Sluttkort lukkerKvittering={lukkerKvittering} kvittering={kvittering} />
                </div>
            </Panel>
            <ErRendret loggTekst="Rendrer kvittering behovsundersøkelse" />
            <InViewport loggTekst="Viser kvittering behovsundersøkelse i viewport" />
        </div>
    );
}

export default Kvittering;
