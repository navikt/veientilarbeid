import * as React from 'react';
import ReaktiveringMelding from '../reaktivering-melding/reaktivering-melding';
import Aktivitetsplan from '../aktivitetsplan/aktivitetsplan';
import Sykefravar from '../sykefravaer/sykefravar';

class SykemeldingOppfolgingInnhold extends React.Component<{}> {

    render() {
        return (
            <div className="sykmelding-oppfolging-innhold">
                <ReaktiveringMelding/>
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
        );
    }
}

export default SykemeldingOppfolgingInnhold;