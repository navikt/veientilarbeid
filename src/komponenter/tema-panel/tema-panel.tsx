import { useFeatureToggleData } from '../../contexts/feature-toggles';
import DagpengerStatus from '../dagpenger-status/dagpenger-status';
import MeldekortOnboarding from '../onboardingMeldekort/meldekort-onboarding';
import Onboarding14A from '../onboarding14a/Onboarding14a';
import YtelserOnboaridng from '../onboarding-ytelser/ytelser-onboarding';
import './tema-panel.less';
const Temapanel = () => {
    const featuretoggleData = useFeatureToggleData();
    const oppdatertStylingFeaturetoggle =
        featuretoggleData && featuretoggleData['veientilarbeid.vis-oppdatert-styling'];

    return (
        <div className={oppdatertStylingFeaturetoggle ? 'oppdatert-intro-wrapper' : 'intro-wrapper'}>
            <DagpengerStatus />
            <Onboarding14A />
            <MeldekortOnboarding />
            <YtelserOnboaridng />
        </div>
    );
};

export default Temapanel;
