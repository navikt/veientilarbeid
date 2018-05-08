import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Kalender from './kalender';
import * as moment from 'moment';
import 'moment/locale/nb';
import DatoInputfelt from './dato-inputfelt';

interface OwnProps {
    velgDato: (dato: Date) => void;
}

interface State {
    dato: Date;
    visKalender: boolean;
}

type Props = OwnProps & InjectedIntlProps;

class Datovelger extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        moment.locale('nb');
        this.state = {
            dato: new Date(),
            visKalender: true,
        };
    }

    velgDato(dato: Date) {
        this.setState({
            dato: dato,
            visKalender: false,
        });
    }

    toggleDatovelger() {
        this.setState({
            ...this.state,
            visKalender: !this.state.visKalender,
        });
    }

    render() {
        const datoProps = {
            valgtDato: this.state.dato,
            velgDato: (dato: Date) => this.velgDato(dato)
        };
        return (
            <div className="datovelger">
                <div className="datovelger__inner">
                    <DatoInputfelt {...datoProps} />
                    <button
                        className="js-toggle datovelger__toggleDayPicker"
                        onClick={() => this.toggleDatovelger()}
                    >
                        Vis kalender
                    </button>
                    {this.state.visKalender &&
                        <Kalender {...datoProps} />
                    }
                </div>
            </div>
        );
    }
}

export default injectIntl(Datovelger);