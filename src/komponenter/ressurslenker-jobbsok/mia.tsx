import React from 'react';
import { gaTilMIA } from '../../metrics';
import MiaIkon from './svg/mia';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { miaLenke } from '../../innhold/lenker';
import { ServicegruppeOrNull } from '../../ducks/oppfolging';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';

interface StateProps {
    servicegruppe: ServicegruppeOrNull;
}

const Mia = (props: StateProps) => {

    const { servicegruppe } = props;

    const handleClick = () => {
        gaTilMIA(servicegruppe);
    };
    
    return (
        <LenkepanelMedIkon
            href={miaLenke}
            alt=""
            onClick={handleClick}
            overskrift="mia-overskrift"
        >
            <MiaIkon/>
        </LenkepanelMedIkon>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    servicegruppe: state.oppfolging.data.servicegruppe,
});

export default connect(mapStateToProps)(Mia);
