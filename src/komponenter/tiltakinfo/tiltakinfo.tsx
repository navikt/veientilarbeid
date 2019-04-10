import * as React from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { gaTilTiltaksinfo, seTiltaksinfo } from '../../metrics';
import TiltakinfoIkon from './tiltakinfoIkon';

import './tiltakinfo.less';

export const TILTAKINFO_URL = '/tiltakinfo';

class Tiltakinfo extends React.Component {

    componentDidMount() {
        seTiltaksinfo();
    }

    render() {
        const overskrift = 'tiltakinfo-tittel';
        const ingress = 'tiltakinfo-ingress';

        return (
            <LenkepanelMedIkon
                href={TILTAKINFO_URL}
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
