import * as React from 'react';
import { BodyShort, Button } from '@navikt/ds-react';
import { Next } from '@navikt/ds-icons';

import { AmplitudeData, amplitudeLogger } from '../../metrics/amplitude-utils';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

interface Lenkepanel14AProps {
    amplitudeData: AmplitudeData;
    href: string;
    antallUlesteDialoger: number;
}

const TEKSTER = {
    nb: {
        title: 'Gå til dialog med veilederen din',
        onsker_hjelp: 'Om du ønsker hjelp kan du kontakte oss gjennom dialogen',
        ulest_melding: 'ulest melding.',
        uleste_meldinger: 'uleste meldinger.',
        du_har: 'Du har ',
    },
    en: {
        title: 'Start a dialogue',
        onsker_hjelp: 'if you need help',
        ulest_melding: 'unread message',
        uleste_meldinger: 'unread messages',
        du_har: 'You have ',
    },
};

const Lenkepanel14A: React.FC<Lenkepanel14AProps> = (props) => {
    const handleClickInnsending = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling: 'Går til dialogen',
            ...props.amplitudeData,
        });
    };

    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    function dialogTekst(antallUlesteDialoger: number) {
        if (antallUlesteDialoger === 0) return null;
        return (
            <>
                {tekst('du_har')}
                <b>{antallUlesteDialoger}</b>{' '}
                {antallUlesteDialoger === 1 ? tekst('ulest_melding') : tekst('uleste_meldinger')}
            </>
        );
    }

    return (
        <div>
            {props.antallUlesteDialoger && props.antallUlesteDialoger > 0 ? (
                <BodyShort>{dialogTekst(props.antallUlesteDialoger)}</BodyShort>
            ) : null}
            <Button onClick={handleClickInnsending} className="mt-1 mb-1" variant="secondary">
                {tekst('title')} <Next />
            </Button>
        </div>
    );
};

export default Lenkepanel14A;
