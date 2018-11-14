/*tslint:disable*/
import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import SjekkOppfolging from './sjekk-oppfolging';
import { create } from '../../store';
import { mountWithStore } from '../../test/test-utils';
import { ActionTypes as OppfolgingActionTypes } from '../../ducks/oppfolging';
import {
    redirectTilAktivitetsplan,
} from './sjekk-oppfolging-utils';
import Innhold from '../../komponenter/innhold/innhold';
import InnholdSykmelding from '../start-fra-sykefravaer/innhold-sykmelding/innhold-sykmelding';

enzyme.configure({adapter: new Adapter()});

let sandbox;
beforeEach(() => {
    sandbox = sinon.sandbox.create();
});
afterEach(() => {
    sandbox.restore();
});

describe('<SjekkOppfolging />', () => {
    it('skal rendre innhold for arbeidssokere dersom bruker har status under oppfølging', () => {
        const store = create();
        const UNDER_OPPFOLGING = {underOppfolging: true};

        store.dispatch({
            type: OppfolgingActionTypes.HENT_OPPFOLGING_OK,
            data: UNDER_OPPFOLGING
        });

        const wrapper = mountWithStore(<SjekkOppfolging/>, store);

        expect(wrapper.find(Innhold)).to.have.length(1);
        expect(wrapper.find(InnholdSykmelding)).to.have.length(0);
    });

    it('skal rendre innhold for arbeidssokere dersom brukere har status `sykmeldt med arbeidssgiver`', () => {
        const store = create();
        const ER_SYKMELDT_MED_ARBEIDSGIVER = {erSykmeldtMedArbeidsgiver: true};

        store.dispatch({
            type: OppfolgingActionTypes.HENT_OPPFOLGING_OK,
            data: ER_SYKMELDT_MED_ARBEIDSGIVER
        });

        const wrapper = mountWithStore(<SjekkOppfolging/>, store);

        expect(wrapper.find(InnholdSykmelding)).to.have.length(1);
        expect(wrapper.find(Innhold)).to.have.length(0);
    });

    it('skal sende bruker til aktivitetsplan dersom bruker ikke er under oppfølging og har åpne aktivitetsplan', () => {
        const store = create();
        const HAR_AAPNET_AKTIVITETSPLAN_IKKE_UNDER_OPPFOLGING = {underOppfolging: false};

        const sendBrukerTilAktivitetsplanSpy = sandbox.spy(redirectTilAktivitetsplan);
        const sjekkOppfolgingConfig = {
            sendBrukerTilAktivitetsplan: sendBrukerTilAktivitetsplanSpy,
            sendBrukerTilDittNav: redirectTilAktivitetsplan
        };

        store.dispatch({
            type: OppfolgingActionTypes.HENT_OPPFOLGING_OK,
            data: HAR_AAPNET_AKTIVITETSPLAN_IKKE_UNDER_OPPFOLGING
        });

        const wrapper = mountWithStore(
            <SjekkOppfolging config={sjekkOppfolgingConfig}><span>dummy</span></SjekkOppfolging>,
            store
        );

        expect(sendBrukerTilAktivitetsplanSpy.called).to.be.equal(true);
        expect(wrapper.html()).to.equal(null);
    });
});
