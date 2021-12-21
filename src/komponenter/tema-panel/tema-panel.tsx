import MeldekortOnboarding from '../onboardingMeldekort/meldekort-onboarding';
import Onboarding14A from '../onboarding14a/Onboarding14a';
import YtelserOnboarding from '../onboarding-ytelser/ytelser-onboarding';
import './tema-panel.less';
const Temapanel = () => {
    return (
        <div className="intro-wrapper">
            <Onboarding14A />
            <MeldekortOnboarding />
            <YtelserOnboarding />
        </div>
    );
};

export default Temapanel;
