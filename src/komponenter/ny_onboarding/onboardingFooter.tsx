import { Next } from '@navikt/ds-icons';
import { Nesteknapp, Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';

interface OnboardingFooterProps {
    antallSider: number;
    gjeldendeKortIndex: number;
    forrigeKort: () => void;
    nesteKort: () => void;
    hoppOverIntro: (e: React.MouseEvent) => void;
    handleLesIntroPaaNytt: (e: React.MouseEvent) => void;
}

const OnboardingFooter = (props: OnboardingFooterProps) => {
    const { antallSider, gjeldendeKortIndex, forrigeKort, nesteKort, hoppOverIntro, handleLesIntroPaaNytt } = props;

    if (antallSider <= 1) return null;
    if (antallSider >= 2) {
        if (gjeldendeKortIndex === 0) {
            return (
                <div className="kolonne">
                    <Hovedknapp className={'mb-2'} mini onClick={nesteKort}>
                        <span>Start introduksjonen</span>
                        <Next />
                    </Hovedknapp>
                    <Lenke onClick={hoppOverIntro} href={'#'} className="tracking-wide">
                        Hopp over introduksjonen for nå
                    </Lenke>
                </div>
            );
        }
        if (gjeldendeKortIndex === antallSider - 1) {
            return (
                <div className="kolonne">
                    <Normaltekst>
                        <Lenke onClick={handleLesIntroPaaNytt} href={'#'}>
                            Vis introduksjon
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
                        Neste
                    </Nesteknapp>
                </div>
            </>
        );
    }
    return <></>;
};

export default OnboardingFooter;
