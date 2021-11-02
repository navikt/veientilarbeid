import { useContext } from 'react';
import { SituasjonsbestemtSluttkort } from './situasjonsbestemt';
import { AmplitudeContext } from '../../context/amplitude-context';
import { UlesteDialogerContext } from '../../ducks/ulestedialoger';
import OnboardingOmslutning from '../onboarding-omslutning/OnboardingOmslutning';

const Enkeltkort = () => {
    const amplitudeData = useContext(AmplitudeContext);
    const ulesteDialoger = useContext(UlesteDialogerContext).data;

    const Sluttkort = SituasjonsbestemtSluttkort;

    return (
        <OnboardingOmslutning>
            <Sluttkort amplitudeData={amplitudeData} antallUlesteDialoger={ulesteDialoger.antallUleste} />
        </OnboardingOmslutning>
    );
};

export default Enkeltkort;
