import * as React from 'react';
import { Element, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import Lenkepanel from 'nav-frontend-lenkepanel';

const hvordansokejobber = require('./hvordan-soke-jobber.svg');

export default function MuligheterIArbeidsmarkedet() {
    return (
        <Lenkepanel href="/muligheter-i-arbeidsmarkedet/">
            <div>
                <img
                    src={hvordansokejobber}
                    alt="Forstørrelsesglass"
                    className="ressurslenker__illustrasjon"
                />
            </div>
            <div className="ressurslenker__tekster">
                <Systemtittel className="blokk-xs">
                    <FormattedMessage id="mia-overskrift"/>
                </Systemtittel>
                <Element>
                    <FormattedMessage id="mia-beskrivelse"/>
                </Element>
            </div>
        </Lenkepanel>
    );
}