import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Datovelger from './datovelger/datovelger';
import { Moment } from 'moment';
import { momentAsISO } from './datovelger/datovelger-utils';
import { Element, Normaltekst } from 'nav-frontend-typografi';

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
            dato: momentAsISO(new Date())
        };
    }

    velgDato(dato: Moment) {
        this.setState({
            dato: dato,
        });
    }

    render() {
        return (
            <div>
                <Datovelger
                    velgDato={dato => this.velgDato(dato)}
                    dato={this.state.dato}
                />
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