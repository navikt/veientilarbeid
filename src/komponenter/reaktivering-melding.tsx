import * as React from 'react';
import { connect } from 'react-redux';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { AppState } from '../reducer';
import { reaktiveringLenke } from '../innhold/lenker';
import tekster from '../tekster/tekster';

interface StateProps {
    kanReaktiveres: boolean;
}

type Props = StateProps;

class ReaktiveringMelding extends React.Component<Props> {
    render() {
        const {kanReaktiveres} = this.props;

        if (!kanReaktiveres) {
            return null;
        }
        return (
            <section className="reaktivering-melding blokk-m">
                <AlertStripeAdvarsel>
                    <Normaltekst>
                        {tekster['reaktivering-melding-tekst']}&ensp;
                        <a href={reaktiveringLenke} className="lenke">
                            {tekster['reaktivering-melding-lenke-tekst']}
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

export default connect(mapStateToProps)(ReaktiveringMelding);
