import * as React from 'react';
import { Element, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

const arbeidssokerSvg = require('./arbeidssoker.svg');
const VEIVISERARBEIDSSOKER_PATH = '/veiviserarbeidssoker/?situasjon=mistet-jobben';

function Arbeidssoker() {
    return (
        <div className="arbeidssoker-container">
            <div className="arbeidssoker">
                <div className="arbeidssoker__tekst">
                    <Systemtittel className="blokk-s">
                        <FormattedMessage id="overskrift-arbeidssoker"/>
                    </Systemtittel>
                    <Element className="blokk-m">
                        <FormattedMessage id="beskrivelse-arbeidssoker"/>
                    </Element>
                    <div className="nav-frontend-lenker">
                        <a href={VEIVISERARBEIDSSOKER_PATH} className="lenke">
                            <FormattedMessage id="lenke-arbeidssoker"/>
                        </a>
                        <i className="nav-frontend-chevron chevronboks chevron--hoyre"/>
                    </div>
                </div>
                <div className="arbeidssoker__illustrasjon">
                    <img src={arbeidssokerSvg} alt="arbeidssoker-illustrasjon"/>
                </div>
            </div>
        </div>
    );
}

export default Arbeidssoker;