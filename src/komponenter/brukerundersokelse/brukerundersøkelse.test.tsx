import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import Brukerundersokelse from './brukerundersokelse';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';

const providerProps: ProviderProps = {
    amplitude: {
        ukerRegistrert: 2,
        gruppe: 'kss',
        eksperimenter: ['onboarding14a'],
    },
};

describe('tester komponenten for brukerundersøkelser', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('komponenten vises IKKE når featuretoggle ikke er satt', () => {
        const { container } = render(<Brukerundersokelse />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('komponenten VISES når featureToggle ER satt', () => {
        const { container } = render(<Brukerundersokelse />, {
            wrapper: contextProviders({
                ...providerProps,
                featureToggle: { 'veientilarbeid.visbrukerundersokelse': true },
            }),
        });
        expect(container).not.toBeEmptyDOMElement();
    });
});
