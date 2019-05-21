import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { AppState } from '../reducer';
import { reaktiveringLenke } from '../innhold/lenker';

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
            <section className="reaktivering-melding blokk-m">
                <AlertStripeAdvarsel>
                    <Normaltekst>
                        {intl.messages['reaktivering-melding-tekst']}&ensp;
                        <a href={reaktiveringLenke} className="lenke">
                            {intl.messages['reaktivering-melding-lenke-tekst']}
                        </a>
                    </Normaltekst>
                </AlertStripeAdvarsel>
            </section>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    kanReaktiveres: !!state.oppfolging.data.kanReaktiveres,
});

export default connect(mapStateToProps)(injectIntl(ReaktiveringMelding));
