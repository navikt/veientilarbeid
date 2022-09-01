import { render, screen } from '@testing-library/react';

import Aktivitetsplan from './aktivitetsplan';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';

describe('Tester komponenten Aktivitetsplan', () => {
    test('Komponenten VISES om featuretoggle er aktiv', async () => {
        const props: ProviderProps = {
            featureToggle: {
                'veientilarbeid.ny-standardvisning': true,
            },
        };
        render(<Aktivitetsplan />, { wrapper: contextProviders(props) });
        expect(screen.getByText(/aktivitetsplanen din/i)).toBeTruthy();
    });

    test('Komponenten vises IKKE featuretoggle IKKE er aktiv', async () => {
        const props: ProviderProps = {
            featureToggle: {
                'veientilarbeid.ny-standardvisning': false,
            },
        };
        const { container } = render(<Aktivitetsplan />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });
});
