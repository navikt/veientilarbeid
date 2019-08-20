import React from 'react';
import { klikkPaSokLedigeStillinger } from '../../metrics/metrics';
import StillingsokIkon from './svg/stillingsok';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { stillingLenke } from '../../innhold/lenker';
import { AppState } from '../../reducer';
import { ServicegruppeOrNull } from '../../ducks/oppfolging';
import { connect } from 'react-redux';

interface StateProps {
    servicegruppe: ServicegruppeOrNull;
}

const StillingSok = (props: StateProps) => {

    const { servicegruppe } = props;

    const handleClick = () => {
        klikkPaSokLedigeStillinger(servicegruppe);
    };

    return (
        <LenkepanelMedIkon
            href={stillingLenke}
            alt=""
            onClick={handleClick}
            overskrift="stillingsok-overskrift"
        >
            <StillingsokIkon/>
        </LenkepanelMedIkon>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    servicegruppe: state.oppfolging.data.servicegruppe,
});

export default connect(mapStateToProps)(StillingSok);
