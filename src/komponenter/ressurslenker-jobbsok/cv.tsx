import * as React from 'react';
import { gaTilCV } from '../../metrics';
import cvIkon from './svg/cv.svg';
import LenkepanelMedIkon from '../lenkepanel-med-bilde/lenkepanel-med-ikon';

const CV_URL = 'https://arbeidsplassen.nav.no/cv/';

class CV extends React.Component {
    render() {
        return (
            <div className="cv">
                <LenkepanelMedIkon
                    href={CV_URL}
                    alt=""
                    onClick={gaTilCV}
                    ikon={cvIkon}
                    lenketekst="cv-overskrift"
                />
            </div>
        );
    }
}
export default CV;