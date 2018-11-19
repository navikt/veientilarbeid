import * as React from 'react';
import Side from '../../komponenter/side/side';
import AvsjekkBilde from './avsjekk-bilde';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import './fullfort-registrering-sykmeldt.less';

const handinfoSvg = require('./clipboard.svg');

type Props = RouteComponentProps<any>; // tslint:disable-line

const FullfortRegistreringSykmeldt: React.SFC<Props> = (props: Props) => {
    return (
        <Side
            bannerTittelId="fullfort-registrering-sykmeldt-banner-tittel"
            bannerBrodsmuleId="fullfort-registrering-sykmeldt-banner-brodsmule"
        >
            <main className="innhold registrert">
                <div className="registrert__avsjekk">
                    <AvsjekkBilde/>
                    <Systemtittel tag="h1" className="registrert__tittel">
                        <FormattedMessage id="fullfort-registrering-sykmeldt-innholdstittel"/>
                    </Systemtittel>
                </div>

                <div className="registrert__aksjonspanel">
                    <img src={handinfoSvg} alt="Hånd med info skilt" className="registrert__handinfo-ikon"/>
                    <div className="registrert__tekster">
                        <Systemtittel tag="h2" className="blokk-xs">
                            <FormattedMessage id="fullfort-registrering-sykmeldt-systemtittel"/>
                        </Systemtittel>
                        <Normaltekst className="blokk-s">
                            <FormattedMessage id="fullfort-registrering-sykmeldt-normaltekst"/>
                        </Normaltekst>
                        <Element className="blokk-s">
                            <FormattedMessage id="fullfort-registrering-sykmeldt-element"/>
                        </Element>
                        <div className="registrert__knapperad">
                            <button
                                onClick={() => props.history.push('/')}
                                className="registrert__lenke knapp knapp--standard"
                            >
                                <FormattedMessage id="fullfort-registrering-sykmeldt-knapp-ikke-na"/>
                            </button>
                            <a
                                href={'/fra-sykefravaer'}
                                className="registrert__lenke knapp knapp--hoved"
                            >
                                <FormattedMessage id="fullfort-registrering-sykmeldt-knapp-ja-vis-meg"/>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </Side>
    );
};

export default withRouter(FullfortRegistreringSykmeldt);
