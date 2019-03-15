import * as React from 'react';
import { gaTilMIA } from '../../metrics';
import miaIkon from './svg/mia.svg';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';

const MIA_URL = '/mia';

class Mia extends React.Component {
    render() {
        return (
            <LenkepanelMedIkon
                href={MIA_URL}
                alt=""
                onClick={gaTilMIA}
                ikon={miaIkon}
                overskrift="mia-overskrift"
            />
        );
    }
}
export default Mia;
