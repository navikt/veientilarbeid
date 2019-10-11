import React, { useEffect } from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { gaTilTiltaksinfo, seTiltaksinfo } from '../../metrics/metrics';
import TiltakinfoIkon from './tiltakinfoIkon';

import './tiltakinfo.less';
import { tiltakinfoLenke } from '../../innhold/lenker';
import { OppfolgingContext } from '../../ducks/oppfolging';

const Tiltakinfo = () => {
    const servicegruppe = React.useContext(OppfolgingContext).data.servicegruppe;

    useEffect(() => {
        seTiltaksinfo(servicegruppe);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClick = () => {
        gaTilTiltaksinfo(servicegruppe);
    };

    const overskrift = 'tiltakinfo-tittel';
    const ingress = 'tiltakinfo-ingress';

    return (
        <LenkepanelMedIkon
            href={tiltakinfoLenke}
            className="tiltakinfo"
            alt=""
            onClick={handleClick}
            overskrift={overskrift}
            ingress={ingress}
        >
            <TiltakinfoIkon/>
        </LenkepanelMedIkon>
    );
}

export default Tiltakinfo;
