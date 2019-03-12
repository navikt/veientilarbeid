import * as React from 'react';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { FormattedHTMLMessage, FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { gaTilMeldekort } from '../../metrics';
import emailText from './email-text.svg';

import './meldekort.less';

class Meldekort extends React.Component<InjectedIntlProps> {
    render() {
        const linkCreator = (props: {}) => {
            return <a onClick={() => gaTilMeldekort} {...props}/>;
        };
        const {messages} = this.props.intl;
        const tekster = {
            meldekortUrl: messages['meldekort-url'],
        };

        return (
            <LenkepanelBase
                href={tekster.meldekortUrl}
                tittelProps="undertittel"
                linkCreator={linkCreator}
                border={true}
                className="meldekort"
            >
                <div className="lp-innhold">
                    <div className="lp-ikon">
                        <img src={emailText} alt="" />
                    </div>
                    <div className="lp-tekst">
                        <Systemtittel>
                            <FormattedHTMLMessage id="meldekort-lenke"/>
                        </Systemtittel>
                        <Normaltekst>
                            <FormattedMessage id="meldekort-beskrivelse"/>
                        </Normaltekst>
                    </div>
                </div>
            </LenkepanelBase>
        );
    }
}

export default injectIntl(Meldekort);
