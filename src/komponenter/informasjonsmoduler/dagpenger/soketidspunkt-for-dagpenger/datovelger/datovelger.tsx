import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Kalender from './kalender';
import * as moment from 'moment';
import { Moment } from 'moment';
import 'moment/locale/nb';
import DatoInputfelt from './dato-inputfelt';
import { momentAsISO } from './datovelger-utils';

interface OwnProps {
    velgDato: (dato: Moment) => void;
}

interface State {
    dato: Moment;
    visKalender: boolean;
    inputErRiktigFormatert: boolean;
}

type Props = OwnProps & InjectedIntlProps;

class Datovelger extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        moment.locale('nb');
        this.state = {
            dato: momentAsISO(new Date()),
            visKalender: false,
            inputErRiktigFormatert: true,
        };
    }

    velgDato(dato: Moment) {
        this.props.velgDato(dato);
        this.setState({
            ...this.state,
            dato: dato,
        });
        this.lukkDatovelger();
    }

    toggleDatovelger() {
        this.setState({
            ...this.state,
            visKalender: !this.state.visKalender,
        });
    }

    lukkDatovelger() {
        this.setState({
            ...this.state,
            visKalender: false,
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
            <div className="datovelger__wrapper">
                <div className="datovelger">
                    <div className="datovelger__inner">
                        <DatoInputfelt
                            valgtDato={this.state.dato}
                            velgDato={(dato: Moment) => this.velgDato(dato)}
                            inputErRiktigFormatert={(riktigFormatert) => this.settRiktigFormatert(riktigFormatert)}
                            className={this.state.inputErRiktigFormatert ? '' : 'datovelger__input--harFeil'}
                        />
                        <button
                            className="js-toggle datovelger__toggleDayPicker"
                            onClick={() => this.toggleDatovelger()}
                        />
                        {this.state.visKalender &&
                            <Kalender
                                valgtDato={this.state.dato.toDate()}
                                velgDato={(dato: Date) => this.velgDato(momentAsISO(dato))}
                                lukk={() => this.lukkDatovelger()}
                            />
                        }
                    </div>
                </div>
                {!this.state.inputErRiktigFormatert &&
                <div
                    role="alert"
                    aria-live="assertive"
                    className="datovelger__feilmelding"
                >
                    Ugyldig format, bruk dd.mm.yyyy
                </div>
                }
            </div>
        );
    }
}

export default injectIntl(Datovelger);