import * as React from 'react';
import { Data, InnsatsgruppeContext } from '../../ducks/innsatsgruppe';
import { klikkPaSokLedigeStillinger } from '../../metrics';
import StillingsokIkon from './svg/stillingsok';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { stillingLenke } from '../../innhold/lenker';

const StillingSok = () => {
    const innsatsgruppeData: Data | null = React.useContext(InnsatsgruppeContext).data;
    const innsatsgruppe = innsatsgruppeData ? innsatsgruppeData.servicegruppe : null;

    const handleClick = () => {
        klikkPaSokLedigeStillinger(innsatsgruppe);
    };

    return (
        <LenkepanelMedIkon
            href={stillingLenke}
            alt=""
            onClick={handleClick}
            overskrift="stillingsok-overskrift"
        >
            <StillingsokIkon/>
        </LenkepanelMedIkon>
    );
}

export default StillingSok;
