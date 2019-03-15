import * as React from 'react';
import { klikkPaSokLedigeStillinger } from '../../metrics';
import stillingsokIkon from './svg/stillingsok.svg';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';

export const STILLINGSOK_URL = '/arbeidsplassen/stillinger';

class StillingSok extends React.Component {
    render() {
        return (
            <LenkepanelMedIkon
                href={STILLINGSOK_URL}
                alt=""
                onClick={klikkPaSokLedigeStillinger}
                ikon={stillingsokIkon}
                overskrift="stillingsok-overskrift"
            />
        );
    }
}
export default StillingSok;
