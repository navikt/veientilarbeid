import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedDate } from 'react-intl';

interface OwnProps {
    date: Date;
}

type Props = OwnProps & InjectedIntlProps;

function DatovelgerCaption(props: Props) {
    return (
        <div
            className="DayPicker-Caption"
            role="heading"
            aria-live="assertive"
            aria-atomic="true"
        >
            <FormattedDate month="long" year="numeric" value={props.date}/>
        </div>
    );
}

export default injectIntl(DatovelgerCaption);