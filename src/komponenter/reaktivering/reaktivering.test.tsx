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
        const { container } = render(<Reaktivering />, { wrapper: contextProviders(providerProps) });
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.getByText(/du er ikke lenger registrert som arbeidssøker hos nav/i)).toBeInTheDocument();
    });
});
