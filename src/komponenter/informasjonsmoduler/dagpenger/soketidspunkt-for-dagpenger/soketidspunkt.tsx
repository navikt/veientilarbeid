import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DayPicker from 'react-day-picker';
import { MomentLocaleUtils } from 'react-day-picker/moment';

// tslint:disable

let a: LocaleUtils;


interface DummyProp {
    dummy?: string; // TypeScript klager hvis props kun er InjectedIntlProps
}

var WEEKDAYS_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

type Props = DummyProp & InjectedIntlProps;

class SoketidspunktForDagpenger extends React.Component<Props> {
    render() {
        // const intl = this.props.intl;

        return (
            <div>
                <DayPicker
                    locale="no"
                    numberOfMonths={1}
                    pagedNavigation={true}
                    fixedWeeks={true}
                />
            </div>
        );
    }
}

export default injectIntl(SoketidspunktForDagpenger);