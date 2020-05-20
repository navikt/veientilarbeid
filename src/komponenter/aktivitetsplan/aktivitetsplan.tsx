import React from 'react';
import { parse } from 'query-string';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import DesignMug from './design-mug';
import { gaTilAktivitetsplan, loggAktivitet } from '../../metrics/metrics';
import { aktivitetsplanLenke } from '../../innhold/lenker';
import { OppfolgingContext } from '../../ducks/oppfolging';

const Aktivitetsplan = (props: any) => {
    const servicegruppe = React.useContext(OppfolgingContext).data.servicegruppe;
    const { location } = window
    const nyRegistrering = parse(location.search).nyRegistrering === 'true';
    const overskrift = 'aktivitetsplan-overskrift-ordinaer';
    const ingress = 'aktivitetsplan-beskrivelse' + (nyRegistrering ? '-ny' : '');
    const { poaGruppe } = props

    const handleClick = () => {
        gaTilAktivitetsplan(servicegruppe);
        loggAktivitet({ aktivitet: 'Går til aktivitetsplanen', gruppe: poaGruppe})
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
