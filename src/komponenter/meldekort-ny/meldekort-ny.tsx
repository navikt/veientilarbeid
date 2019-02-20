import * as React from 'react';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import { Systemtittel } from 'nav-frontend-typografi';
import './meldekort-ny.less';
import meldekortIkon from './meldekort-ny.svg';

export const MELDEKORT_URL = 'https://www.nav.no/no/Person/Arbeid/Dagpenger+ved+arbeidsloshet+og+permittering/Meldekort+hvordan+gjor+du+det/Slik+sender+du+elektroniske+meldekort'; // tslint:disable-line

class Meldekort extends React.Component  {
    render() {
        return (
            <section className="meldekort">
                <LenkepanelBase href={MELDEKORT_URL} tittelProps="undertittel" border={true}>
                    <div className="meldekort__innhold">
                        <img
                            src={meldekortIkon}
                            className="meldekort__ikon"
                            alt="meldekort-ikon"
                        />
                        <Systemtittel className="meldekort__tittel">
                            Send meldekort
                        </Systemtittel>
                    </div>
                </LenkepanelBase>
            </section>
        );
    }
}

export default Meldekort;
