import * as React from 'react';
import { Element, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import Lenkepanel from 'nav-frontend-lenkepanel';

const hvordansokejobber = require('./hvordan-soke-jobber.svg');

export default function HvordanSokeJobber() {
    return (
        <Lenkepanel className="ressurslenke" href="/jobbsokerkompetanse/">
            <div>
                <img
                    src={hvordansokejobber}
                    alt="hvordansokejobber"
                    className="ressurslenke__illustrasjon"
                />
            </div>
            <div className="ressurslenke__tekst">
                <Systemtittel className="blokk-xs">
                    <FormattedMessage id="overskrift-hvordansokejobber"/>
                </Systemtittel>
                <Element>
                    <FormattedMessage id="beskrivelse-hvordansokejobber"/>
                </Element>
            </div>
        </Lenkepanel>
    );
}