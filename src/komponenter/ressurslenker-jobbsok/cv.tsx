import React, { useContext } from 'react';
import { Data, InnsatsgruppeContext } from '../../ducks/innsatsgruppe';
import { gaTilCV } from '../../metrics';
import CvIkon from './svg/cv';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { cvLenke } from '../../innhold/lenker';

const CV = () => {
    const innsatsgruppeData: Data | null = useContext(InnsatsgruppeContext).data;
    const innsatsgruppe = innsatsgruppeData ? innsatsgruppeData.servicegruppe : null;

    const handleClick = () => {
        gaTilCV(innsatsgruppe);
    };

    return (
        <LenkepanelMedIkon
            href={cvLenke}
            alt=""
            onClick={handleClick}
            overskrift="cv-overskrift"
        >
            <CvIkon/>
        </LenkepanelMedIkon>
    );
}

export default CV;
