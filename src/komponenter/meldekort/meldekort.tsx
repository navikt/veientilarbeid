import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedHTMLMessage, FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import LenkeMedChevron from '../lenke-med-chevron/lenke-med-chevron';
import { gaTilMeldekort } from '../../metrics';

import meldekort from './meldekort.svg';
import './meldekort.less';

class Meldekort extends React.Component<InjectedIntlProps> {
    render() {

        const {messages} = this.props.intl;
        const tekster = {
            meldekortUrl: messages['meldekort-url'],
        };

        return (
            <section className="meldekort blokk-xl">
                <div className="limit">
                    <div className="innhold">
                        <img
                            src={meldekort}
                            alt="Konvolutt med brev"
                            className="meldekort__bilde"
                        />
                        <div className="meldekort__innhold">
                            <Normaltekst className="meldekort__tekst">
                                <FormattedMessage id="meldekort-beskrivelse"/>
                            </Normaltekst>
                            <LenkeMedChevron
                                path={tekster.meldekortUrl}
                                className="meldekort__lenke"
                                onClick={gaTilMeldekort}
                            >
                                <FormattedHTMLMessage id="meldekort-lenke"/>
                            </LenkeMedChevron>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default injectIntl(Meldekort);
