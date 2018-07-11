import * as React from 'react';
import { Element, Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { parse } from 'query-string';
import LenkeMedChevron from '../lenke-med-chevron/lenke-med-chevron';

const aktivitetsplanSvg = require('./aktivitetsplan.svg');
export const AKTIVITETSPLAN_URL = '/aktivitetsplan/';

interface State {
    nyRegistrering: boolean;
}

class Aktivitetsplanen extends React.PureComponent<{}, State> {
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
                    <Element className="blokk-l">
                        <FormattedMessage id={beskrivelseTekstId}/>
                    </Element>
                    <LenkeMedChevron path={AKTIVITETSPLAN_URL} className="aktivitetsplan__lenke-container">
                        <FormattedMessage id="lenke-komigang"/>
                    </LenkeMedChevron>
                </div>
            </div>
        );
    }
}

export default Aktivitetsplanen;