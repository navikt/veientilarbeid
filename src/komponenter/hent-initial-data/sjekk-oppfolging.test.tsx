/*tslint:disable*/
import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SjekkOppfolging from './sjekk-oppfolging';
import { redirectTilDittNav } from './redirect-dittnav-utils';
import { mount } from 'enzyme';


enzyme.configure({adapter: new Adapter()});

let sandbox: any;
beforeEach(() => {
    sandbox = sinon.createSandbox();
});
afterEach(() => {
    sandbox.restore();
});

describe('<SjekkOppfolging />', () => {
    it('skal rendre children dersom bruker er under oppfølging', () => {
        const wrapper = mount(<SjekkOppfolging underOppfolging={true}><span>dummy</span></SjekkOppfolging>);

        expect(wrapper.html()).to.equal('<span>dummy</span>');
    });

    it('skal sende bruker til Ditt Nav dersom bruker ikke er under oppfølging', () => {

        const sendBrukerTilDittNavSpy = sandbox.spy(redirectTilDittNav);
        const sjekkOppfolgingConfig = {
            sendBrukerTilDittNav: sendBrukerTilDittNavSpy,
        };

        const wrapper = mount(
            <SjekkOppfolging underOppfolging={false} config={sjekkOppfolgingConfig}><span>dummy</span></SjekkOppfolging>
       );

        expect(sendBrukerTilDittNavSpy.called).to.be.equal(true);
        expect(wrapper.html()).to.equal(null);
    });
});
