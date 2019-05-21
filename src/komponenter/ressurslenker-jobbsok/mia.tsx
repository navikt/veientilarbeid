import * as React from 'react';
import { gaTilMIA } from '../../metrics';
import MiaIkon from './svg/mia';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { miaLenke } from '../../innhold/lenker';

class Mia extends React.Component {
    render() {
        return (
            <LenkepanelMedIkon
                href={miaLenke}
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
