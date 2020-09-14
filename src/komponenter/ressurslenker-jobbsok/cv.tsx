import React from 'react';
import { gaTilCV, loggAktivitet } from '../../metrics/metrics';
import CvIkon from './svg/cv';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { cvLenke } from '../../innhold/lenker';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { AmplitudeAktivitetsProps } from '../../metrics/amplitude-utils';

const CV = (props: AmplitudeAktivitetsProps) => {
    const servicegruppe = React.useContext(OppfolgingContext).data.servicegruppe;
    const { amplitudeAktivitetsData } = props;

    const handleClick = () => {
        gaTilCV(servicegruppe);
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
