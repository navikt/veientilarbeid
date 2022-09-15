import { render, screen } from '@testing-library/react';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import Reaktivering from './reaktivering';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';

describe('Tester at komponenten rendres slik den skal', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('Riktig tekst vises dersom brukeren ikke har tatt stilling til om de fortsatt vil være arbeidssøker', async () => {
        const providerProps: ProviderProps = { profil: {} };
        render(<Reaktivering />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(/registrer deg som arbeidssøker/i)).toBeInTheDocument();
        expect(screen.getByText(/Har du mottatt dagpenger vil utbetalingene nå være stoppet/i)).toBeInTheDocument();
    });

    test('Riktig tekst vises dersom brukeren ikke har behov for å være arbeidssøker', async () => {
        const providerProps: ProviderProps = {
            profil: { aiaReaktiveringVisning: { valg: 'nei', oppdatert: new Date().toISOString() } },
        };
        render(<Reaktivering />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(/registrer deg som arbeidssøker/i)).toBeInTheDocument();
        expect(await screen.queryByText(/mottatt dagpenger vil utbetalingene nå være stoppet/)).not.toBeInTheDocument();
    });
});
