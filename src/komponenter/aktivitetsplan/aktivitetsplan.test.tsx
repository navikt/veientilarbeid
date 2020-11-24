import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Aktivitetsplan from './aktivitetsplan';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';

describe('Tester komponenten Aktivitetsplan', () => {
    const oldLocation = global.window.location;
    afterEach(() => {
        delete global.window.location;
        global.window.location = Object.assign({}, oldLocation);
    });

    test('Komponenten VISES om man er under oppfølging', async () => {
        const props: ProviderProps = {
            underOppfolging: {
                erBrukerUnderOppfolging: true,
            },
        };
        render(<Aktivitetsplan />, { wrapper: contextProviders(props) });
        expect(screen.getByText(/aktivitetsplanen/i)).toBeTruthy();
    });

    test('Komponenten vises IKKE om man IKKE er under oppfølging', async () => {
        const props: ProviderProps = {
            underOppfolging: {
                erBrukerUnderOppfolging: false,
            },
        };
        const { container } = render(<Aktivitetsplan />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten skal vise vanlig melding uten query-parameter nyRegistrering om man er under oppfølging', async () => {
        const props: ProviderProps = {
            underOppfolging: {
                erBrukerUnderOppfolging: true,
            },
        };

        delete global.window.location;
        global.window.location = { search: '' } as Location;

        render(<Aktivitetsplan />, { wrapper: contextProviders(props) });
        expect(screen.getByText(/her holder du orden på aktiviteter/i)).toBeTruthy();
    });

    test('Komponenten skal vise tilpasset melding med query-parameter nyRegistrering=true ', async () => {
        const props: ProviderProps = {
            underOppfolging: {
                erBrukerUnderOppfolging: true,
            },
        };

        delete global.window.location;
        global.window.location = { search: '?nyRegistrering=true' } as Location;

        render(<Aktivitetsplan />, { wrapper: contextProviders(props) });
        expect(screen.getByText(/NAV har satt opp aktiviteter i aktivitetsplanen din/i)).toBeTruthy();
    });
});
