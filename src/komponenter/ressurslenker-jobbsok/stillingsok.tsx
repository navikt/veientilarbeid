import React from 'react';
import { klikkPaSokLedigeStillinger } from '../../metrics/metrics';
import StillingsokIkon from './svg/stillingsok';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { stillingLenke } from '../../innhold/lenker';
import { OppfolgingContext } from '../../ducks/oppfolging';

const StillingSok = () => {

    const servicegruppe = React.useContext(OppfolgingContext).data.servicegruppe;

    const handleClick = () => {
        klikkPaSokLedigeStillinger(servicegruppe);
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
