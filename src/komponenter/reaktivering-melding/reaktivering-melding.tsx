import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import AlertStripe from 'nav-frontend-alertstriper';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';

interface StateProps {
    kanReaktiveres: boolean;
}

type Props = StateProps & InjectedIntlProps;

class ReaktiveringMelding extends React.Component<Props> {
    render() {
        const {kanReaktiveres, intl} = this.props;

        if (!kanReaktiveres) {
            return null;
        }
        return (
            <AlertStripe type="advarsel" className="reaktivering-melding">
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
    kanReaktiveres: !!state.oppfolging.data.kanReaktiveres,
});

export default connect(mapStateToProps)(injectIntl(ReaktiveringMelding));