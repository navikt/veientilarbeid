import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Kalender from './kalender';
import * as moment from 'moment';
import { Moment } from 'moment';
import 'moment/locale/nb';
import DatoInputfelt from './dato-inputfelt';
import { momentAsISO } from '../moment-utils';
import { Normaltekst } from 'nav-frontend-typografi';

import './datovelger.less';

interface OwnProps {
    velgDato: (dato: Moment) => void;
    dato: Moment;
    className?: string;
    settRiktigFormatert: (riktigFormatert: boolean) => void;
    inputRiktigFormatert: boolean;
}

interface State {
    visKalender: boolean;
}

type Props = OwnProps & InjectedIntlProps;

class Datovelger extends React.Component<Props, State> {
    private kalenderKnapp: HTMLButtonElement | null;

    constructor(props: Props) {
        super(props);
        moment.locale('nb');
        this.state = {
            visKalender: false,
        };
    }

    velgDato(dato: Moment) {
        this.setState({
            ...this.state,
            visKalender: false,
        });
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

    render() {
        const {visKalender} = this.state;
        const classNameFraProps = this.props.className ? this.props.className : '';
        return (
            <div className={`datovelger__outer ${classNameFraProps}`}>
                <div className="datovelger">
                    <div className="datovelger__inner">
                        <div className="datovelger__inputContainer">
                            <DatoInputfelt
                                valgtDato={this.props.dato}
                                velgDato={(dato: Moment) => this.velgDato(dato)}
                                inputErRiktigFormatert={this.props.settRiktigFormatert}
                                className={this.props.inputRiktigFormatert ? '' : 'datovelger__input--harFeil'}
                            />
                            <button
                                ref={node => this.kalenderKnapp = node}
                                className="js-toggle datovelger__toggleDayPicker"
                                onClick={() => this.toggleKalender()}
                                aria-pressed={this.state.visKalender}
                                type="button"
                                aria-label="datovelger-knapp"
                            />
                        </div>
                        {visKalender &&
                            <Kalender
                                valgtDato={this.props.dato.toDate()}
                                velgDato={(dato: Date) => {
                                    this.velgDato(momentAsISO(dato));
                                    if (this.kalenderKnapp) {
                                        this.kalenderKnapp.focus();
                                    }
                                }}
                                lukk={() => this.lukkKalender()}
                            />
                        }
                    </div>
                </div>
                {!this.props.inputRiktigFormatert &&
                    <div
                        role="alert"
                        aria-live="assertive"
                        className="datovelger__feilmelding"
                    >
                        <Normaltekst>
                            <FormattedMessage id="dagpenger.soketidspunkt.dato.feilmelding.ugyldig-input"/>
                        </Normaltekst>
                    </div>
                }
            </div>
        );
    }
}

export default injectIntl(Datovelger);