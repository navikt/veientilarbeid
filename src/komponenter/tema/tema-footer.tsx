import { Next, Back } from '@navikt/ds-icons';
import { BodyShort, Button, Link } from '@navikt/ds-react';
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
    const {
        antallSider,
        gjeldendeKortIndex,
        forrigeKort,
        nesteKort,
        hoppOverIntro,
        handleLesIntroPaaNytt,
        hoppOverLenkeTekst,
        lesPaaNyttLenkeTekst,
        startTekst,
    } = props;

    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    if (antallSider <= 1) return null;
    if (antallSider >= 2) {
        if (gjeldendeKortIndex === 0) {
            return (
                <div className="kolonne">
                    <Button variant="secondary" className={'mb-2'} onClick={nesteKort}>
                        <span>{startTekst || tekst('start')}</span>
                        <Next />
                    </Button>
                    <Link onClick={hoppOverIntro} href={'#'} className="tracking-wide">
                        {hoppOverLenkeTekst ?? tekst('skip')}
                    </Link>
                </div>
            );
        }
        if (gjeldendeKortIndex === antallSider - 1) {
            return (
                <div className="kolonne">
                    <BodyShort>
                        <Link onClick={handleLesIntroPaaNytt} href={'#'}>
                            {lesPaaNyttLenkeTekst || tekst('vis')}
                        </Link>
                    </BodyShort>
                </div>
            );
        }
        return (
            <>
                <div className={'rad'}>
                    <Button size="small" variant="tertiary" disabled={gjeldendeKortIndex === 1} onClick={forrigeKort}>
                        <Back /> {tekst('forrige')}
                    </Button>
                    <Button size="small" variant="tertiary" onClick={nesteKort}>
                        {gjeldendeKortIndex === antallSider - 2 ? tekst('ferdig') : tekst('neste')}
                        <Next />
                    </Button>
                </div>
            </>
        );
    }
    return <></>;
};

export default TemaFooter;
