import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Kalender from './kalender';
import MaskedInput from 'react-maskedinput';
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

class Datovelger extends React.Component<Props, State> {
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

    toggleDatovelger() {
        this.setState({
            ...this.state,
            visDatovelger: !this.state.visDatovelger,
        });
    }

    render() {
        return (
            <div>
                <MaskedInput
                    type="tel"
                    mask="11.11.1111"
                    autoComplete="off"
                    placeholder="dd.mm.åååå"
                    disabled={false}
                    className={`skjemaelement__input input--m datovelger__input`}
                />
                <button onClick={() => this.toggleDatovelger()}> Vis kalender </button>
                {this.state.visDatovelger &&
                <Kalender
                    valgtDato={this.state.dato}
                    velgDato={(dato) => this.velgDato(dato)}
                />
                }
            </div>
        );
    }
}

export default injectIntl(Datovelger);