import React, { useEffect } from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { gaTilTiltaksinfo, seTiltaksinfo } from '../../metrics';
import TiltakinfoIkon from './tiltakinfoIkon';

import './tiltakinfo.less';
import { tiltakinfoLenke } from '../../innhold/lenker';
import { AppState } from '../../reducer';
import { ServicegruppeOrNull } from '../../ducks/oppfolging';
import { connect } from 'react-redux';

const Tiltakinfo = (servicegruppe: ServicegruppeOrNull) => {

    useEffect(() => {
        seTiltaksinfo(servicegruppe);
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

const mapStateToProps = (state: AppState): ServicegruppeOrNull => state.oppfolging.data.servicegruppe;

export default connect(mapStateToProps)(Tiltakinfo);
