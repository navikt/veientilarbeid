import { useContext } from 'react';
import { SituasjonsbestemtSluttkort } from './situasjonsbestemt';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { UlesteDialogerContext } from '../../contexts/ulestedialoger';
import OnboardingOmslutning from '../onboarding-omslutning/OnboardingOmslutning';

const Enkeltkort = () => {
    const amplitudeData = useAmplitudeData();
    const ulesteDialoger = useContext(UlesteDialogerContext).data;

    const Sluttkort = SituasjonsbestemtSluttkort;

    return (
        <OnboardingOmslutning>
            <Sluttkort amplitudeData={amplitudeData} antallUlesteDialoger={ulesteDialoger.antallUleste} />
        </OnboardingOmslutning>
    );
};

export default Enkeltkort;
