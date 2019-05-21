import * as React from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { gaTilMeldekort } from '../../metrics';
import EmailText from './email-text';
import { meldekortLenke } from '../../innhold/lenker';

class Meldekort extends React.Component {
    render() {
        const overskrift = 'meldekort-overskrift';
        const ingress = 'meldekort-ingress';

        return (
            <LenkepanelMedIkon
                href={meldekortLenke}
                className="meldekort"
                alt=""
                onClick={gaTilMeldekort}
                overskrift={overskrift}
                ingress={ingress}
            >
                <EmailText />
            </LenkepanelMedIkon>
        );
    }
}

export default Meldekort;
