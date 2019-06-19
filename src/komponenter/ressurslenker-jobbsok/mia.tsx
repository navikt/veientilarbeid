import React, { useContext } from 'react';
import { Data, InnsatsgruppeContext } from '../../ducks/innsatsgruppe';
import { gaTilMIA } from '../../metrics';
import MiaIkon from './svg/mia';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { miaLenke } from '../../innhold/lenker';

const Mia = () => {
    const innsatsgruppeData: Data | null = useContext(InnsatsgruppeContext).data;
    const innsatsgruppe = innsatsgruppeData ? innsatsgruppeData.servicegruppe : null;

    const handleClick = () => {
        gaTilMIA(innsatsgruppe);
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
