import React from 'react';
import { BodyShort, Button } from '@navikt/ds-react';
import { Next } from '@navikt/ds-icons';
import spacingStyles from '../../spacing.module.css';

import { AmplitudeData, amplitudeLogger } from '../../metrics/amplitude-utils';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

interface DialogKnappProps {
    amplitudeData: AmplitudeData;
    href: string;
    antallUlesteDialoger: number;
}

const TEKSTER = {
    nb: {
        title: 'Gå til dialog med veilederen din',
        ulest_melding: 'ulest melding',
        uleste_meldinger: 'uleste meldinger',
        du_har: 'Du har ',
    },
    en: {
        title: 'Start a dialogue with your counselor',
        ulest_melding: 'unread message',
        uleste_meldinger: 'unread messages',
        du_har: 'You have ',
    },
};

const DialogKnapp: React.FC<DialogKnappProps> = (props) => {
    const handleClickInnsending = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling: 'Går til dialogen',
            ...props.amplitudeData,
        });
    };

    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    const variant = props.antallUlesteDialoger > 0 ? 'primary' : 'secondary';

    function dialogTekst(antallUlesteDialoger: number) {
        return (
            <>
                {tekst('du_har')}
                <b>{antallUlesteDialoger}</b>{' '}
                {antallUlesteDialoger === 1 ? tekst('ulest_melding') : tekst('uleste_meldinger')}
                {'.'}
            </>
        );
    }

    return (
        <div>
            {props.antallUlesteDialoger !== 0 && (
                <BodyShort className={spacingStyles.mt1}>{dialogTekst(props.antallUlesteDialoger)}</BodyShort>
            )}
            <Button
                onClick={handleClickInnsending}
                className={`${spacingStyles.mt1} ${spacingStyles.mb1}`}
                variant={variant}
                icon={<Next />}
                iconPosition="right"
            >
                {tekst('title')}
            </Button>
        </div>
    );
};

export default DialogKnapp;
