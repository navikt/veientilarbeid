import * as React from 'react';
import DayPicker from 'react-day-picker';
import momentLocaleUtils, { LocaleUtils } from 'react-day-picker/moment';
import * as moment from 'moment';
import 'moment/locale/nb';

class Datovelger extends React.Component<{}> {
    constructor(props: {}) {
        super(props);
        moment.locale('nb');
    }

    render() {
        const localeUtils: LocaleUtils = {
            ...momentLocaleUtils,
            formatWeekdayShort: (weekday, locale) => {
                return momentLocaleUtils.formatWeekdayLong(weekday, locale).substring(0, 3);
            },
        };

        return (
            <DayPicker
                locale="nb"
                localeUtils={localeUtils}
                firstDayOfWeek={1}
            />
        );
    }
}

export default Datovelger;