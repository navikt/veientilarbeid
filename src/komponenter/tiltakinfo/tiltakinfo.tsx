import React, { useContext, useEffect } from 'react';
import { Data, InnsatsgruppeContext } from '../../ducks/innsatsgruppe';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { gaTilTiltaksinfo, seTiltaksinfo } from '../../metrics';
import TiltakinfoIkon from './tiltakinfoIkon';

import './tiltakinfo.less';
import { tiltakinfoLenke } from '../../innhold/lenker';

const Tiltakinfo = () => {
    const innsatsgruppeData: Data | null = useContext(InnsatsgruppeContext).data;
    const innsatsgruppe = innsatsgruppeData ? innsatsgruppeData.servicegruppe : null;

    useEffect(() => {
        seTiltaksinfo(innsatsgruppe);
    }, []);

    const handleClick = () => {
        gaTilTiltaksinfo(innsatsgruppe);
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
