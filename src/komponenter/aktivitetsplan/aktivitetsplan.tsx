import React from 'react';
import { parse } from 'query-string';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import DesignMug from './design-mug';
import { gaTilAktivitetsplan } from '../../metrics/metrics';
import { aktivitetsplanLenke } from '../../innhold/lenker';
import { OppfolgingContext } from '../../ducks/oppfolging';

const Aktivitetsplan = () => {
    const servicegruppe = React.useContext(OppfolgingContext).data.servicegruppe;

    const nyRegistrering = parse(location.search).nyRegistrering === 'true';
    const overskrift = 'aktivitetsplan-overskrift-ordinaer';
    const ingress = 'aktivitetsplan-beskrivelse' + (nyRegistrering ? '-ny' : '');

    const handleClick = () => {
        gaTilAktivitetsplan(servicegruppe);
    };

    return (
        <LenkepanelMedIkon
            href={aktivitetsplanLenke}
            alt=""
            onClick={handleClick}
            overskrift={overskrift}
            ingress={ingress}
            className="aktivitetsplanPanel"
        >
            <DesignMug/>
        </LenkepanelMedIkon>
    );
}

export default Aktivitetsplan;
