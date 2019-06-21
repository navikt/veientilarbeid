import React, { useContext } from 'react';
import { Data, InnsatsgruppeContext } from '../../ducks/innsatsgruppe';
import { parse } from 'query-string';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import DesignMug from './design-mug';
import { gaTilAktivitetsplan } from '../../metrics';
import { aktivitetsplanLenke } from '../../innhold/lenker';

const Aktivitetsplan = () => {
    const nyRegistrering = parse(location.search).nyRegistrering === 'true';
    const overskrift = 'aktivitetsplan-overskrift-ordinaer';
    const ingress = 'aktivitetsplan-beskrivelse' + (nyRegistrering ? '-ny' : '');
    const innsatsgruppeData: Data | null = useContext(InnsatsgruppeContext).data;
    const innsatsgruppe = innsatsgruppeData ? innsatsgruppeData.servicegruppe : null;

    const handleClick = () => {
        gaTilAktivitetsplan(innsatsgruppe);
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
