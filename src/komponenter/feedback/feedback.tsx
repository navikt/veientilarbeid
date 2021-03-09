import React, { useEffect, useState } from 'react';
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import { useLocalStorage } from '../../hooks/use-localstorarge';
import './feedback.less';
import { Undertekst } from 'nav-frontend-typografi';
import classNames from 'classnames';

interface Props {
    id: string;
}

function Feedback({ id }: Props) {
    const [feedback, setFeedback] = useLocalStorage(`vis-${id}`, {
        updated: new Date(),
        valgt: '',
    });
    // @ts-ignore
    const [valgt, setValgt] = useState('');

    useEffect(() => {
        const { valgt } = feedback;
        setValgt(valgt);
    }, [feedback]);

    const handleFeedback = (feedback: string) => {
        amplitudeLogger('veientilarbeid.intro.feedback', {
            kort: id,
            feedback,
        });
        setFeedback({
            updated: new Date(),
            valgt: feedback,
        });
    };

    const jaKnapp = classNames({
        valgt: valgt === 'ja',
        'feedback-knapp': true,
    });
    const neiKnapp = classNames({
        valgt: valgt === 'nei',
        'feedback-knapp': true,
    });
    const vetIkkeKnapp = classNames({
        valgt: valgt === 'vet ikke',
        'feedback-knapp': true,
    });

    return (
        <div className={'feedback-container'}>
            <Undertekst className={'feedback-tittel'}>Var dette nyttig informasjon?</Undertekst>
            <div className={'valg'}>
                <button onClick={() => handleFeedback('ja')} className={jaKnapp}>
                    <Undertekst>Ja</Undertekst>
                </button>
                <button onClick={() => handleFeedback('nei')} className={neiKnapp}>
                    <Undertekst>Nei</Undertekst>
                </button>
                <button onClick={() => handleFeedback('vet ikke')} className={vetIkkeKnapp}>
                    <Undertekst>Vet ikke</Undertekst>
                </button>
            </div>
        </div>
    );
}

export default Feedback;
