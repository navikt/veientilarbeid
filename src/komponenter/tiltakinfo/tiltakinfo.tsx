import * as React from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { gaTilTiltaksinfo, seTiltaksinfo } from '../../metrics';
import TiltakinfoIkon from './tiltakinfoIkon';

import './tiltakinfo.less';
import lenker from '../../innhold/lenker';

class Tiltakinfo extends React.Component {

    componentDidMount() {
        seTiltaksinfo();
    }

    render() {
        const overskrift = 'tiltakinfo-tittel';
        const ingress = 'tiltakinfo-ingress';

        return (
            <LenkepanelMedIkon
                href={lenker.tiltakinfo}
                className="tiltakinfo"
                alt=""
                onClick={gaTilTiltaksinfo}
                overskrift={overskrift}
                ingress={ingress}
            >
                <TiltakinfoIkon/>
            </LenkepanelMedIkon>
        );
    }
}

export default Tiltakinfo;
