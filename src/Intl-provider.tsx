import * as React from 'react';
import { addLocaleData, IntlProvider as Provider } from 'react-intl';
import * as nb from 'react-intl/locale-data/nb';
import tekster from './tekster/alle-tekster';

addLocaleData(nb);

class IntlProvider extends React.Component {

    render() {
        const {children, ...props} = this.props;
        const locale = 'nb';

        return (
            <Provider {...props} locale={locale} messages={tekster.nb || []}>
                {children}
            </Provider>
        );
    }
}

export default IntlProvider;
