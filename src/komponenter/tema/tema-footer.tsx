import { Next } from '@navikt/ds-icons';
import { Nesteknapp, Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { Knapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';

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
                    <Knapp className={'mb-2'} onClick={nesteKort}>
                        <span>Start introduksjonen</span>
                        <Next />
                    </Knapp>
                    <Lenke onClick={hoppOverIntro} href={'#'} className="tracking-wide">
                        {hoppOverLenkeTekst ?? 'Hopp over introduksjonen for nå'}
                    </Lenke>
                </div>
            );
        }
        if (gjeldendeKortIndex === antallSider - 1) {
            return (
                <div className="kolonne">
                    <Normaltekst>
                        <Lenke onClick={handleLesIntroPaaNytt} href={'#'}>
                            {lesPaaNyttLenkeTekst || 'Vis introduksjon'}
                        </Lenke>
                    </Normaltekst>
                </div>
            );
        }
        return (
            <>
                <div className={'rad'}>
                    <Tilbakeknapp mini disabled={gjeldendeKortIndex === 1} onClick={forrigeKort}>
                        Forrige
                    </Tilbakeknapp>
                    <Nesteknapp mini onClick={nesteKort}>
                        {gjeldendeKortIndex === antallSider - 2 ? 'Fullfør' : 'Neste'}
                    </Nesteknapp>
                </div>
            </>
        );
    }
    return <></>;
};

export default TemaFooter;
