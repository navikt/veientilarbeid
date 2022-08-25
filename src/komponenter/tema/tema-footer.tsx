import { Next, Back } from '@navikt/ds-icons';
import { Button, Cell, Grid } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

interface TemaFooterProps {
    antallSider: number;
    gjeldendeKortIndex: number;
    forrigeKort: () => void;
    nesteKort: () => void;
    hoppOverIntro: (e: React.MouseEvent) => void;
    handleLesIntroPaaNytt: (e: React.MouseEvent) => void;
    hoppOverLenkeTekst?: string;
    lesPaaNyttLenkeTekst?: string;
    startTekst?: string;
}

const TEKSTER: Tekster<string> = {
    nb: {
        start: 'Start introduksjonen',
        skip: 'Hopp over introduksjonen',
        vis: 'Vis introduksjon',
        forrige: 'Forrige',
        neste: 'Neste',
        ferdig: 'Fullfør',
    },
    en: {
        start: 'Start the introduction',
        skip: 'Skip the introduction',
        vis: 'Show introduction',
        forrige: 'Previous',
        neste: 'Next',
        ferdig: 'Finish',
    },
};

const TemaFooter = (props: TemaFooterProps) => {
    const { antallSider, gjeldendeKortIndex, forrigeKort, nesteKort, startTekst } = props;

    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    if (antallSider <= 1) return null;
    if (antallSider >= 2) {
        if (gjeldendeKortIndex === 0) {
            return (
                <div>
                    <Button
                        variant="secondary"
                        className={'mb-1'}
                        onClick={nesteKort}
                        icon={<Next />}
                        iconPosition="right"
                    >
                        <span>{startTekst || tekst('start')}</span>
                    </Button>
                </div>
            );
        }
        if (gjeldendeKortIndex !== antallSider - 1) {
            return (
                <Grid style={{ marginTop: '1rem' }}>
                    <Cell xs={6}>
                        <Button
                            size="small"
                            variant="tertiary"
                            disabled={gjeldendeKortIndex === 1}
                            onClick={forrigeKort}
                            icon={<Back />}
                        >
                            {tekst('forrige')}
                        </Button>
                    </Cell>
                    <Cell xs={6} style={{ justifySelf: 'end' }}>
                        <Button
                            size="small"
                            variant="tertiary"
                            onClick={nesteKort}
                            icon={<Next />}
                            iconPosition="right"
                        >
                            {gjeldendeKortIndex === antallSider - 2 ? tekst('ferdig') : tekst('neste')}
                        </Button>
                    </Cell>
                </Grid>
            );
        }
    }
    return <></>;
};

export default TemaFooter;
