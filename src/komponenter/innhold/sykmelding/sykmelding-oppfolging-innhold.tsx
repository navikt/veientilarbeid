import * as React from 'react';
import Aktivitetsplan from '../../aktivitetsplan/aktivitetsplan';

class SykemeldingOppfolgingInnhold extends React.Component<{}> {

    render() {
        return (
            <div className="sykmelding-oppfolging-innhold__wrapper">
                <Aktivitetsplan />
            </div>
        );
    }
}

export default SykemeldingOppfolgingInnhold;