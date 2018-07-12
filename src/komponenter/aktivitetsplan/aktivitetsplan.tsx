import * as React from 'react';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { parse } from 'query-string';
import LenkeMedChevron from '../lenke-med-chevron/lenke-med-chevron';

const aktivitetsplanSvg = require('./aktivitetsplan.svg');
export const AKTIVITETSPLAN_URL = '/aktivitetsplan/';

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
        const beskrivelseTekstId = this.state.nyRegistrering ? 'beskrivelse-komigang-ny' : 'beskrivelse-komigang';
        return (
            <div className="aktivitetsplan">
                <img
                    src={aktivitetsplanSvg}
                    alt="aktivitetsplan-illustrasjon"
                    className="aktivitetsplan__illustrasjon"
                />
                <div className="aktivitetsplan__tekst">
                    <Innholdstittel tag="h2" className="blokk-m">
                        <FormattedMessage id="overskrift-komigang"/>
                    </Innholdstittel>
                    <Ingress className="blokk-l">
                        <FormattedMessage id={beskrivelseTekstId}/>
                    </Ingress>
                    <LenkeMedChevron path={AKTIVITETSPLAN_URL} className="aktivitetsplan__lenke-container">
                        <FormattedMessage id="lenke-komigang"/>
                    </LenkeMedChevron>
                </div>
            </div>
        );
    }
}

export default Aktivitetsplan;