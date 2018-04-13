import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import SjekkOppfolging from './sjekk-oppfolging';
import { create } from '../../store';
import { mountWithStore, resetAndMakeHrefWritable } from '../../test/test-utils';
import { ActionTypes as OppfolgingActionTypes } from '../../ducks/oppfolging';
import {AKTIVITETSPLAN_URL, DITTNAV_URL, sendBrukerTilAktivitetsplan} from './sjekk-oppfolging-utils';

enzyme.configure({adapter: new Adapter()});

let sandbox;
beforeEach(() => {
    sandbox = sinon.sandbox.create();
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

    /* TODO Disse testene må skrives om!
    it('skal sende bruker til dittnav dersom bruker ikke er under oppfølging og ikke har åpnet aktivitetsplan', () => {
        const store = create();
        const HAR_IKKE_AAPNET_AKTIVITETSPLAN_IKKE_UNDER_OPPFOLGING = {underOppfolging: false, vilkarMaBesvares: true};

        // const spyPushState = sandbox.spy(history, 'pushState');
        const spyPushState = sandbox.spy(sendBrukerTilAktivitetsplan);
        console.log(spyPushState);

        store.dispatch({
            type: OppfolgingActionTypes.HENT_OPPFOLGING_OK,
            data: HAR_IKKE_AAPNET_AKTIVITETSPLAN_IKKE_UNDER_OPPFOLGING
        });

        const wrapper = mountWithStore(<SjekkOppfolging><span>dummy</span></SjekkOppfolging>, store);

        expect(wrapper.html()).to.equal(null);
    });

    it('skal sende bruker til aktivitetsplan dersom bruker ikke er under oppfølging og har åpne aktivitetsplan', () => {
        const store = create();
        const HAR_AAPNET_AKTIVITETSPLAN_IKKE_UNDER_OPPFOLGING = {underOppfolging: false, vilkarMaBesvares: false};

        const spyPushState = sandbox.spy(history, 'pushState');

        store.dispatch({
            type: OppfolgingActionTypes.HENT_OPPFOLGING_OK,
            data: HAR_AAPNET_AKTIVITETSPLAN_IKKE_UNDER_OPPFOLGING
        });

        const wrapper = mountWithStore(<SjekkOppfolging><span>dummy</span></SjekkOppfolging>, store);

        expect(wrapper.html()).to.equal(null);
        expect(spyPushState.args[0][2]).to.equal(AKTIVITETSPLAN_URL);
    });
    */
});
