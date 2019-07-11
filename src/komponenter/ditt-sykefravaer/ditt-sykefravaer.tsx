import React from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { gaTilDittSykefravaer } from '../../metrics';
import Plaster from './plaster';
import { sykefravaerLenke } from '../../innhold/lenker';
import { ServicegruppeOrNull } from '../../ducks/oppfolging';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';

const DittSykefravaer = (servicegruppe: ServicegruppeOrNull) => {
    const overskrift = 'ditt-sykefravaer-overskrift';
    const ingress = 'ditt-sykefravaer-ingress';

    const handleClick = () => {
        gaTilDittSykefravaer(servicegruppe);
    };

    return (
        <LenkepanelMedIkon
            href={sykefravaerLenke}
            className="sykefravaer"
            alt=""
            onClick={handleClick}
            overskrift={overskrift}
            ingress={ingress}
        >
            <Plaster/>
        </LenkepanelMedIkon>
    );
}

const mapStateToProps = (state: AppState): ServicegruppeOrNull => state.oppfolging.data.servicegruppe;

export default connect(mapStateToProps)(DittSykefravaer);
