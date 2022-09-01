import { render, screen } from '@testing-library/react';
import { InnloggingsNiva } from '../../contexts/autentisering';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import Reaktivering from './reaktivering-melding';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';

describe('Tester at komponenten rendres slik den skal', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('Komponenten rendres IKKE som default', () => {
        const mockSetReaktivering = vi.fn();
        const providerProps: ProviderProps = {};
        const { container } = render(<Reaktivering setReaktivering={mockSetReaktivering} />, {
            wrapper: contextProviders(providerProps),
        });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres dersom brukeren KAN reaktiveres og er nivå 4', async () => {
        const mockSetReaktivering = vi.fn();
        const providerProps: ProviderProps = {
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
            oppfolging: {
                kanReaktiveres: true,
            },
        };
        render(<Reaktivering setReaktivering={mockSetReaktivering} />, {
            wrapper: contextProviders(providerProps),
        });
        expect(
            screen.getByText(
                /har du mottatt dagpenger vil utbetalingene nå være stoppet\. du må registrere deg på nytt og sende inn ny søknad om dagpenger\./i
            )
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                /dersom du ønsker arbeidsrettet oppfølging fra NAV, må du være registrert som arbeidssøker\./i
            )
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                /dersom du har søkt eller ønsker å søke om dagpenger må du være registrert som arbeidssøker\./i
            )
        ).toBeInTheDocument();
        expect(screen.getByText(/registrer deg som arbeidssøker/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Er du usikker på om din situasjon betyr at du bør være registrert som arbeidssøker/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/ta kontakt med veilederen din i dialogtjenesten/i)).toBeInTheDocument();
        expect(
            screen.getByText(/jeg har ikke lenger behov for å være registrert som arbeidssøker hos nav/i)
        ).toBeInTheDocument();
        expect(await screen.queryByText(/denne teksten finnes ikke/i)).not.toBeInTheDocument();
    });
});
