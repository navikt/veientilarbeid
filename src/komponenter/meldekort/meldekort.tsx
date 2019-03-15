import * as React from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { gaTilMeldekort } from '../../metrics';
import emailText from './email-text.svg';

class Meldekort extends React.Component {
    render() {
        const overskrift = 'meldekort-overskrift';
        const ingress = 'meldekort-ingress';
        const url = 'meldekort-url';

        return (
            <LenkepanelMedIkon
                href={url}
                className='meldekort'
                alt=""
                onClick={gaTilMeldekort}
                ikon={emailText}
                overskrift={overskrift}
                ingress={ingress}
            />
        );
    }
}

export default Meldekort;
