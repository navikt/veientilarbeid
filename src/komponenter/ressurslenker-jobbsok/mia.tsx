import * as React from 'react';
import { gaTilMIA } from '../../metrics';
import MiaIkon from './svg/mia';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import lenker from '../../innhold/lenker';

class Mia extends React.Component {
    render() {
        return (
            <LenkepanelMedIkon
                href={lenker.mia}
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
