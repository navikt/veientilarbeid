import React from 'react';
import { klikkPaSokLedigeStillinger, loggAktivitet } from '../../metrics/metrics';
import StillingsokIkon from './svg/stillingsok';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { stillingLenke } from '../../innhold/lenker';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { POAGruppe } from '../../utils/get-poa-group';

interface OwnProps {
    poaGruppe: POAGruppe;
    geografiskTilknytning: string;
    isKSSX: string;
}

const StillingSok = (props: OwnProps) => {
    const servicegruppe = React.useContext(OppfolgingContext).data.servicegruppe;
    const { poaGruppe, geografiskTilknytning, isKSSX } = props;

    const handleClick = () => {
        klikkPaSokLedigeStillinger(servicegruppe);
        loggAktivitet({ aktivitet: 'Går til ledige stillinger', gruppe: poaGruppe, geografiskTilknytning, isKSSX });
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

export default StillingSok;
