import * as React from 'react';
import { Element, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import Lenkepanel from 'nav-frontend-lenkepanel';
import Sporreundersokelse from '../sporreundersokelse/sporreundersokelse';

const hvordansokejobber = require('./hvordansokejobber.svg');
const blibedrejobbsoker = require('./blibedrejobbsoker.svg');

function HvordanSokeJobber() {
    // TODO I overskrift-blibedrejobbsoker brukes det nobreakspace implisitt. Burde bruke &nbsp; i alle
    // TODO mellomrom etter tankestreken.
    return (
        <div className="hvordansokejobber-container">
            <Sporreundersokelse />
            <div className="hvordansokejobber">
                <Lenkepanel href="/veiviserarbeidssoker/?situasjon=mistet-jobben">
                    <img src={blibedrejobbsoker} alt="blibedrejobbsoker" className="hvordansokejobber__illustrasjon"/>
                    <div className="hvordansokejobber__tekster">
                        <Systemtittel className="blokk-xs">
                            <FormattedMessage id="overskrift-blibedrejobbsoker"/>
                        </Systemtittel>
                        <Element>
                            <FormattedMessage id="beskrivelse-blibedrejobbsoker"/>
                        </Element>
                    </div>
                </Lenkepanel>
                <Lenkepanel href="/jobbsokerkompetanse/">
                    <img src={hvordansokejobber} alt="hvordansokejobber" className="hvordansokejobber__illustrasjon"/>
                    <div className="hvordansokejobber__tekster">
                        <Systemtittel className="blokk-xs">
                            <FormattedMessage id="overskrift-hvordansokejobber"/>
                        </Systemtittel>
                        <Element>
                            <FormattedMessage id="beskrivelse-hvordansokejobber"/>
                        </Element>
                    </div>
                </Lenkepanel>
            </div>
        </div>
    );
}

export default HvordanSokeJobber;