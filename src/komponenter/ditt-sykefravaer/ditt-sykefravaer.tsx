import * as React from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { gaTilDittSykefravaer } from '../../metrics';
import plaster from './ditt-sykefravaer.svg';

const DITTSYKEFRAVAER_URL = '/sykefravaer/';

class DittSykefravaer extends React.Component {
    render() {
        const overskrift = 'ditt-sykefravaer-overskrift';
        const ingress = 'ditt-sykefravaer-ingress';

        return (
            <LenkepanelMedIkon
                href={DITTSYKEFRAVAER_URL}
                className='sykefravaer'
                alt=""
                onClick={gaTilDittSykefravaer}
                ikon={plaster}
                overskrift={overskrift}
                ingress={ingress}
            />
        );
    }
}

export default DittSykefravaer;
