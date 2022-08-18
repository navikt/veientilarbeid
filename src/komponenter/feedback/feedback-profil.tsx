import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { BodyShort, Detail, Popover } from '@navikt/ds-react';

import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useSprakValg } from '../../contexts/sprak';
import { useProfil } from '../../contexts/profil';

import { amplitudeLogger } from '../../metrics/amplitude-utils';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import './feedback.css';

const TEKSTER: Tekster<string> = {
    nb: {
        varDetteNyttig: 'Var dette nyttig å lese?',
        ja: 'Ja',
        nei: 'Nei',
        hvorforNei: 'Hvorfor svarte du nei?',
        gammeltNytt: 'Visste det fra før',
        forstodIkke: 'Forstår ikke innholdet',
        uviktig: 'Føles ikke viktig',
        andreGrunner: 'Andre grunner',
        vetIkke: 'Vet ikke',
    },
    en: {
        varDetteNyttig: 'Was this information useful?',
        ja: 'Yes',
        nei: 'No',
        hvorforNei: 'Why did you answer No?',
        gammeltNytt: 'I already knew this',
        forstodIkke: 'I did not understand it',
        uviktig: 'Felt unimportant',
        andreGrunner: 'Other reasons',
        vetIkke: 'Uncertain',
    },
};

interface Props {
    id: string;
    className?: string;
    sporsmal?: string;
}

function erOppdatertForOver12TimerSiden(dato: string): Boolean {
    if (!dato) return false;
    const iDag = new Date().getTime();
    const sistOppdatert = new Date(dato).getTime();
    return iDag - sistOppdatert > 43200000;
}

function Feedback({ id, className, sporsmal }: Props) {
    const { profil, lagreProfil } = useProfil();
    const [valgt, setValgt] = useState('');
    const [oppdatert, setOppdatert] = useState('');
    const [visPopover, setVisPopover] = useState<HTMLElement | undefined>(undefined);
    const amplitudeData = useAmplitudeData();
    const featuretoggledata = useFeatureToggleData();

    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    useEffect(() => {
        if (profil) {
            const { valgt, updated } = profil[id];
            setValgt(valgt || '');
            setOppdatert(updated || new Date().toISOString());
        }
    }, [profil]);

    if (!featuretoggledata['veientilarbeid.feedback']) return null;
    if (erOppdatertForOver12TimerSiden(oppdatert)) return null;

    const handleFeedback = (feedback: string) => {
        amplitudeLogger('veientilarbeid.feedback.intro', {
            kort: id,
            feedback,
            ...amplitudeData,
        });

        const brukerProfil = profil || {};
        const oppdatertFeedbackDato = new Date().toISOString();

        const oppdatertProfil = {
            ...brukerProfil,
            id: {
                updated: oppdatertFeedbackDato,
                valgt: feedback,
            },
        };

        lagreProfil(oppdatertProfil);
        setValgt(feedback);
        setOppdatert(oppdatertFeedbackDato);

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
            <div className={`${className ? className : ''} feedback-container`}>
                <Detail size="small" className="feedback-tittel">
                    {sporsmal ? sporsmal : tekst('varDetteNyttig')}
                </Detail>
                <div className={'valg'}>
                    <button onClick={() => handleFeedback('ja')} className={jaKnapp}>
                        <Detail size="small">{tekst('ja')}</Detail>
                    </button>
                    <span className="feedback-space" aria-hidden="true">
                        |
                    </span>
                    <button onClick={() => handleFeedback('nei')} className={neiKnapp} id="nei-knapp">
                        <Detail size="small">{tekst('nei')}</Detail>
                    </button>
                    <Popover
                        id="popover-nei"
                        anchorEl={visPopover || null}
                        onClose={() => setVisPopover(undefined)}
                        open={visPopover !== undefined}
                        tabIndex={-1}
                        arrow={false}
                    >
                        <BodyShort className="feedback-utdyping">{tekst('hvorforNei')}</BodyShort>
                        <ul className="feedback-grunner">
                            <li>
                                <button onClick={() => handleFeedback('nei - visste det fra før')}>
                                    {tekst('gammeltNytt')}
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleFeedback('nei - forstår ikke innholdet')}>
                                    {' '}
                                    {tekst('forstodIkke')}
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleFeedback('nei - føles ikke viktig')}>
                                    {' '}
                                    {tekst('uviktig')}
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleFeedback('nei - andre grunner')}>
                                    {tekst('andreGrunner')}
                                </button>
                            </li>
                        </ul>
                    </Popover>
                    <span className="feedback-space" aria-hidden="true">
                        |
                    </span>
                    <button onClick={() => handleFeedback('vet ikke')} className={vetIkkeKnapp}>
                        <Detail size="small">{tekst('vetIkke')}</Detail>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Feedback;
