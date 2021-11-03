import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SjekkKtnr from './sjekk-kontonummer';
import { InnloggingsNiva } from '../../contexts/autentisering';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';

describe('tester at komponenten oppfører seg som forventet', () => {
    test('Komponentet rendres IKKE hvis ikke under oppfølging og nivå 4', () => {
        const providerProps: ProviderProps = {};
        const { container } = render(<SjekkKtnr />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponentet vises IKKE dersom ikke under oppfølging og nivå 4', () => {
        const providerProps: ProviderProps = {
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
            underOppfolging: {
                underOppfolging: false,
            },
        };
        const { container } = render(<SjekkKtnr />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponentet vises IKKE dersom ikke under oppfølging og nivå 3', () => {
        const providerProps: ProviderProps = {
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_3,
            },
            underOppfolging: {
                underOppfolging: false,
            },
        };
        const { container } = render(<SjekkKtnr />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponentet VISES hvis under oppfølging og nivå 4', async () => {
        const providerProps: ProviderProps = {
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
            underOppfolging: {
                underOppfolging: true,
            },
        };
        render(<SjekkKtnr />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(/sjekk kontonummer/i)).toBeInTheDocument();
        expect(await screen.queryByText(/denne teksten finnes ikke/i)).toBeFalsy();
    });

    test('Komponentet VISES hvis under oppfølging og nivå 3', async () => {
        const providerProps: ProviderProps = {
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_3,
            },
            underOppfolging: {
                underOppfolging: true,
            },
        };
        render(<SjekkKtnr />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(/sjekk kontonummer/i)).toBeInTheDocument();
        expect(await screen.queryByText(/denne teksten finnes ikke/i)).toBeFalsy();
    });
});
