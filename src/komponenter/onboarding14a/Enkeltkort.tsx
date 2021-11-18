import { SituasjonsbestemtSluttkort } from './situasjonsbestemt';
import Onboarding from '../onboarding/onboarding';

const AMPLITUDE_TEMA_TAG = '14a';

const Enkeltkort = () => {
    const innhold = [<SituasjonsbestemtSluttkort />];

    return (
        <Onboarding
            header="Hjelp og støtte"
            innhold={innhold}
            hoppOverPreState={false}
            id="14a-intro-situasjonsbestemt"
            amplitudeTemaTag={AMPLITUDE_TEMA_TAG}
        />
    );
};

export default Enkeltkort;
