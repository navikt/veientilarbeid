import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import KrrMelding from './krr-melding';
import { OppfolgingContext } from '../../ducks/oppfolging';
import tekster from '../../tekster/tekster';

const KRRProviders = function ({
    oppfolgingContextProviderProps,
}): ({ children }: { children: React.ReactChildren }) => React.ReactElement {
    return ({ children }) => (
        <OppfolgingContext.Provider value={oppfolgingContextProviderProps}>{children}</OppfolgingContext.Provider>
    );
};

describe('Test av komponent', () => {
    test('Rendrer komponent hvis reservasjon hos krr', async () => {
        const providerProps = {
            oppfolgingContextProviderProps: { data: { reservasjonKRR: true } },
        };
        render(<KrrMelding />, { wrapper: KRRProviders(providerProps) });
        expect(screen.getByText(tekster['krr-melding-ingress'])).toBeTruthy();
        expect(screen.getByText(tekster['krr-melding-kulepunkt-ingress'])).toBeTruthy();
        expect(screen.getByText(tekster['krr-melding-kulepunkt1'])).toBeTruthy();
        expect(screen.getByText(tekster['krr-melding-kulepunkt2'])).toBeTruthy();
        expect(screen.getByText(tekster['krr-melding-kulepunkt3'])).toBeTruthy();
        expect(screen.getByText(tekster['krr-melding-lenketekst'])).toBeTruthy();
        expect(await screen.queryByText(/denne teksten finnes ikke/i)).toBeFalsy();
    });

    test('Rendrer IKKE komponent hvis IKKE reservasjon hos krr', async () => {
        const providerProps = {
            oppfolgingContextProviderProps: { data: { reservasjonKRR: false } },
        };
        const { container } = render(<KrrMelding />, { wrapper: KRRProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });
});
