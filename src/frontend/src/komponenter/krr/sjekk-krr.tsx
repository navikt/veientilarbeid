import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import Innholdslaster from '../../innholdslaster/innholdslaster';
import { RegStatusState } from '../../ducks/hent-registrering-status';
import ReserverKrr from './reservert-krr';

interface SjekkKrrStatusProps {
    children: React.ReactNode;
    registreringStatus: RegStatusState;
}

function SjekkKrrStatus({children, registreringStatus }: SjekkKrrStatusProps) {
    return(
        <Innholdslaster
            avhengigheter={[registreringStatus]}
            className="innholdslaster"
            feilmeldingKomponent={(<ReserverKrr/>)}
            storrelse="XXL"
        >
            {() => registreringStatus.data.reservertKRR ? <ReserverKrr/> : children}
        </Innholdslaster>

    );
}

const mapStateToProps = (state: AppState) => ({
    registreringStatus: state.registreringStatus
});

export default connect(mapStateToProps)(SjekkKrrStatus);