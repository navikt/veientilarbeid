import * as React from 'react';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import Lenkepanel from 'nav-frontend-lenkepanel';

import tiltakinfo from './tiltakinfo.svg';
import './tiltakinfo.less';

export const TILTAKINFO_URL = '/tiltakinfo';

class Tiltakinfo extends React.Component {
    render() {
        return (
            <section className="tiltakinfo">
                <Lenkepanel tittelProps="undertittel" href={TILTAKINFO_URL}>
                    <div className="tiltakinfo__innhold">
                        <div className="tiltakinfo__bilde">
                            <img
                                src={tiltakinfo}
                                alt="Hånd med forstørrelsesglass"
                            />
                        </div>

                        <div className="tiltakinfo__tekst">
                            <Systemtittel tag="h2" className="informasjonsmodul__heading blokk-s">
                                <FormattedMessage id="tiltakinfo-tittel"/>
                            </Systemtittel>
                            <Normaltekst className="ingress__tekst">
                                <FormattedMessage id="tiltakinfo-ingress"/>
                            </Normaltekst>
                        </div>
                    </div>
                </Lenkepanel>
            </section>
        );
    }
}

export default Tiltakinfo;
