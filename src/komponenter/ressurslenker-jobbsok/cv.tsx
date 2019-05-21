import * as React from 'react';
import { gaTilCV } from '../../metrics';
import CvIkon from './svg/cv';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { cvLenke } from '../../innhold/lenker';

class CV extends React.Component {
    render() {
        return (
            <LenkepanelMedIkon
                href={cvLenke}
                alt=""
                onClick={gaTilCV}
                overskrift="cv-overskrift"
            >
                <CvIkon/>
            </LenkepanelMedIkon>
        );
    }
}
export default CV;
