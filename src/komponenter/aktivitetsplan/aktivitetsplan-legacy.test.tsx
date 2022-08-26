import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import AktivitetsplanLegacy from './aktivitetsplan-legacy';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';

describe('Tester komponenten Aktivitetsplan', () => {
    const oldLocation = global.window.location;
    afterEach(() => {
        delete (global as any).window.location;
        global.window.location = Object.assign({}, oldLocation);
    });

    test('Komponenten VISES om man er under oppfølging', async () => {
        const props: ProviderProps = {
            underOppfolging: {
                underOppfolging: true,
            },
        };
        render(<AktivitetsplanLegacy />, { wrapper: contextProviders(props) });
        expect(screen.getByText(/aktivitetsplanen/i)).toBeTruthy();
    });

    test('Komponenten vises IKKE om man IKKE er under oppfølging', async () => {
        const props: ProviderProps = {
            underOppfolging: {
                underOppfolging: false,
            },
        };
        const { container } = render(<AktivitetsplanLegacy />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });
});
