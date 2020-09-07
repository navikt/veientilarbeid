import React from 'react';
import { gaTilCV, loggAktivitet } from '../../metrics/metrics';
import CvIkon from './svg/cv';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { cvLenke } from '../../innhold/lenker';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { POAGruppe } from '../../utils/get-poa-group';

interface OwnProps {
    poaGruppe: POAGruppe;
    geografiskTilknytning: string;
    isKSSX: string;
}

const CV = (props: OwnProps) => {
    const servicegruppe = React.useContext(OppfolgingContext).data.servicegruppe;
    const { poaGruppe, geografiskTilknytning, isKSSX } = props;

    const handleClick = () => {
        gaTilCV(servicegruppe);
        loggAktivitet({ aktivitet: 'Går til CV', gruppe: poaGruppe, geografiskTilknytning, isKSSX });
    };

    return (
        <LenkepanelMedIkon
            href={cvLenke}
            alt=""
            onClick={handleClick}
            overskrift="cv-overskrift"
        >
            <CvIkon/>
        </LenkepanelMedIkon>
    );
}

export default CV;
