import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import EgenVurdering12Uker from './12uker-egenvurdering';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { Formidlingsgruppe, Servicegruppe } from '../../ducks/oppfolging';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';
import { plussDager } from '../../utils/date-utils';

const providerProps: ProviderProps = {
    brukerInfo: {
        rettighetsgruppe: 'DAGP',
        geografiskTilknytning: '110302',
        alder: 42,
    },
    amplitude: {
        ukerRegistrert: 11,
        gruppe: 'kss',
        eksperimenter: ['onboarding14a'],
    },
    oppfolging: {
        formidlingsgruppe: Formidlingsgruppe.ARBS,
        servicegruppe: Servicegruppe.IKVAL,
    },
    brukerregistrering: {
        registrering: {
            opprettetDato: plussDager(new Date(), -78).toISOString(),
        },
    },
};

describe('tester komponenten for 12uker-egenvurdering', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('komponenten vises IKKE når featuretoggle ikke er satt', () => {
        const setVisEgenvurderingsKomponent = jest.fn();
        const { container } = render(
            <EgenVurdering12Uker setVisEgenvurderingsKomponent={setVisEgenvurderingsKomponent} />,
            { wrapper: contextProviders(providerProps) }
        );
        expect(container).toBeEmptyDOMElement();
    });

    test('komponenten VISES når featureToggle ER satt', () => {
        const setVisEgenvurderingsKomponent = jest.fn();
        const { container } = render(
            <EgenVurdering12Uker setVisEgenvurderingsKomponent={setVisEgenvurderingsKomponent} />,
            {
                wrapper: contextProviders({
                    ...providerProps,
                    featureToggle: { 'veientilarbeid.egenvurderinguke12': true },
                }),
            }
        );
        expect(container).not.toBeEmptyDOMElement();
    });
});
