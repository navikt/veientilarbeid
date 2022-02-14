import * as React from 'react';
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { LinkPanel } from '@navikt/ds-react';

interface TemaLenkepanelProps {
    href: string;
    tittel: string;
    beskrivelse?: string;
    amplitudeTema: string;
    amplitudeTilstand?: string;
    amplitudeHandling: string;
}

const TemaLenkepanel: React.FC<TemaLenkepanelProps> = (props) => {
    const amplitudeData = useAmplitudeData();

    const handleClickInnsending = () => {
        amplitudeLogger('veientilarbeid.tema', {
            tema: props.amplitudeTema,
            tilstand: props.amplitudeTilstand,
            handling: props.amplitudeHandling,
            ...amplitudeData,
        });
    };

    return (
        <LinkPanel href={props.href} onClick={handleClickInnsending} className={'blokk-xs'}>
            <LinkPanel.Title>{props.tittel}</LinkPanel.Title>
            {props.beskrivelse && <LinkPanel.Description>{props.beskrivelse}</LinkPanel.Description>}
        </LinkPanel>
    );
};

export default TemaLenkepanel;
