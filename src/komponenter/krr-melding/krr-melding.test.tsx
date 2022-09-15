import { render, screen } from '@testing-library/react';

import KrrMelding from './krr-melding';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';

describe('Test av komponent', () => {
    test('Rendrer komponent hvis reservasjon hos krr og underOppfolging', async () => {
        const props: ProviderProps = {
            oppfolging: { reservasjonKRR: true },
            arbeidssoker: {
                arbeidssokerperioder: { status: 200, arbeidssokerperioder: [] },
                underoppfolging: { status: 200, underoppfolging: true },
            },
        };
        render(<KrrMelding />, { wrapper: contextProviders(props) });
        expect(screen.getByText('Du er reservert mot digital kommunikasjon med det offentlige.')).toBeTruthy();
        expect(await screen.queryByText(/denne teksten finnes ikke/i)).toBeFalsy();
    });

    test('Rendrer IKKE komponent hvis IKKE reservasjon hos krr', async () => {
        const props: ProviderProps = {
            oppfolging: { reservasjonKRR: false },
            arbeidssoker: {
                arbeidssokerperioder: { status: 200, arbeidssokerperioder: [] },
                underoppfolging: { status: 200, underoppfolging: true },
            },
        };
        const { container } = render(<KrrMelding />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres IKKE når bruker IKKE er under oppfølging', () => {
        const props: ProviderProps = {
            oppfolging: { reservasjonKRR: true },
            arbeidssoker: {
                arbeidssokerperioder: { status: 200, arbeidssokerperioder: [] },
                underoppfolging: { status: 200, underoppfolging: false },
            },
        };
        const { container } = render(<KrrMelding />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });
});
