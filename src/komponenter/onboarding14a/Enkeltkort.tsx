import { useContext } from 'react';
import { SituasjonsbestemtSluttkort } from './situasjonsbestemt';
import Panel from 'nav-frontend-paneler';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { UlesteDialogerContext } from '../../ducks/ulestedialoger';

const Enkeltkort = () => {
    const amplitudeData = useContext(AmplitudeContext);
    const ulesteDialoger = useContext(UlesteDialogerContext).data;

    const Sluttkort = SituasjonsbestemtSluttkort;

    return (
        <div className={'fjorten-A-intro-omslutning'}>
            <Panel className={'fjorten-A-intro'} border>
                <div className={'overall-wrapper'}>
                    <Sluttkort amplitudeData={amplitudeData} antallUlesteDialoger={ulesteDialoger.antallUleste} />
                </div>
            </Panel>
        </div>
    );
};

export default Enkeltkort;
