import { Button, Link } from '@navikt/ds-react';
import { aktivitetsplanLenke, dialogLenke } from '../../innhold/lenker';
import { useSprakValg } from '../../contexts/sprak';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { AmplitudeStandardAktivitetsData, loggAktivitet } from '../../metrics/metrics';
import { MouseEventHandler } from 'react';
import { BehovForVeiledningResponse, useBehovForVeiledning } from '../../contexts/behov-for-veiledning';
import { AmplitudeData } from '../../metrics/amplitude-utils';

const TEKSTER = {
    nb: {
        gaTilDialog: 'Gå til dialogen',
        gaTilAktivitetsplan: 'Gå til din aktivitetsplan',
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
    return (
        <Link
            href={dialogLenke}
            onClick={loggLenkeKlikkTilAmplitude({
                aktivitet: props.aktivitet,
                ...amplitudeData,
            })}
        >
            {tekst('gaTilDialog')}
        </Link>
    );
};

function onClickDialogKnapp(behovForVeiledning: BehovForVeiledningResponse, amplitudeData: AmplitudeData) {
    return () => {
        loggAktivitet({
            aktivitet: `Trykker på gå til dialog-knapp - ${behovForVeiledning?.oppfolging}`,
            ...amplitudeData,
        });
        const dialogId = behovForVeiledning?.dialogId ? `/${behovForVeiledning?.dialogId}` : '';
        window.location.href = `${dialogLenke}${dialogId}`;
    };
}

interface GaaTilDialogKnappProps {
    tekst?: string;
}
export const GaaTilDialogKnapp = (props: GaaTilDialogKnappProps) => {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const { amplitudeData } = useAmplitudeData();
    const { behovForVeiledning } = useBehovForVeiledning();
    return (
        <Button onClick={onClickDialogKnapp(behovForVeiledning, amplitudeData)}>
            {props.tekst || tekst('gaTilDialog')}
        </Button>
    );
};
