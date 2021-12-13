import { Next, Back } from '@navikt/ds-icons';
import { BodyShort, Button, Link } from '@navikt/ds-react';

interface TemaFooterProps {
    antallSider: number;
    gjeldendeKortIndex: number;
    forrigeKort: () => void;
    nesteKort: () => void;
    hoppOverIntro: (e: React.MouseEvent) => void;
    handleLesIntroPaaNytt: (e: React.MouseEvent) => void;
    hoppOverLenkeTekst?: string;
    lesPaaNyttLenkeTekst?: string;
}

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
    } = props;

    if (antallSider <= 1) return null;
    if (antallSider >= 2) {
        if (gjeldendeKortIndex === 0) {
            return (
                <div className="kolonne">
                    <Button variant="secondary" className={'mb-2'} onClick={nesteKort}>
                        <span>Start introduksjonen</span>
                        <Next />
                    </Button>
                    <Link onClick={hoppOverIntro} href={'#'} className="tracking-wide">
                        {hoppOverLenkeTekst ?? 'Hopp over introduksjonen for nå'}
                    </Link>
                </div>
            );
        }
        if (gjeldendeKortIndex === antallSider - 1) {
            return (
                <div className="kolonne">
                    <BodyShort size="small">
                        <Link onClick={handleLesIntroPaaNytt} href={'#'}>
                            {lesPaaNyttLenkeTekst || 'Vis introduksjon'}
                        </Link>
                    </BodyShort>
                </div>
            );
        }
        return (
            <>
                <div className={'rad'}>
                    <Button size="small" variant="tertiary" disabled={gjeldendeKortIndex === 1} onClick={forrigeKort}>
                        <Back /> Forrige
                    </Button>
                    <Button size="small" variant="tertiary" onClick={nesteKort}>
                        {gjeldendeKortIndex === antallSider - 2 ? 'Fullfør' : 'Neste'}
                        <Next />
                    </Button>
                </div>
            </>
        );
    }
    return <></>;
};

export default TemaFooter;
