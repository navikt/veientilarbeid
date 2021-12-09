import DagpengerStatus from '../dagpenger-status/dagpenger-status';
import MeldekortOnboarding from '../onboardingMeldekort/meldekort-onboarding';
import Onboarding14A from '../onboarding14a/Onboarding14a';
import YtelserOnboaridng from '../onboarding-ytelser/ytelser-onboarding';
import './tema-panel.less';
const Temapanel = () => {
    return (
        <div className="intro-wrapper">
            <DagpengerStatus />
            <Onboarding14A />
            <MeldekortOnboarding />
            <YtelserOnboaridng />
        </div>
    );
};

export default Temapanel;
