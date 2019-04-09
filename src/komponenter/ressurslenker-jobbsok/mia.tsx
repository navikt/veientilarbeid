import * as React from 'react';
import { gaTilMIA } from '../../metrics';
import MiaIkon from './svg/mia';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';

const MIA_URL = '/mia';

class Mia extends React.Component {
    render() {
        return (
            <LenkepanelMedIkon
                href={MIA_URL}
                alt=""
                onClick={gaTilMIA}
                overskrift="mia-overskrift"
            >
                <MiaIkon/>
            </LenkepanelMedIkon>
        );
    }
}
export default Mia;
