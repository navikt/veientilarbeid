import * as React from 'react';
import ReaktiveringMelding from '../reaktivering-melding/reaktivering-melding';
import Aktivitetsplan from '../aktivitetsplan/aktivitetsplan';

class SykemeldingOppfolgingInnhold extends React.Component<{}> {

    render() {
        return (
            <div className="sykmelding-oppfolging-innhold__wrapper">
                <div className="innhold">
                    <ReaktiveringMelding />
                    <Aktivitetsplan />
                </div>
            </div>
        );
    }
}

export default SykemeldingOppfolgingInnhold;