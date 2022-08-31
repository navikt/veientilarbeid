import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { InnloggingsNiva } from '../../contexts/autentisering';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import Reaktivering from './reaktivering';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';

describe('Tester at komponenten rendres slik den skal', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    const kanReaktiveresProps: ProviderProps = {
        autentisering: {
            securityLevel: InnloggingsNiva.LEVEL_4,
        },
        oppfolging: {
            kanReaktiveres: true,
        },
    };

    test('Komponenten rendres IKKE som default', () => {
        const { container } = render(<Reaktivering />, { wrapper: contextProviders({}) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres ikke dersom brukeren er nivå 3', async () => {
        const { container } = render(<Reaktivering />, {
            wrapper: contextProviders({
                ...kanReaktiveresProps,
                autentisering: { securityLevel: InnloggingsNiva.LEVEL_3 },
            }),
        });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres ikke dersom brukeren ikke kan reaktiveres', async () => {
        const { container } = render(<Reaktivering />, {
            wrapper: contextProviders({ ...kanReaktiveresProps, oppfolging: { kanReaktiveres: false } }),
        });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres dersom brukeren KAN reaktiveres og er nivå 4', async () => {
        const { container } = render(<Reaktivering />, { wrapper: contextProviders(kanReaktiveresProps) });
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.getByText(/du er ikke lenger registrert som arbeidssøker hos nav/i)).toBeInTheDocument();
    });

    test('Riktig tekst vises dersom brukeren ikke har tatt stilling til om de fortsatt vil være arbeidssøker', async () => {
        const providerProps: ProviderProps = { profil: {}, ...kanReaktiveresProps };
        render(<Reaktivering />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(/registrer deg som arbeidssøker/i)).toBeInTheDocument();
        expect(screen.getByText(/Har du mottatt dagpenger vil utbetalingene nå være stoppet/i)).toBeInTheDocument();
    });

    test('Riktig tekst vises dersom brukeren ikke har behov for å være arbeidssøker', async () => {
        const providerProps: ProviderProps = {
            profil: { aiaReaktiveringVisning: { valg: 'nei', oppdatert: new Date().toISOString() } },
            ...kanReaktiveresProps,
        };
        render(<Reaktivering />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(/registrer deg som arbeidssøker/i)).toBeInTheDocument();
        expect(await screen.queryByText(/mottatt dagpenger vil utbetalingene nå være stoppet/)).not.toBeInTheDocument();
    });
});
