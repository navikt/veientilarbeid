// tslint:disable

import * as React from 'react';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { mountWithStoreAndIntl } from '../../../../../test/test-utils';
import SoketidspunktForDagpenger from './datovelger';

enzyme.configure({adapter: new Adapter()});

describe('<SjekkRegistreringstatus />', () => {
    it('skal sende bruker til sbl om den ikke oppfyller krav og ikke er under oppfølging', () => {
        mountWithStoreAndIntl(<SoketidspunktForDagpenger velgDato={d=>{}}/>);
    });
});