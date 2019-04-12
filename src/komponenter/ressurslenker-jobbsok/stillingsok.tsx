import * as React from 'react';
import { klikkPaSokLedigeStillinger } from '../../metrics';
import StillingsokIkon from './svg/stillingsok';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';

export const STILLINGSOK_URL = '/arbeidsplassen/stillinger';

class StillingSok extends React.Component {
    render() {
        return (
            <LenkepanelMedIkon
                href={STILLINGSOK_URL}
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
