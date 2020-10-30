import React from 'react';
import { loggAktivitet } from '../../metrics/metrics';
import CvIkon from './svg/cv';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { cvLenke } from '../../innhold/lenker';
import { AmplitudeAktivitetContext } from "../../ducks/amplitude-aktivitet-context";

const CV = () => {
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til CV', ...amplitudeAktivitetsData });
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
