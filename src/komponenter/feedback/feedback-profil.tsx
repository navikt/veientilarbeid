import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { BodyShort, Detail, Popover } from '@navikt/ds-react';
import { nanoid } from 'nanoid';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useSprakValg } from '../../contexts/sprak';
import { useProfil } from '../../contexts/profil';

import { amplitudeLogger } from '../../metrics/amplitude-utils';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import styles from './feedback.module.css';
import { ProfilFeedbackKeys } from '../../profil';

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
    const feedbackNeiKnappRef = useRef(null);
    const { amplitudeData } = useAmplitudeData();

    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    const neiId = nanoid();
    useEffect(() => {
        if (profil && profil[id as ProfilFeedbackKeys]) {
            const { valgt, updated } = profil[id as ProfilFeedbackKeys];
            setValgt(valgt || '');
            setOppdatert(updated || new Date().toISOString());
        }
    }, [profil, id]);

    if (erOppdatertForOver12TimerSiden(oppdatert)) return null;

    const handleFeedback = (feedback: string, event: SyntheticEvent) => {
        amplitudeLogger('veientilarbeid.feedback.intro', {
            kort: id,
            feedback,
            ...amplitudeData,
        });

        const oppdatertFeedbackDato = new Date().toISOString();

        const oppdatertProfil = {
            [id]: {
                updated: oppdatertFeedbackDato,
                valgt: feedback,
            },
        };

        lagreProfil(oppdatertProfil);
        setValgt(feedback);
        setOppdatert(oppdatertFeedbackDato);

        if (feedback === 'nei') {
            const neiKnapp = document.getElementById(event.currentTarget.id);
            setVisPopover(neiKnapp || undefined);
        } else {
            setVisPopover(undefined);
        }
    };

    const jaKnapp = classNames({
        [styles.valgt]: valgt === 'ja',
        [styles.feedbackKnapp]: true,
    });

    const neiKnapp = classNames({
        [styles.valgt]: /nei/.test(valgt),
        [styles.feedbackKnapp]: true,
    });

    const vetIkkeKnapp = classNames({
        [styles.valgt]: valgt === 'vet ikke',
        [styles.feedbackKnapp]: true,
    });

    return (
        <div className={`${className ? className : ''} ${styles.feedbackContainer}`}>
            <Detail className={styles.feedbackTittel}>{sporsmal ? sporsmal : tekst('varDetteNyttig')}</Detail>
            <div className={styles.valg}>
                <button onClick={(event) => handleFeedback('ja', event)} className={jaKnapp}>
                    <Detail>{tekst('ja')}</Detail>
                </button>
                <span className={styles.feedbackSpace} aria-hidden="true">
                    |
                </span>
                <button
                    onClick={(event) => handleFeedback('nei', event)}
                    id={neiId}
                    className={neiKnapp}
                    ref={feedbackNeiKnappRef}
                >
                    <Detail>{tekst('nei')}</Detail>
                </button>
                <Popover
                    id={`popover-${neiId}`}
                    anchorEl={feedbackNeiKnappRef.current}
                    onClose={() => setVisPopover(undefined)}
                    open={visPopover !== undefined}
                    tabIndex={-1}
                    arrow={false}
                >
                    <Popover.Content>
                        <BodyShort className={styles.feedbackUtdyping}>{tekst('hvorforNei')}</BodyShort>
                        <ul className={styles.feedbackGrunner}>
                            <li>
                                <button onClick={(event) => handleFeedback('nei - visste det fra før', event)}>
                                    {tekst('gammeltNytt')}
                                </button>
                            </li>
                            <li>
                                <button onClick={(event) => handleFeedback('nei - forstår ikke innholdet', event)}>
                                    {' '}
                                    {tekst('forstodIkke')}
                                </button>
                            </li>
                            <li>
                                <button onClick={(event) => handleFeedback('nei - føles ikke viktig', event)}>
                                    {' '}
                                    {tekst('uviktig')}
                                </button>
                            </li>
                            <li>
                                <button onClick={(event) => handleFeedback('nei - andre grunner', event)}>
                                    {tekst('andreGrunner')}
                                </button>
                            </li>
                        </ul>
                    </Popover.Content>
                </Popover>
                <span className={styles.feedbackSpace} aria-hidden="true">
                    |
                </span>
                <button onClick={(event) => handleFeedback('vet ikke', event)} className={vetIkkeKnapp}>
                    <Detail>{tekst('vetIkke')}</Detail>
                </button>
            </div>
        </div>
    );
}

export default Feedback;
