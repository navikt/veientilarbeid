import MeldekortOnboarding from '../onboardingMeldekort/meldekort-onboarding';
import Onboarding14A from '../onboarding14a/Onboarding14a';
import YtelserOnboarding from '../onboarding-ytelser/ytelser-onboarding';
import '../tema/tema.css';

const Temapanel = () => {
    return (
        <div className="tema-panel">
            <YtelserOnboarding />
            <MeldekortOnboarding />
            <Onboarding14A />
        </div>
    );
};

export default Temapanel;
