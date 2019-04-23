import * as React from 'react';
import { mount } from 'enzyme';
import getStore from '../store';
import { AppState } from '../reducer';
import IntlProvider from '../Intl-provider';
import { Provider } from 'react-redux';
import { Store } from 'redux';

export const store = getStore();

export function mountWithStore(children: React.ReactNode, withStore?: Store<AppState>) {
    return mount(
        <Provider store={withStore || store}>
            <IntlProvider>
                {children}
            </IntlProvider>
        </Provider>
    );
}
