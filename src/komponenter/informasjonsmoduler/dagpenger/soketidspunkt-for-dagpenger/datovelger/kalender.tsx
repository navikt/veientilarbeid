import * as React from 'react';
import DayPicker from 'react-day-picker';
import momentLocaleUtils, { LocaleUtils } from 'react-day-picker/moment';
import Navigasjonsbar from './navigasjonsbar';

interface Props {
    valgtDato: Date;
    velgDato: (dato: Date) => void;
    lukk: () => void;
}

class Kalender extends React.Component<Props> {
    private wrapperRef: HTMLDivElement | null;
    // TODO: Må fikse focus.

    componentDidMount() {
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        document.addEventListener('click', this.handleOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    }

    setWrapperRef(node: HTMLDivElement | null) {
        this.wrapperRef = node;
    }

    handleOutsideClick(event: any) { // tslint:disable-line no-any
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.lukk();
        }
    }

    render() {
        const localeUtils: LocaleUtils = {
            ...momentLocaleUtils,
            formatWeekdayShort: (weekday, locale) => {
                return momentLocaleUtils.formatWeekdayLong(weekday, locale).substring(0, 3);
            },
        };

        const navigasjonsbar = (
            <Navigasjonsbar
                showPreviousButton={true}
                showNextButton={true}
            />
        );

        return (
            <div className="datovelger__DayPicker" ref={(node) => this.setWrapperRef(node)}>
                <DayPicker
                    locale="nb"
                    localeUtils={localeUtils}
                    firstDayOfWeek={1}
                    navbarElement={navigasjonsbar}
                    selectedDays={this.props.valgtDato}
                    onDayClick={(dato) => this.props.velgDato(dato)}
                />
            </div>
        );
    }
}

export default Kalender;