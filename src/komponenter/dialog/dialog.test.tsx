import Dialog from './dialog';
import {contextProviders, ProviderProps} from '../../test/test-context-providers';
import React, {ComponentType} from 'react';
import {render, screen} from '@testing-library/react';
import tekster from '../../tekster/tekster';
import '@testing-library/jest-dom/extend-expect';

describe('Tester dialog-komponent', () => {
    test('Komponenten renderes uten detaljert info som standard-oppførsel', async () => {
        const providerProps: ProviderProps = {
            underOppfolging: { erBrukerUnderOppfolging: true },
        };
        render(<Dialog />, { wrapper: contextProviders(providerProps) as ComponentType });
        expect(screen.getByText(/dialog med veilederen din/i)).toBeTruthy();
        expect(screen.getByText(/send melding hvis du lurer på noe/i)).toBeTruthy();
    });

    test('Komponenten viser IKKE antall uleste dialogmeldinger med antall = 0', async () => {
        const providerProps: ProviderProps = {
            underOppfolging: { erBrukerUnderOppfolging: true },
            ulesteDialoger: { antallUleste: 0 },
        };
        render(<Dialog />, { wrapper: contextProviders(providerProps) as ComponentType });
        expect(await screen.queryByText(/ulest/i)).toBeFalsy();
    });

    test('Komponenten viser antall uleste dialogmeldinger med antall = 1', async () => {
        const providerProps: ProviderProps = {
            underOppfolging: { erBrukerUnderOppfolging: true },
            ulesteDialoger: { antallUleste: 1 },
        };
        render(<Dialog />, { wrapper: contextProviders(providerProps) as ComponentType });
        expect(screen.getByText(/1 ulest melding/i)).toBeTruthy();
    });

    test('Komponenten viser antall uleste dialogmeldinger med antall > 1', async () => {
        const providerProps: ProviderProps = {
            underOppfolging: { erBrukerUnderOppfolging: true },
            ulesteDialoger: { antallUleste: 42 },
        };
        render(<Dialog />, { wrapper: contextProviders(providerProps) as ComponentType });
        expect(screen.getByText(/42 uleste meldinger/i)).toBeTruthy();
    });

    test('Komponenten rendres når bruker er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: { erBrukerUnderOppfolging: true },
        };
        render(<Dialog />, { wrapper: contextProviders(props) });
        expect(screen.getByText(tekster['dialog'])).toBeTruthy();
    });

    test('Komponenten rendres IKKE når bruker IKKE er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: { erBrukerUnderOppfolging: false },
        };
        const { container } = render(<Dialog />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });
});
