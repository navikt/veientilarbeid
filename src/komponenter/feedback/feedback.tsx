import React, { useEffect, useState } from 'react';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import './feedback.less';
import { Undertekst } from 'nav-frontend-typografi';
import classNames from 'classnames';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';
import { useBrowserStorage } from '../../hooks/use-browserstorage';

interface Props {
    id?: string;
    className?: string;
}

function Feedback({ id, className }: Props) {
    const [feedback, setFeedback] = useBrowserStorage(`vta-feedback-intro-${id}`, {
        updated: new Date(),
        valgt: '',
    });
    const [valgt, setValgt] = useState('');
    const amplitudeData = React.useContext(AmplitudeContext);
    const { data: featuretoggledata } = React.useContext(FeaturetoggleContext);

    useEffect(() => {
        const { valgt } = feedback;
        setValgt(valgt);
    }, [feedback]);

    if (!id) return null;
    if (!featuretoggledata['veientilarbeid.feedback']) return null;

    const handleFeedback = (feedback: string) => {
        amplitudeLogger('veientilarbeid.feedback.intro', {
            kort: id,
            feedback,
            ...amplitudeData,
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
        <>
            <div className={`${className ? className : ''} feedback-container blokk-xs`}>
                <Undertekst className="feedback-tittel">Var dette nyttig å lese?</Undertekst>
                <div className={'valg'}>
                    <button onClick={() => handleFeedback('ja')} className={jaKnapp}>
                        <Undertekst>Ja</Undertekst>
                    </button>
                    <span className="feedback-space" aria-hidden="true">
                        |
                    </span>
                    <button onClick={() => handleFeedback('nei')} className={neiKnapp}>
                        <Undertekst>Nei</Undertekst>
                    </button>
                    <span className="feedback-space" aria-hidden="true">
                        |
                    </span>
                    <button onClick={() => handleFeedback('vet ikke')} className={vetIkkeKnapp}>
                        <Undertekst>Vet ikke</Undertekst>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Feedback;
