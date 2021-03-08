import React, { useEffect, useState } from 'react';
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import { useLocalStorage } from '../../hooks/use-localstorarge';

interface Props {
    id: string;
}

function Feedback({ id }: Props) {
    const [feedback, setFeedback] = useLocalStorage(`vis-${id}`, {
        updated: new Date(),
        valgt: '',
    });
    const [valgt, setValgt] = useState('');

    useEffect(() => {
        const { valgt } = feedback;
        setValgt(valgt);
    }, [feedback]);

    const handleFeedback = (feedback: string) => {
        amplitudeLogger(id, {
            feedback,
        });
        setFeedback({
            updated: new Date(),
            valgt: feedback,
        });
    };

    return (
        <>
            <div>Var dette nyttig informasjon?</div>
            <button onClick={() => handleFeedback('ja')} className={valgt}>
                Ja
            </button>
            <button onClick={() => handleFeedback('nei')} className={valgt}>
                Nei
            </button>
            <button onClick={() => handleFeedback('vet ikke')} className={valgt}>
                Vet ikke
            </button>
        </>
    );
}

export default Feedback;
