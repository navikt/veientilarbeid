/*tslint:disable*/
import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SjekkOppfolging from './sjekk-oppfolging';
import { create } from '../../store';
import { mountWithStore } from '../../test/test-utils';
import { ActionType as OppfolgingActionTypes } from '../../ducks/actions';
import { redirectTilDittNav } from './sjekk-oppfolging-utils';

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
        const store = create();
        const UNDER_OPPFOLGING = {underOppfolging: true};

        store.dispatch({
            type: OppfolgingActionTypes.HENT_OPPFOLGING_OK,
            data: UNDER_OPPFOLGING
        });

        const wrapper = mountWithStore(<SjekkOppfolging><span>dummy</span></SjekkOppfolging>, store);

        expect(wrapper.html()).to.equal('<span>dummy</span>');
    });

    it('skal sende bruker til aktivitetsplan dersom bruker ikke er under oppfølging og har åpne aktivitetsplan', () => {
        const store = create();
        const HAR_AAPNET_AKTIVITETSPLAN_IKKE_UNDER_OPPFOLGING = {underOppfolging: false};

        const sendBrukerTilDittNavSpy = sandbox.spy(redirectTilDittNav);
        const sjekkOppfolgingConfig = {
            sendBrukerTilDittNav: sendBrukerTilDittNavSpy,
        };

        store.dispatch({
            type: OppfolgingActionTypes.HENT_OPPFOLGING_OK,
            data: HAR_AAPNET_AKTIVITETSPLAN_IKKE_UNDER_OPPFOLGING
        });

        const wrapper = mountWithStore(
            <SjekkOppfolging config={sjekkOppfolgingConfig}><span>dummy</span></SjekkOppfolging>, store
        );

        expect(sendBrukerTilDittNavSpy.called).to.be.equal(true);
        expect(wrapper.html()).to.equal(null);
    });
});
