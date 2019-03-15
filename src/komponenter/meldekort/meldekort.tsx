import * as React from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { gaTilMeldekort } from '../../metrics';
import emailText from './email-text.svg';

const MELDEKORT_URL = 'https://www.nav.no/no/Person/Arbeid/Dagpenger+ved+arbeidsloshet+og+permittering/Meldekort+hvordan+gjor+du+det/Slik+sender+du+elektroniske+meldekort';

class Meldekort extends React.Component {
    render() {
        const overskrift = 'meldekort-overskrift';
        const ingress = 'meldekort-ingress';

        return (
            <LenkepanelMedIkon
                href={MELDEKORT_URL}
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
