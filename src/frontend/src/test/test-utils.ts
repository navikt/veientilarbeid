import * as React from 'react';
import * as sinon from 'sinon';
import { mount } from 'enzyme';
import { shallowWithIntl } from 'enzyme-react-intl';
import getStore from '../store';

export const store = getStore();

export function shallowwithStoreAndIntl(children: React.ReactNode) {
    return shallowWithIntl(React.cloneElement(children, {
        store
    })).dive().dive();
}

export function mountWithStore(children: React.ReactNode) {
    return mount(React.cloneElement(children, {
        store
    }));
}

export function stubFetchWithResponse(response: {}): Promise {
    return sinon.stub(global, 'fetch').callsFake(() =>
        Promise.resolve({status: 200, ok: true, json: () => (response)}));
}

export function stubFetchWithErrorResponse() {
    return sinon.stub(global, 'fetch').callsFake(() =>
        Promise.resolve({status: 500, text: () => Promise.resolve('Skal kaste feil')}));
}

export function promiseWithSetTimeout() {
    return new Promise(resolve => setTimeout(resolve, 0));
}

export function makeHrefWritable() {
    return Object.defineProperty(document.location, 'href', {
        writable: true,
    });
}