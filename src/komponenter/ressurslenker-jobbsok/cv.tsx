import * as React from 'react';
import { gaTilCV } from '../../metrics';
import CvIkon from './svg/cv';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';

const CV_URL = '/arbeidsplassen/cv/';

class CV extends React.Component {
    render() {
        return (
            <LenkepanelMedIkon
                href={CV_URL}
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
