import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler';
import { FormattedMessage } from 'react-intl';
import { seEgenvurdering, gaTilEgenvurdering } from '../../metrics';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';
import { ForeslattInnsatsgruppe, selectForeslattInnsatsgruppe, selectOpprettetRegistreringDato } from '../../ducks/brukerregistrering';

import './egenvurdering.less';
import { behovsvurderingLenke } from '../../innhold/lenker';

export const antallTimerMellomAOgBRundetOpp = (a: Date, b: Date): number => {
    return Math.ceil((b.getTime() - a.getTime()) / 36e5);
};

export const antallTimerSidenRegistrering = (registreringsDato: Date) => {
    return antallTimerMellomAOgBRundetOpp(registreringsDato, new Date());
};

interface StateProps {
    foreslattInnsatsgruppe: ForeslattInnsatsgruppe;
    opprettetRegistreringDato: Date | null;
}

type EgenvurderingProps = StateProps;

class Egenvurdering extends React.Component<EgenvurderingProps> {

    componentDidMount() {
        seEgenvurdering(this.props.foreslattInnsatsgruppe);
    }

    handleButtonClick = () => {
        const { opprettetRegistreringDato, foreslattInnsatsgruppe } = this.props;

        gaTilEgenvurdering(antallTimerSidenRegistrering(opprettetRegistreringDato!), foreslattInnsatsgruppe);
        window.location.href = behovsvurderingLenke;
    };

    render() {
        return (
            <Panel border className="ramme blokk-m">
                <section className="egenvurdering">
                    <div className="innhold">
                        <Systemtittel tag="h2" className="blokk-xs">
                            <FormattedMessage id="egenvurdering-tittel"/>
                        </Systemtittel>
                        <Normaltekst className="blokk-s egenvurdering__tekst">
                            <FormattedMessage id="egenvurdering-tekst"/>
                        </Normaltekst>
                        <Hovedknapp onClick={this.handleButtonClick}>
                            <FormattedMessage id="egenvurdering-lenke-tekst"/>
                        </Hovedknapp>
                    </div>
                </section>
            </Panel>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    const opprettetRegistreringDato = selectOpprettetRegistreringDato(state);

    return {
        foreslattInnsatsgruppe: selectForeslattInnsatsgruppe(state)!, // Komponent blir rendret kun hvis foreslått innsatsgruppe er satt
        opprettetRegistreringDato: opprettetRegistreringDato ? new Date(opprettetRegistreringDato) : null,
    };
};

export default connect(mapStateToProps)(Egenvurdering);