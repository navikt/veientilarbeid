import React from 'react';
import { loggAktivitet } from '../../metrics/metrics';
import StillingsokIkon from './svg/stillingsok';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { stillingLenke } from '../../innhold/lenker';
import { AmplitudeAktivitetContext } from '../../ducks/amplitude-aktivitet-context';

const StillingSok = () => {
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til ledige stillinger', ...amplitudeAktivitetsData });
    };

    return (
        <LenkepanelMedIkon href={stillingLenke} alt="" onClick={handleClick} overskrift="stillingsok-overskrift">
            <StillingsokIkon />
        </LenkepanelMedIkon>
    );
};

export default StillingSok;
