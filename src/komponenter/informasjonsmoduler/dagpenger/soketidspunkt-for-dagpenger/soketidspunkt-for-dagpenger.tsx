import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Datovelger from './datovelger/datovelger';
import { Moment } from 'moment';
import { momentIDag } from './moment-utils';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import SoketidspunktResultat from './soketidspunkt-resultat';
import { Hovedknapp } from 'nav-frontend-knapper';

import './soketidspunkt-for-dagpenger.less';

interface DummyProp {
    dummy?: string; // TypeScript klager hvis props kun er InjectedIntlProps
}

type Props = DummyProp & InjectedIntlProps;

interface State {
    dato: Moment;
    visResultatet: boolean;
    inputErRiktigFormatert: boolean;
}

class SoketidspunktForDagpenger extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dato: momentIDag(),
            inputErRiktigFormatert: true,
            visResultatet: false,
        };
    }

    velgDato(dato: Moment) {
        this.setState({
            ...this.state,
            visResultatet: false,
            inputErRiktigFormatert: true,
            dato: dato,
        });
    }

    onSubmit(event: React.FormEvent<EventTarget>) {
        event.preventDefault();
        this.setState({
            ...this.state,
            visResultatet: this.state.inputErRiktigFormatert,
        });
    }

    settRiktigFormatert(riktigFormatert: boolean) {
        this.setState({
            ...this.state,
            inputErRiktigFormatert: riktigFormatert,
        });
    }

    render() {
        return (
            <div className="soketidspunkt-for-dagpenger">
                <form className="soketidspunkt-for-dagpenger__form blokk-xl" onSubmit={event => this.onSubmit(event)}>
                    <Normaltekst className="blokk-s">
                        {this.props.intl.messages['dagpenger.soketidspunkt.intro']}
                    </Normaltekst>
                    <div className="soketidspunkt-for-dagpenger__form-input">
                        <Datovelger
                            className="soketidspunkt-for-dagpenger__form-input-felt"
                            velgDato={dato => this.velgDato(dato)}
                            dato={this.state.dato}
                            settRiktigFormatert={riktigFormatert => this.settRiktigFormatert(riktigFormatert)}
                            inputRiktigFormatert={this.state.inputErRiktigFormatert}
                        />
                        <div className="soketidspunkt-for-dagpenger__form-input-knapp">
                            <Hovedknapp htmlType="submit">
                                {this.props.intl.messages['dagpenger.soketidspunkt.dato.knapp']}
                            </Hovedknapp>
                        </div>
                    </div>
                    { this.state.visResultatet &&
                        <SoketidspunktResultat
                            dato={this.state.dato}
                            className="soketidspunkt-for-dagpenger__form-resultat"
                        />
                    }
                </form>
                <hr />
                <Element tag="h3" className="blokk-s">
                    <FormattedMessage id="dagpenger.soketidspunkt.definisjonsliste-overskrift"/>
                </Element>
                <Normaltekst className="panel-blokk-beskrivelse">
                    <span
                        dangerouslySetInnerHTML={{
                            __html: this.props.intl.messages['dagpenger.soketidspunkt.definisjonsliste-innhold']
                        }}
                    />
                </Normaltekst>
            </div>
        );
    }
}

export default injectIntl(SoketidspunktForDagpenger);