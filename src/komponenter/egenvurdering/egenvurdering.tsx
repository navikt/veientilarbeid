import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';
import { seEgenvurdering, gaTilEgenvurdering} from '../../metrics';
import { AppState } from "../../reducer";
import { connect } from "react-redux";
import { ForeslattInnsatsgruppe, selectForeslattInnsatsgruppe, selectOpprettetRegistreringDato } from "../../ducks/brukerregistrering";

import './egenvurdering.less';

export const finnAntallTimerSidenRegistrering = (opprettetRegistreringsdato: Date) : number => {
    const oneHour_ms = 1000*60*60;
    const opprettetDato_ms = opprettetRegistreringsdato.getTime();
    const naatid_ms = Date.now();
    const difference_ms = naatid_ms - opprettetDato_ms;
    return Math.round(difference_ms/oneHour_ms);
};

interface StateProps {
    foreslattInnsatsgruppe: ForeslattInnsatsgruppe;
    opprettetRegistreringDato: Date;
}

type EgenvurderingProps = StateProps & InjectedIntlProps;

class Egenvurdering extends React.Component<EgenvurderingProps> {

    componentDidMount() {
        seEgenvurdering(this.props.foreslattInnsatsgruppe);
    }

    handleButtonClick = () => {
        gaTilEgenvurdering(finnAntallTimerSidenRegistrering(this.props.opprettetRegistreringDato), this.props.foreslattInnsatsgruppe);
        window.location.href = this.props.intl.formatMessage({id: 'egenvurdering-lenke-url'});
    };

    render() {
        return (
            <section className="egenvurdering blokk-m">
                <div className="innhold">
                    <Systemtittel tag="h1" className="blokk-xs">
                        <FormattedMessage id="egenvurdering-tittel"/>
                    </Systemtittel>
                    <Normaltekst className="blokk-m egenvurdering__tekst">
                        <FormattedMessage id="egenvurdering-tekst"/>
                    </Normaltekst>
                    <Hovedknapp onClick={this.handleButtonClick}>
                        <FormattedMessage id="egenvurdering-lenke-tekst"/>
                    </Hovedknapp>
                </div>
            </section>
        );
    }
};

const mapStateToProps = (state: AppState): StateProps => ({
    foreslattInnsatsgruppe: selectForeslattInnsatsgruppe(state),
    opprettetRegistreringDato: new Date(selectOpprettetRegistreringDato(state)),

});

export default connect(mapStateToProps) (injectIntl(Egenvurdering));