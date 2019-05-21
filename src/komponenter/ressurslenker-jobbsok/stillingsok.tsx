import * as React from 'react';
import { klikkPaSokLedigeStillinger } from '../../metrics';
import StillingsokIkon from './svg/stillingsok';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { stillingLenke } from '../../innhold/lenker';

class StillingSok extends React.Component {
    render() {
        return (
            <LenkepanelMedIkon
                href={stillingLenke}
                alt=""
                onClick={klikkPaSokLedigeStillinger}
                overskrift="stillingsok-overskrift"
            >
                <StillingsokIkon/>
            </LenkepanelMedIkon>
        );
    }
}
export default StillingSok;
