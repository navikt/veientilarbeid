import './test/test-setup';
import * as React from 'react';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {
    mountWithStore, promiseWithSetTimeout, stubFetchWithErrorResponse,
    stubFetchWithResponse
} from './test/test-utils';
import App from './app';

enzyme.configure({adapter: new Adapter()});

afterEach(() => fetch.restore());

describe('<App />', () => {
    it('skal rendre <ReservertKrr /> om bruker er reservert i KRR', () => {
        stubFetchWithResponse({reservertIKrr: true});

        const wrapper = mountWithStore(<App />);

        return promiseWithSetTimeout()
            .then(() => {
                expect(wrapper.html()).to.have.string('reserver-krr__alertstripe');
                expect(wrapper.html()).not.to.have.string('kom-i-gang__wrapper');
            });
    });

    it('skal rendre kom-i-gang om bruker ikke er reservert i krr', () => {
        stubFetchWithResponse({reservertIKrr: false});

        const wrapper = mountWithStore(<App />);

        return promiseWithSetTimeout()
            .then(() => {
                expect(wrapper.html()).to.have.string('kom-i-gang__wrapper');
                expect(wrapper.html()).not.to.have.string('reserver-krr__alertstripe');
            });

    });
    it('skal rendre kom-i-gang om reservert i krr feiler med 500', () => {
        stubFetchWithErrorResponse(500);

        const wrapper = mountWithStore(<App />);

        return promiseWithSetTimeout()
            .then(() => {
                expect(wrapper.html()).to.have.string('kom-i-gang__wrapper');
                expect(wrapper.html()).not.to.have.string('reserver-krr__alertstripe');
            });

    });

    it('skal rendre <ReservertKrr /> om kall til Krr feiler med 404', () => {
        stubFetchWithErrorResponse(404);

        const wrapper = mountWithStore(<App />);

        return promiseWithSetTimeout()
            .then(() => {
                expect(wrapper.html()).to.have.string('reserver-krr__alertstripe');
                expect(wrapper.html()).not.to.have.string('kom-i-gang__wrapper');
            });

    });
});
