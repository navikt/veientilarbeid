import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Element } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

const aktivitetsplanSvg = require('./aktivitetsplan.svg');
const AKTIVITETSPLAN_PATH = '/aktivitetsplan';

function Komigang() {
    return (
        <div className="komigang">
            <div className="komigang__tekst">
                <Innholdstittel className="blokk-s">
                    <FormattedMessage id="overskrift-komigang"/>
                </Innholdstittel>
                <Element className="blokk-s">
                    <FormattedMessage id="beskrivelse-komigang"/>
                </Element>
                <div className="nav-frontend-lenker">
                    <a href={AKTIVITETSPLAN_PATH} className="lenke">
                        <FormattedMessage id="lenke-komigang"/>
                    </a>
                    <i className="nav-frontend-chevron chevronboks chevron--hoyre" />
                </div>
            </div>
            <div className="komigang__illustrasjon">
                <img src={aktivitetsplanSvg} alt="aktivitetsplan-illustrasjon"/>
            </div>
        </div>
    );
}

export default Komigang;