import * as React from 'react';
import DayPicker from 'react-day-picker';
import momentLocaleUtils, { LocaleUtils } from 'react-day-picker/moment';
import Navigasjonsbar from './navigasjonsbar';
//tslint:disable

interface Props {
    valgtDato: Date;
    velgDato: (dato: Date) => void;
}

class Kalender extends React.Component<Props> {
    render() {
        const localeUtils: LocaleUtils = {
            ...momentLocaleUtils,
            formatWeekdayShort: (weekday, locale) => {
                return momentLocaleUtils.formatWeekdayLong(weekday, locale).substring(0, 3);
            },
        };

        const navigasjonsbar = (
            <Navigasjonsbar
                onNextClick={() => {}}
                onPreviousClick={() => {}}
                showPreviousButton={true}
                showNextButton={true}
            />
        );

        return (
            <div className="datovelger__DayPicker">
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