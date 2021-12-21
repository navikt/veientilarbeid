import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import DagpengerOgUtdanning from './dagpenger-og-utdanning';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';

describe('Tester komponenten DagpengerOgUtdanning', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('Komponenten VISES om man har rettighetsgruppe DAGP', async () => {
        const props: ProviderProps = {
            brukerInfo: {
                rettighetsgruppe: 'DAGP',
            },
        };
        render(<DagpengerOgUtdanning />, { wrapper: contextProviders(props) });
        expect(screen.getByText(/mottek du dagpengar/i)).toBeTruthy();
    });

    test('Komponenten vises IKKE om man IKKE er har rettighetsgruppe DAGP', async () => {
        const props: ProviderProps = {
            brukerInfo: {
                rettighetsgruppe: 'IYT',
            },
        };
        const { container } = render(<DagpengerOgUtdanning />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });
});
