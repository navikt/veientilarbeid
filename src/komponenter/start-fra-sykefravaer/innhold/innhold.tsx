import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import AvsjekkBilde from './avsjekk-bilde';
const handinfoSvg = require('./clipboard.svg');
import { RouteComponentProps, withRouter } from 'react-router';
import './innhold.less';
import './registrert.less';

type Props = RouteComponentProps<any>; // tslint:disable-line

const Innhold: React.SFC<Props> = (props: Props) => {
    return (
        <section className="innhold__wrapper">
            <div className="innhold registrert">
                <div className="registrert__avsjekk">
                    <AvsjekkBilde/>
                    <Systemtittel tag="h1" className="registrert__tittel">
                        <FormattedMessage id="duernaregistrert-innholdstittel"/>
                    </Systemtittel>
                </div>

                <div className="registrert__aksjonspanel">
                    <img src={handinfoSvg} alt="Hånd med info skilt" className="registrert__handinfo-ikon"/>
                    <div className="registrert__tekster">
                        <Systemtittel tag="h2" className="blokk-xs">
                            <FormattedMessage id="duernaregistrert-systemtittel"/>
                        </Systemtittel>
                        <Normaltekst className="blokk-s">
                            <FormattedMessage id="duernaregistrert-normaltekst"/>
                        </Normaltekst>
                        <Element className="blokk-s">
                            <FormattedMessage id="duernaregistrert-element"/>
                        </Element>
                        <div className="registrert__knapperad">
                            <button
                                onClick={() => props.history.push('oppfolging')}
                                className="registrert__lenke knapp knapp--standard"
                            >
                                <FormattedMessage id="knapp-ikke-na"/>
                            </button>
                            <a
                                href={'/fra-sykefravaer'}
                                className="registrert__lenke knapp knapp--hoved"
                            >
                                <FormattedMessage id="knapp-ja-vis-meg"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default withRouter(Innhold);
