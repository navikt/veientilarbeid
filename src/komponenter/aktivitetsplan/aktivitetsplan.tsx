import * as React from 'react';
import { parse } from 'query-string';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import DesignMug from './design-mug';
import { gaTilAktivitetsplan } from '../../metrics';
import { erMikrofrontend } from '../../utils/app-state-utils';

interface State {
    nyRegistrering: boolean;
}

interface AktivitetsplanProps {
}

class Aktivitetsplan extends React.PureComponent<AktivitetsplanProps, State> {
    constructor(props: AktivitetsplanProps) {
        super(props);
        this.state = {
            nyRegistrering: parse(location.search).nyRegistrering === 'true'
        };
    }

    render() {
        const overskrift = 'aktivitetsplan-overskrift-ordinaer';
        const ingress = 'aktivitetsplan-beskrivelse' + (this.state.nyRegistrering ? '-ny' : '');
        const url = erMikrofrontend() ? '/person/dittnav/veientilarbeid/aktivitetsplan' : '/aktivitetsplan/';

        return (
            <LenkepanelMedIkon
                href={url}
                alt=""
                onClick={gaTilAktivitetsplan}
                overskrift={overskrift}
                ingress={ingress}
            >
                <DesignMug/>
            </LenkepanelMedIkon>
        );
    }
}

export default Aktivitetsplan;
