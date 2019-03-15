import * as React from 'react';
import { parse } from 'query-string';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import designMug from './design-mug.svg';
import { gaTilAktivitetsplan } from '../../metrics';

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
        const url = '/aktivitetsplan/';

        return (
            <LenkepanelMedIkon
                href={url}
                alt=""
                onClick={gaTilAktivitetsplan}
                ikon={designMug}
                overskrift={overskrift}
                ingress={ingress}
            />
        );
    }
}

export default Aktivitetsplan;
