import * as React from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { gaTilDittSykefravaer } from '../../metrics';
import Plaster from './plaster';
import { sykefravaerLenke } from '../../innhold/lenker';

class DittSykefravaer extends React.Component {
    render() {
        const overskrift = 'ditt-sykefravaer-overskrift';
        const ingress = 'ditt-sykefravaer-ingress';

        return (
            <LenkepanelMedIkon
                href={sykefravaerLenke}
                className="sykefravaer"
                alt=""
                onClick={gaTilDittSykefravaer}
                overskrift={overskrift}
                ingress={ingress}
            >
                <Plaster/>
            </LenkepanelMedIkon>
        );
    }
}

export default DittSykefravaer;
