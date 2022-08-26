import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import Meldekort from './meldekort';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';

describe('Tester komponenten Aktivitetsplan', () => {
    test('Komponenten VISES om featuretoggle er aktiv', async () => {
        const props: ProviderProps = {
            featureToggle: {
                'veientilarbeid.ny-standardvisning': true,
            },
        };
        const { container } = render(<Meldekort />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
    });

    test('Komponenten vises IKKE featuretoggle IKKE er aktiv', async () => {
        const props: ProviderProps = {
            featureToggle: {
                'veientilarbeid.ny-standardvisning': false,
            },
        };
        const { container } = render(<Meldekort />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });
});
