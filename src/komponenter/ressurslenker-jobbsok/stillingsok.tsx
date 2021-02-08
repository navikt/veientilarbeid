import React from 'react';
import { loggAktivitet } from '../../metrics/metrics';
import StillingsokIkon from './svg/stillingsok';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { stillingLenke } from '../../innhold/lenker';
import { AmplitudeContext } from '../../ducks/amplitude-context';

const StillingSok = () => {
    const amplitudeData = React.useContext(AmplitudeContext);

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til ledige stillinger', ...amplitudeData });
    };

    return (
        <LenkepanelMedIkon href={stillingLenke} alt="" onClick={handleClick} overskrift="stillingsok-overskrift">
            <StillingsokIkon />
        </LenkepanelMedIkon>
    );
};

export default StillingSok;
