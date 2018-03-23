import * as React from 'react';
import { Element, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

const cvSvg = require('./cv.svg');
export const CV_PATH = '/sbl/nav_security_check?goto=/sbl/arbeid/endreCv';

function CV () {
        return (
            <div className="cv">
                <div className="cv__illustrasjon">
                    <img src={cvSvg} alt="cv-illustrasjon"/>
                </div>
                <div className="cv__tekst">
                    <Systemtittel className="blokk-s">
                        <FormattedMessage id="overskrift-cv"/>
                    </Systemtittel>
                    <Element className="blokk-m">
                        <FormattedMessage id="beskrivelse-cv"/>
                    </Element>
                    <div className="nav-frontend-lenker">
                        <a href={CV_PATH} className="lenke">
                            <FormattedMessage id="lenke-cv"/>
                        </a>
                        <i className="nav-frontend-chevron chevronboks chevron--hoyre"/>
                    </div>
                </div>
            </div>
        );
}

export default CV;