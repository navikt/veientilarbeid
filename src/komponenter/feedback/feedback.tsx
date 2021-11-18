import { useEffect, useState } from 'react';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import classNames from 'classnames';
import Popover from 'nav-frontend-popover';

import { useAmplitudeData } from '../../contexts/amplitude-context';
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useBrowserStorage } from '../../hooks/use-browserstorage';

import './feedback.less';

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
    const [visPopover, setVisPopover] = useState<HTMLElement | undefined>(undefined);
    const amplitudeData = useAmplitudeData();
    const featuretoggledata = useFeatureToggleData();

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
        if (feedback === 'nei') {
            const neiKnapp = document.getElementById('nei-knapp');
            setVisPopover(neiKnapp || undefined);
        } else {
            setVisPopover(undefined);
        }
    };

    const jaKnapp = classNames({
        valgt: valgt === 'ja',
        'feedback-knapp': true,
    });

    const neiKnapp = classNames({
        valgt: /nei/.test(valgt),
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
                    <button onClick={() => handleFeedback('nei')} className={neiKnapp} id="nei-knapp">
                        <Undertekst>Nei</Undertekst>
                    </button>
                    <Popover
                        id="popover-nei"
                        ankerEl={visPopover}
                        onRequestClose={() => setVisPopover(undefined)}
                        autoFokus={false}
                        tabIndex={-1}
                        utenPil
                    >
                        <Normaltekst className="feedback-utdyping">Hvorfor svarte du nei?</Normaltekst>
                        <ul className="feedback-grunner">
                            <li>
                                <button onClick={() => handleFeedback('nei - visste det fra før')}>
                                    Visste det fra før
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleFeedback('nei - forstår ikke innholdet')}>
                                    {' '}
                                    Forstår ikke innholdet
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleFeedback('nei - føles uvesentlig')}>
                                    {' '}
                                    Føles uvesentlig
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleFeedback('nei - andre grunner')}>Andre grunner</button>
                            </li>
                        </ul>
                    </Popover>
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
