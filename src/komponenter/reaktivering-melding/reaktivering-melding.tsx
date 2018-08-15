import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import AlertStripe from 'nav-frontend-alertstriper';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';

interface StateProps {
    kreverReaktivering: boolean;
}

type Props = StateProps & InjectedIntlProps;

class ReaktiveringMelding extends React.Component<Props> {
    render() {
        const {kreverReaktivering, intl} = this.props;

        if (!kreverReaktivering) {
            return null;
        }
        return (
            <AlertStripe type="stopp" className="reaktivering-melding">
                <Normaltekst>
                    {intl.messages['reaktivering-melding-tekst']}&ensp;
                    <a href={intl.messages['reaktivering-melding-lenke-url']} className="lenke">
                        {intl.messages['reaktivering-melding-lenke-tekst']}
                    </a>
                </Normaltekst>
            </AlertStripe>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    kreverReaktivering: !!state.oppfolging.data.kreverReaktivering,
});

export default connect(mapStateToProps)(injectIntl(ReaktiveringMelding));