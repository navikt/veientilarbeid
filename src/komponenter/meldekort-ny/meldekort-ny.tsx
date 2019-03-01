import * as React from 'react';
import './meldekort-ny.less';
import meldekortIkon from './meldekort-ny.svg';
import LenkepanelMedIkon from '../lenkepanel-med-bilde/lenkepanel-med-ikon';
import { gaTilDialog } from '../../metrics';

export const MELDEKORT_URL = 'https://www.nav.no/no/Person/Arbeid/Dagpenger+ved+arbeidsloshet+og+permittering/Meldekort+hvordan+gjor+du+det/Slik+sender+du+elektroniske+meldekort'; // tslint:disable-line

class Meldekort extends React.Component  {
    render() {
        return (
            <section className="meldekort">
                <LenkepanelMedIkon
                    href={MELDEKORT_URL}
                    alt=""
                    onClick={gaTilDialog}
                    ikon={meldekortIkon}
                    lenketekst="meldekort-ny"
                />
            </section>
        );
    }
}
export default Meldekort;
