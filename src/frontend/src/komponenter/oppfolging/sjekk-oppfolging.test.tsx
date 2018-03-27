import * as React from 'react';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import SjekkOppfolging from './sjekk-oppfolging';
import { create } from '../../store';
import { mountWithStore, resetAndMakeHrefWritable } from '../../test/test-utils';
import { ActionTypes as OppfolgingActionTypes } from '../../ducks/oppfolging';
import { AKTIVITETSPLAN_URL, DITTNAV_URL } from './sjekk-oppfolging-utils';

enzyme.configure({adapter: new Adapter()});

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

    it('skal sende bruker til dittnav dersom bruker ikke er under oppfølging og ikke har åpnet aktivitetsplan', () => {
        const store = create();
        const HAR_IKKE_AAPNET_AKTIVITETSPLAN_IKKE_UNDER_OPPFOLGING = { underOppfolging: false, vilkarMaBesvares: true};

        store.dispatch({
            type: OppfolgingActionTypes.HENT_OPPFOLGING_OK,
            data: HAR_IKKE_AAPNET_AKTIVITETSPLAN_IKKE_UNDER_OPPFOLGING
        });

        resetAndMakeHrefWritable();

        const wrapper = mountWithStore(<SjekkOppfolging><span>dummy</span></SjekkOppfolging>, store);

        expect(wrapper.html()).to.equal(null);
        expect(document.location.href).to.equal(DITTNAV_URL);
    });

    it('skal sende bruker til aktivitetsplan dersom bruker ikke er under oppfølging og har åpne aktivitetsplan', () => {
        const store = create();
        const HAR_AAPNET_AKTIVITETSPLAN_IKKE_UNDER_OPPFOLGING = { underOppfolging: false, vilkarMaBesvares: false};

        store.dispatch({
            type: OppfolgingActionTypes.HENT_OPPFOLGING_OK,
            data: HAR_AAPNET_AKTIVITETSPLAN_IKKE_UNDER_OPPFOLGING
        });

        resetAndMakeHrefWritable();

        const wrapper = mountWithStore(<SjekkOppfolging><span>dummy</span></SjekkOppfolging>, store);

        expect(wrapper.html()).to.equal(null);
        expect(document.location.href).to.equal(AKTIVITETSPLAN_URL);
    });
});