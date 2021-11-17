import { SituasjonsbestemtSluttkort } from './situasjonsbestemt';
import Onboarding from '../onboarding/onboarding';

const Enkeltkort = () => {
    const innhold = [<SituasjonsbestemtSluttkort />];

    return (
        <Onboarding
            header="Hjelp og støtte"
            innhold={innhold}
            hoppOverPreState={false}
            id="14a-intro-situasjonsbestemt"
        />
    );
};

export default Enkeltkort;
