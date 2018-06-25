import * as React from 'react';
import { Element, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import Lenkepanel from 'nav-frontend-lenkepanel';

const blibedrejobbsoker = require('./bli-bedre-jobbsoker.svg');

export default function BliBedreJobbsoker() {
    return (
        <Lenkepanel className="ressurslenke" href="/veiviserarbeidssoker/?situasjon=mistet-jobben">
            <div className="ressurslenke__illustrasjon-wrapper">
                <img
                    src={blibedrejobbsoker}
                    alt="blibedrejobbsoker"
                    className="ressurslenke__illustrasjon"
                />
            </div>
            <div className="ressurslenke__tekst">
                <Systemtittel className="blokk-xs">
                    <FormattedMessage id="overskrift-blibedrejobbsoker"/>
                </Systemtittel>
                <Element>
                    <FormattedMessage id="beskrivelse-blibedrejobbsoker"/>
                </Element>
            </div>
        </Lenkepanel>
    );
}