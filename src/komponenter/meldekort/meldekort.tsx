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
            <section className="meldekort">
                <LenkepanelBase
                    href={tekster.meldekortUrl}
                    tittelProps="undertittel"
                    linkCreator={linkCreator}
                    border={true}
                >
                    <div className="meldekort__innhold">
                        <img
                            src={emailText}
                            className="dialog__ikon"
                            alt=""
                        />
                        <div>
                            <Systemtittel>
                                <FormattedHTMLMessage id="meldekort-lenke"/>
                            </Systemtittel>
                            <Normaltekst className="meldekort__tekst">
                                <FormattedMessage id="meldekort-beskrivelse"/>
                            </Normaltekst>
                        </div>
                    </div>
                </LenkepanelBase>
            </section>
        );
    }
}

export default injectIntl(Meldekort);
