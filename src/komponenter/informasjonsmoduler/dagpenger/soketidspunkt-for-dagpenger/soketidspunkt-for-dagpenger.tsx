// tslint:disable

import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Datovelger from './datovelger/datovelger';
import { Moment } from 'moment';
import { momentIDag } from './moment-utils';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import SoketidspunktResultat from './soketidspunkt-resultat';

interface DummyProp {
    dummy?: string; // TypeScript klager hvis props kun er InjectedIntlProps
}

type Props = DummyProp & InjectedIntlProps;

interface State {
    dato: Moment;
}

class SoketidspunktForDagpenger extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dato: momentIDag()
        };
    }

    velgDato(dato: Moment) {
        this.setState({
            dato: dato,
        });
    }

    onSubmit(event: any) {
        event.preventDefault();
        console.log('submittin\'');
    }

    render() {
        return (
            <div>
                <form onSubmit={event => this.onSubmit(event)}>
                    <Datovelger
                        velgDato={dato => this.velgDato(dato)}
                        dato={this.state.dato}
                    />
                    <button type="submit">
                        Regn ut
                    </button>
                    <SoketidspunktResultat dato={this.state.dato}/>
                </form>
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