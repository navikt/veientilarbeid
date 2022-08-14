import * as React from 'react';
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { Button } from '@navikt/ds-react';
import { Next } from '@navikt/ds-icons';

interface TemaLenkepanelProps {
    href: string;
    tittel: string;
    amplitudeTema: string;
    amplitudeTilstand?: string;
    amplitudeHandling: string;
    variant: 'primary' | 'secondary';
}

const MeldekortKnapp: React.FC<TemaLenkepanelProps> = (props) => {
    const amplitudeData = useAmplitudeData();

    const handleClickInnsending = () => {
        amplitudeLogger('veientilarbeid.tema', {
            tema: props.amplitudeTema,
            tilstand: props.amplitudeTilstand,
            handling: props.amplitudeHandling,
            ...amplitudeData,
        });
        window.location.href = props.href;
    };

    return (
        <Button variant={props.variant} onClick={handleClickInnsending} className="mb-1 mt-1">
            {props.tittel} <Next />
        </Button>
    );
};

export default MeldekortKnapp;