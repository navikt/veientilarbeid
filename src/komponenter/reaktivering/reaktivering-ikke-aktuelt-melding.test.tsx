import { render, screen } from '@testing-library/react';
import { InnloggingsNiva } from '../../contexts/autentisering';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import Reaktivering from './reaktivering-ikke-aktuelt-melding';

describe('Tester at komponenten rendres slik den skal', () => {
    test('Komponenten rendres IKKE som default', () => {
        const providerProps: ProviderProps = {};
        const { container } = render(<Reaktivering />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres dersom brukeren KAN reaktiveres og er nivå 4', async () => {
        const providerProps: ProviderProps = {
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
            oppfolging: {
                kanReaktiveres: true,
            },
        };
        render(<Reaktivering />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(/registrer deg som arbeidssøker/i)).toBeInTheDocument();
        expect(
            screen.getByText(/er du usikker på om din situasjon betyr at du bør være registrert som arbeidssøker/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/ta kontakt med veilederen din i dialogtjenesten/i)).toBeInTheDocument();
        expect(await screen.queryByText(/denne teksten finnes ikke/i)).not.toBeInTheDocument();
    });
});
