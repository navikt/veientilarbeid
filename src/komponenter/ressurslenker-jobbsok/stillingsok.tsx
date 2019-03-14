import * as React from 'react';
import { klikkPaSokLedigeStillinger } from '../../metrics';
import stillingsokIkon from './svg/stillingsok.svg';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';

export const STILLINGSOK_URL = '/arbeidsplassen/stillinger';

class StillingSok extends React.Component {
    render() {
        return (
            <div className="stillingsok">
                <LenkepanelMedIkon
                    href={STILLINGSOK_URL}
                    alt=""
                    onClick={klikkPaSokLedigeStillinger}
                    ikon={stillingsokIkon}
                    lenketekst="stillingsok-overskrift"
                />
            </div>
        );
    }
}
export default StillingSok;
