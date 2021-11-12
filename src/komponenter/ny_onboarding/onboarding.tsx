import { useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import OnboardingFooter from './onboardingFooter';
import './onboarding.less';
// import { hentFraBrowserStorage } from '../../utils/browserStorage-utils';

interface OnboardingProps {
    header: string;
    id: string;
    hoppOverPreState: boolean;
    innhold: JSX.Element[];
}

const Onboarding = (props: OnboardingProps) => {
    const { header, hoppOverPreState, innhold } = props;

    const startkort = hoppOverPreState ? 1 : 0;
    const [gjeldendeKortIndex, setGjeldendeKortIndex] = useState(startkort);

    const forrigeKort = () => {
        setGjeldendeKortIndex(gjeldendeKortIndex - 1);
    };
    const nesteKort = () => {
        setGjeldendeKortIndex((gjeldendeKortIndex + 1) % (innhold.length + 1));
    };
    const hoppOverIntro = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setGjeldendeKortIndex(innhold.length);
    };
    const handleLesIntroPaaNytt = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setGjeldendeKortIndex(1);
    };

    return (
        <div className="onboarding">
            <div className="onboarding-container">
                <div className="onboarding-header">
                    <Element tag={'h1'} className="kort-heading">
                        {header}
                    </Element>
                </div>
                <div className="onboarding-body">{innhold[gjeldendeKortIndex]}</div>
                <div className="onboarding-footer">
                    <OnboardingFooter
                        antallSider={innhold.length}
                        gjeldendeKortIndex={gjeldendeKortIndex}
                        forrigeKort={forrigeKort}
                        nesteKort={nesteKort}
                        hoppOverIntro={hoppOverIntro}
                        handleLesIntroPaaNytt={handleLesIntroPaaNytt}
                    />
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
