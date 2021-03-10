import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Intro14AWrapper from './14a';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { Formidlingsgruppe, Servicegruppe } from '../../ducks/oppfolging';

const providerProps: ProviderProps = {
    brukerInfo: {
        rettighetsgruppe: 'DAGP',
    },
    amplitude: {
        ukerRegistrert: 2,
    },
    oppfolging: {
        formidlingsgruppe: Formidlingsgruppe.ARBS,
        servicegruppe: Servicegruppe.IKVAL,
    },
};

describe('tester onboarding komponenten for 14a-intro', () => {
    test('komponenten vises IKKE når featuretoggle ikke er satt', () => {
        const { container } = render(<Intro14AWrapper />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('komponenten vises når featuretoggle er satt', () => {
        const { container } = render(<Intro14AWrapper />, {
            wrapper: contextProviders({ ...providerProps, featureToggle: { 'veientilarbeid.14a-intro': true } }),
        });
        expect(container).not.toBeEmptyDOMElement();
    });
});
