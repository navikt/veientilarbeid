import { MouseEventHandler } from 'react';
import { Button, Link } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { useUlesteDialogerData } from '../../contexts/ulestedialoger';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

import { aktivitetsplanLenke, dialogLenke } from '../../innhold/lenker';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { AmplitudeStandardAktivitetsData, loggAktivitet } from '../../metrics/metrics';
import { BehovForVeiledningResponse, useBehovForVeiledning } from '../../contexts/behov-for-veiledning';
import { AmplitudeData } from '../../metrics/amplitude-utils';

import spacingStyles from '../../spacing.module.css';

const TEKSTER = {
    nb: {
        gaTilDialogKnapp: 'Skriv til veilederen',
        gaTilDialogLenke: 'Gå til dialogen',
        gaTilAktivitetsplan: 'Gå til din aktivitetsplan',
        ulest_melding: 'ulest melding',
        uleste_meldinger: 'uleste meldinger',
    },
    en: {
        gaTilDialog: 'Go to dialogue with your counselor',
        ulest_melding: 'unread message',
        uleste_meldinger: 'unread messages',
    },
};

interface LenkeProps {
    aktivitet: string;
}

function loggLenkeKlikkTilAmplitude(data: AmplitudeStandardAktivitetsData): MouseEventHandler<HTMLAnchorElement> {
    return (e) => {
        e.preventDefault();
        loggAktivitet(data);
        window.location.href = (e.target as HTMLAnchorElement).href;
    };
}

export const AktivitetsplanLenke = (props: LenkeProps) => {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const { amplitudeData } = useAmplitudeData();
    return (
        <Link
            href={aktivitetsplanLenke}
            onClick={loggLenkeKlikkTilAmplitude({
                aktivitet: props.aktivitet,
                ...amplitudeData,
            })}
        >
            {tekst('gaTilAktivitetsplan')}
        </Link>
    );
};

export const DialogLenke = (props: LenkeProps) => {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const { amplitudeData } = useAmplitudeData();
    const { antallUleste } = useUlesteDialogerData();

    const ulesteMeldingerTekst = antallUleste === 1 ? tekst('ulest_melding') : tekst('uleste_meldinger');

    return (
        <>
            <Link
                href={dialogLenke}
                onClick={loggLenkeKlikkTilAmplitude({
                    aktivitet: props.aktivitet,
                    ...amplitudeData,
                })}
            >
                {tekst('gaTilDialogLenke')}
            </Link>
            {antallUleste > 0 && (
                <span className={`${spacingStyles.ml05} navds-body-short navds-body-short--small`}>
                    <b>{antallUleste}</b> {ulesteMeldingerTekst}
                </span>
            )}
        </>
    );
};

function onClickDialogKnapp(behovForVeiledning: BehovForVeiledningResponse, amplitudeData: AmplitudeData) {
    return () => {
        loggAktivitet({
            aktivitet: `Trykker på gå til dialog-knapp - ${
                behovForVeiledning?.oppfolging || 'IKKE_SVART_PÅ_BEHOVSVURDERING'
            }`,
            ...amplitudeData,
        });
        const dialogId = behovForVeiledning?.dialogId ? `/${behovForVeiledning?.dialogId}` : '';
        window.location.href = `${dialogLenke}${dialogId}`;
    };
}

interface GaaTilDialogKnappProps {
    tekst?: string;
    variant?: 'primary' | 'secondary';
}
export const GaaTilDialogKnapp = (props: GaaTilDialogKnappProps) => {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const { amplitudeData } = useAmplitudeData();
    const { behovForVeiledning } = useBehovForVeiledning();
    return (
        <Button variant={props.variant} onClick={onClickDialogKnapp(behovForVeiledning, amplitudeData)}>
            {props.tekst || tekst('gaTilDialogKnapp')}
        </Button>
    );
};
