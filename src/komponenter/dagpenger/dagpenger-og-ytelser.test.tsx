import { render } from '@testing-library/react';

import DagpengerOgYtelser from './dagpenger-og-ytelser';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';

describe('Tester komponenten DagpengerOgYtelser', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('Komponenten vises IKKE featuretoggle IKKE er aktiv', async () => {
        const props: ProviderProps = {
            featureToggle: {
                'veientilarbeid.ny-standardvisning': false,
            },
        };

        const { container } = render(<DagpengerOgYtelser />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });
});
