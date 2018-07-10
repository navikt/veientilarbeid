import * as React from 'react';
import { Element, Innholdstittel } from 'nav-frontend-typografi';
import { HoyreChevron } from 'nav-frontend-chevron';
import { FormattedMessage } from 'react-intl';
import { parse } from 'query-string';

const aktivitetsplanSvg = require('./aktivitetsplan.svg');
export const AKTIVITETSPLAN_URL = '/aktivitetsplan/';

interface State {
    nyRegistrering: boolean;
}

class Komigang extends React.PureComponent<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            nyRegistrering: parse(location.search).nyRegistrering === 'true'
        };
    }

    render() {
        const beskrivelseTekstId = this.state.nyRegistrering ? 'beskrivelse-komigang-ny' : 'beskrivelse-komigang';
        return (
            <div className="komigang-container">
                <div className="komigang">
                    <div className="komigang__illustrasjon">
                        <img src={aktivitetsplanSvg} alt="aktivitetsplan-illustrasjon" className="illustrasjon"/>
                    </div>
                    <div className="komigang__tekst">
                        <Innholdstittel tag="h2" className="blokk-s">
                            <FormattedMessage id="overskrift-komigang"/>
                        </Innholdstittel>
                        <Element className="blokk-m">
                            <FormattedMessage id={beskrivelseTekstId}/>
                        </Element>
                        <div className="nav-frontend-lenker">
                            <a href={AKTIVITETSPLAN_URL} className="lenke">
                                <FormattedMessage id="lenke-komigang"/>
                            </a>
                            <HoyreChevron />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Komigang;