import * as React from 'react';
import {Element, Innholdstittel} from 'nav-frontend-typografi';
import {FormattedMessage} from 'react-intl';

const cvSvg = require('./cv.svg');
const CV_PATH = '/cv';

function CV () {
        return (
            <div className="cv">
                <div className="cv__illustrasjon">
                    <img src={cvSvg} alt="cv-illustrasjon"/>
                </div>
                <div className="cv__tekst">
                    <Innholdstittel className="blokk-s">
                        <FormattedMessage id="overskrift-cv"/>
                    </Innholdstittel>
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