import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import TrekkDPSoknad from './trekk-dp-soknad';
import { InnloggingsNiva } from '../../ducks/autentisering';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';

describe('Tester at komponenten rendrer som forventet', () => {
    test('Rendrer IKKE komponenten dersom ikke oppfølging', () => {
        const providerProps: ProviderProps = {};
        const { container } = render(<TrekkDPSoknad />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponentet vises IKKE dersom ikke under oppfølging og nivå 4', () => {
        const providerProps: ProviderProps = {
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
            oppfolging: {
                underOppfolging: false,
            },
        };
        const { container } = render(<TrekkDPSoknad />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponentet vises IKKE dersom ikke under oppfølging og nivå 3', () => {
        const providerProps: ProviderProps = {
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_3,
            },
            oppfolging: {
                underOppfolging: false,
            },
        };
        const { container } = render(<TrekkDPSoknad />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponentet VISES hvis under oppfølging og nivå 4', async () => {
        const providerProps: ProviderProps = {
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
            oppfolging: {
                underOppfolging: true,
            },
        };
        render(<TrekkDPSoknad />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(/trekk dagpengesøknaden/i)).toBeInTheDocument();
        expect(await screen.queryByText(/denne teksten finnes ikke/i)).toBeFalsy();
    });

    test('Komponentet VISES hvis under oppfølging og nivå 3', async () => {
        const providerProps: ProviderProps = {
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_3,
            },
            oppfolging: {
                underOppfolging: true,
            },
        };
        render(<TrekkDPSoknad />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(/trekk dagpengesøknaden/i)).toBeInTheDocument();
        expect(await screen.queryByText(/denne teksten finnes ikke/i)).toBeFalsy();
    });
});
