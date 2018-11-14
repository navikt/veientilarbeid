import * as React from 'react';
import Aktivitetsplan from '../../aktivitetsplan/aktivitetsplan';
import Sykefravar from '../../sykefravaer/sykefravar';
import './innhold-sykmelding.less';
import Overskrift from '../overskrift/overskrift';

class SykemeldingOppfolgingInnhold extends React.Component<{}> {

    render() {
        return (
            <>
            <Overskrift/>
            <div className="sykmelding-oppfolging-innhold">
                <div className="rad-even">
                    <div className="limit">
                        <Aktivitetsplan />
                    </div>
                </div>
                <div className="rad">
                    <div className="limit">
                        <Sykefravar />
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default SykemeldingOppfolgingInnhold;