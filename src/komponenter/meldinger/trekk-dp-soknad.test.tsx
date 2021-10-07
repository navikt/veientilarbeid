import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import TrekkDPSoknad from './trekk-dp-soknad';
import { InnloggingsNiva } from '../../ducks/autentisering';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';

describe('Tester at komponenten rendrer som forventet', () => {
    test('Rendrer IKKE komponenten dersom ikke oppfølging', () => {
        const providerProps: ProviderProps = {
            underOppfolging: { underOppfolging: false },
        };
        const { container } = render(<TrekkDPSoknad />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponentet vises IKKE dersom ikke under oppfølging og nivå 4', () => {
        const providerProps: ProviderProps = {
            underOppfolging: { underOppfolging: false },
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
        };
        const { container } = render(<TrekkDPSoknad />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponentet vises IKKE dersom ikke under oppfølging og nivå 3', () => {
        const providerProps: ProviderProps = {
            underOppfolging: { underOppfolging: false },
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_3,
            },
        };
        const { container } = render(<TrekkDPSoknad />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponentet VISES hvis under oppfølging og nivå 4', async () => {
        const providerProps: ProviderProps = {
            underOppfolging: { underOppfolging: true },
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
        };
        render(<TrekkDPSoknad />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(/trekk dagpengesøknaden/i)).toBeInTheDocument();
        expect(await screen.queryByText(/denne teksten finnes ikke/i)).toBeFalsy();
    });

    test('Komponentet VISES hvis under oppfølging og nivå 3', async () => {
        const providerProps: ProviderProps = {
            underOppfolging: { underOppfolging: true },
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_3,
            },
        };
        render(<TrekkDPSoknad />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(/trekk dagpengesøknaden/i)).toBeInTheDocument();
        expect(await screen.queryByText(/denne teksten finnes ikke/i)).toBeFalsy();
    });
});
