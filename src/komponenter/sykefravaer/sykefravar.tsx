import * as React from 'react';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { parse } from 'query-string';
import LenkeMedChevron from '../lenke-med-chevron/lenke-med-chevron';

const sykefravarSvg = require('./sykefravar.svg');
export const SYKEFRAVAR_URL = '/sykefravar/';

interface State {
    nyRegistrering: boolean;
}

class Aktivitetsplan extends React.PureComponent<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            nyRegistrering: parse(location.search).nyRegistrering === 'true'
        };
    }

    render() {
        const beskrivelseTekstId = 'sykefravar-beskrivelse' + (this.state.nyRegistrering ? '-ny' : '');
        return (
            <div className="sykefravar">
                <img
                    src={sykefravarSvg}
                    alt="sykefravar-illustrasjon"
                    className="sykefravar__illustrasjon"
                />
                <div className="sykefravar__tekst">
                    <Innholdstittel tag="h2" className="sykefravar__overskrift" >
                        <FormattedMessage id="sykefravar-overskrift"/>
                    </Innholdstittel>
                    <Ingress >
                        <FormattedMessage id={beskrivelseTekstId}/>
                    </Ingress>
                    <LenkeMedChevron path={SYKEFRAVAR_URL} className="sykefravar__lenke">
                        <FormattedMessage id="sykefravar-lenke"/>
                    </LenkeMedChevron>
                </div>
            </div>
        );
    }
}

export default Aktivitetsplan;