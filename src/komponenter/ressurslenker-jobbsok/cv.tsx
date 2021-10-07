import { useContext } from 'react';
import { loggAktivitet } from '../../metrics/metrics';
import CvIkon from './svg/cv';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { cvLenke } from '../../innhold/lenker';
import { AmplitudeContext } from '../../ducks/amplitude-context';

const CV = () => {
    const amplitudeData = useContext(AmplitudeContext);

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til CV', ...amplitudeData });
    };

    return (
        <LenkepanelMedIkon href={cvLenke} alt="" onClick={handleClick} overskrift="cv-overskrift">
            <CvIkon />
        </LenkepanelMedIkon>
    );
};

export default CV;
