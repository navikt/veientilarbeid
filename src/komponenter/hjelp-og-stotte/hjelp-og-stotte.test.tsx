import { render } from '@testing-library/react';

import HjelpOgStotte from './hjelp-og-stotte';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';

describe('Tester komponenten HjelpOgStotte', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('Komponenten VISES når featuretoggle ER aktiv', async () => {
        const props: ProviderProps = {
            featureToggle: {
                'veientilarbeid.ny-standardvisning': true,
            },
        };

        const { container } = render(<HjelpOgStotte />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
    });

    test('Komponenten vises IKKE når featuretoggle IKKE er aktiv', async () => {
        const props: ProviderProps = {
            featureToggle: {
                'veientilarbeid.ny-standardvisning': false,
            },
        };

        const { container } = render(<HjelpOgStotte />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });
});
