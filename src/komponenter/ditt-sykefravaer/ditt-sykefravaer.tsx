import React from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { gaTilDittSykefravaer } from '../../metrics/metrics';
import Plaster from './plaster';
import { sykefravaerLenke } from '../../innhold/lenker';
import { BrukerInfoContext } from '../../ducks/bruker-info';
import { OppfolgingContext } from '../../ducks/oppfolging';

const DittSykefravaer = () => {
    const { erSykmeldtMedArbeidsgiver } = React.useContext(BrukerInfoContext).data;
    const servicegruppe = React.useContext(OppfolgingContext).data.servicegruppe;

    const kanViseKomponent = erSykmeldtMedArbeidsgiver;
    if (!kanViseKomponent) {
        return null;
    }

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
            <Plaster />
        </LenkepanelMedIkon>
    );
};

export default DittSykefravaer;
