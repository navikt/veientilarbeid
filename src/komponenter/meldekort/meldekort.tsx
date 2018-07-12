import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import LenkeMedChevron from '../lenke-med-chevron/lenke-med-chevron';

const meldekort = require('./meldekort.svg');

export const MELDEKORT_URL = 'https://www.nav.no/no/Person/Arbeid/Dagpenger+ved+arbeidsloshet+og+permittering/Meldekort+hvordan+gjor+du+det/Slik+sender+du+elektroniske+meldekort'; // tslint:disable-line

class Meldekort extends React.Component {
    render() {
        return (
            <div className="meldekort">
                <img
                    src={meldekort}
                    alt="Konvolutt med brev"
                    className="meldekort__bilde"
                />
                <div className="meldekort__innhold">
                    <Normaltekst className="blokk-xs">
                        <FormattedMessage id="beskrivelse-meldekort"/>
                    </Normaltekst>
                    <LenkeMedChevron path={MELDEKORT_URL} className="meldekort__lenke">
                        Gå til meldekort
                    </LenkeMedChevron>
                </div>
            </div>
        );
    }
}

export default Meldekort;