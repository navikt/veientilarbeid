import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import Innholdslaster from '../../innholdslaster/innholdslaster';
import { RegStatusState } from '../../ducks/krr';
import GenerellFeilmelding from '../feilmelding/generell-feilmelding';
import ReservertKrr from '../krr/reservert-krr';

interface SjekkKrrStatusProps {
    children: React.ReactNode;
    registreringStatus: RegStatusState;
}

function SjekkKrrStatus({children, registreringStatus }: SjekkKrrStatusProps) {
    return(
        <Innholdslaster
            avhengigheter={[registreringStatus]}
            className="innholdslaster"
            feilmeldingKomponent={(<GenerellFeilmelding/>)}
            storrelse="XXL"
        >
            {() => registreringStatus.data.reservertIKrr ? <ReservertKrr/> : children}
        </Innholdslaster>

    );
}

const mapStateToProps = (state: AppState) => ({
    registreringStatus: state.registreringStatus
});

export default connect(mapStateToProps)(SjekkKrrStatus);