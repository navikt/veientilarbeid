import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Kalender from './kalender';
import * as moment from 'moment';
import { Moment } from 'moment';
import 'moment/locale/nb';
import DatoInputfelt from './dato-inputfelt';
import { momentAsISO } from './datovelger-utils';
// tslint:disable
interface OwnProps {
    velgDato: (dato: Moment) => void;
    valgtDato: Moment;
}

interface State {
    visKalender: boolean;
    inputErRiktigFormatert: boolean;
}

type Props = OwnProps & InjectedIntlProps;

class Datovelger extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        moment.locale('nb');
        this.state = {
            visKalender: false,
            inputErRiktigFormatert: true,
        };
    }

    velgDato(dato: Moment) {
        this.lukkKalender();
        this.props.velgDato(dato);
    }

    toggleKalender() {
        this.setState({
            ...this.state,
            visKalender: !this.state.visKalender,
        });
    }

    lukkKalender() {
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
            <div className="datovelger__outer">
                <div className="datovelger">
                    <div className="datovelger__inner">
                        <DatoInputfelt
                            valgtDato={this.props.valgtDato}
                            velgDato={(dato: Moment) => this.velgDato(dato)}
                            inputErRiktigFormatert={(riktigFormatert) => this.settRiktigFormatert(riktigFormatert)}
                            className={this.state.inputErRiktigFormatert ? '' : 'datovelger__input--harFeil'}
                        />
                        <button
                            className="js-toggle datovelger__toggleDayPicker"
                            onClick={() => this.toggleKalender()}
                        />
                        {this.state.visKalender &&
                            <Kalender
                                valgtDato={this.props.valgtDato.toDate()}
                                velgDato={(dato: Date) => this.velgDato(momentAsISO(dato))}
                                lukk={() => this.lukkKalender()}
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
                    Ugyldig format, bruk dd.mm.yyyy {/* TODO Hent tekst fra intl */}
                </div>
                }
            </div>
        );
    }
}

export default injectIntl(Datovelger);