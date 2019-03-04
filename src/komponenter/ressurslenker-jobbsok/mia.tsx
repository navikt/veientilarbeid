import * as React from 'react';
import { gaTilMIA } from '../../metrics';
import miaIkon from './svg/mia.svg';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';

const MIA_URL = 'https://mia.nav.no';

class Mia extends React.Component {
    render() {
        return (
            <div className="mia">
                <LenkepanelMedIkon
                    href={MIA_URL}
                    alt=""
                    onClick={gaTilMIA}
                    ikon={miaIkon}
                    lenketekst="mia-overskrift"
                />
            </div>
        );
    }
}
export default Mia;