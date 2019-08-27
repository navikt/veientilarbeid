import React from 'react';
import { gaTilMIA } from '../../metrics/metrics';
import MiaIkon from './svg/mia';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { miaLenke } from '../../innhold/lenker';
import { OppfolgingContext } from '../../ducks/oppfolging';

const Mia = () => {

    const servicegruppe = React.useContext(OppfolgingContext).data.servicegruppe;

    const handleClick = () => {
        gaTilMIA(servicegruppe);
    };
    
    return (
        <LenkepanelMedIkon
            href={miaLenke}
            alt=""
            onClick={handleClick}
            overskrift="mia-overskrift"
        >
            <MiaIkon/>
        </LenkepanelMedIkon>
    );
}

export default Mia;
