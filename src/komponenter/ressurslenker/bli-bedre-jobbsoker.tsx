import * as React from 'react';
import { Element, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import Lenkepanel from 'nav-frontend-lenkepanel';

const blibedrejobbsoker = require('./bli-bedre-jobbsoker.svg');

export default function BliBedreJobbsoker() {
    return (
        <Lenkepanel href="/veiviserarbeidssoker/?situasjon=mistet-jobben">
            <div>
                <img
                    src={blibedrejobbsoker}
                    alt="blibedrejobbsoker"
                    className="ressurslenker__illustrasjon"
                />
            </div>
            <div className="ressurslenker__tekster">
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