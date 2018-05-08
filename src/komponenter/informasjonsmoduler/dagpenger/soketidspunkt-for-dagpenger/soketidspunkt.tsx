import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedDate } from 'react-intl';
import Datovelger from './datovelger/datovelger';
import * as moment from 'moment';
import 'moment/locale/nb';

// tslint:disable

interface DummyProp {
    dummy?: string; // TypeScript klager hvis props kun er InjectedIntlProps
}

interface State {
    dato: Date;
    visDatovelger: boolean;
}

type Props = DummyProp & InjectedIntlProps;

class SoketidspunktForDagpenger extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        moment.locale('nb');
        this.state = {
            dato: new Date(),
            visDatovelger: true,
        };
    }

    velgDato(dato: Date) {
        this.setState({
            dato: dato,
            visDatovelger: false,
        });
        console.log(dato);
    }

    render() {
        return (
            <div>
                <FormattedDate month="long" year="numeric" value={this.state.dato} />
                <button onClick={() => this.setState({visDatovelger: true})}> Vis kalender </button>
                {this.state.visDatovelger &&
                    <Datovelger
                        valgtDato={this.state.dato}
                        velgDato={(dato) => this.velgDato(dato)}
                    />
                }
            </div>
        );
    }
}

export default injectIntl(SoketidspunktForDagpenger);