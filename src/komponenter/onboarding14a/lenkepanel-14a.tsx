import * as React from 'react';
import { AmplitudeData, amplitudeLogger } from '../../metrics/amplitude-utils';
import { BodyShort, LinkPanel } from '@navikt/ds-react';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

interface Lenkepanel14AProps {
    amplitudeData: AmplitudeData;
    href: string;
    antallUlesteDialoger: number;
}

const TEKSTER = {
    nb: {
        title: 'Start en dialog',
        onsker_hjelp: 'om du ønsker hjelp',
        ulest_melding: 'ulest melding',
        uleste_meldinger: 'uleste meldinger',
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
        if (antallUlesteDialoger === 0) return tekst('onsker_hjelp');
        return (
            <>
                {tekst('du_har')}
                <b>{antallUlesteDialoger}</b>{' '}
                {antallUlesteDialoger === 1 ? tekst('ulest_melding') : tekst('uleste_meldinger')}
            </>
        );
    }

    return (
        <LinkPanel href={props.href} onClick={handleClickInnsending} className={'blokk-xs'}>
            <LinkPanel.Title>{tekst('title')}</LinkPanel.Title>
            <LinkPanel.Description>
                <BodyShort>{dialogTekst(props.antallUlesteDialoger)}</BodyShort>
            </LinkPanel.Description>
        </LinkPanel>
    );
};

export default Lenkepanel14A;
