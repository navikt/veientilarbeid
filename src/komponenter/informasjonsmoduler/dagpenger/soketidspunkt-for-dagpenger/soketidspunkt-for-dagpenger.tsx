import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Datovelger from './datovelger/datovelger';

// tslint:disable

interface DummyProp {
    dummy?: string; // TypeScript klager hvis props kun er InjectedIntlProps
}

type Props = DummyProp & InjectedIntlProps;

interface State {
    dato: Date;
}

class SoketidspunktForDagpenger extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dato: new Date()
        };
    }

    velgDato(dato: Date) {
        this.setState({
            dato: dato,
        });
    }

    render() {
        return (
            <Datovelger
                velgDato={dato => this.velgDato(dato)}
            />
        );
    }
}

export default injectIntl(SoketidspunktForDagpenger);