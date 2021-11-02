import Dialog from './dialog';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { FunctionComponent } from 'react';
import { render, screen } from '@testing-library/react';
import tekster from '../../tekster/tekster';
import { Formidlingsgruppe, Servicegruppe } from '../../context/oppfolging';
import '@testing-library/jest-dom/extend-expect';

describe('Tester dialog-komponent', () => {
    test('Komponenten renderes uten detaljert info som standard-oppførsel', async () => {
        const providerProps: ProviderProps = {
            underOppfolging: { underOppfolging: true },
        };
        render(<Dialog />, { wrapper: contextProviders(providerProps) as FunctionComponent });
        expect(screen.getByText(/dialog med veilederen din/i)).toBeTruthy();
        expect(screen.getByText(/send melding hvis du lurer på noe/i)).toBeTruthy();
    });

    test('Komponenten viser IKKE antall uleste dialogmeldinger med antall = 0', async () => {
        const providerProps: ProviderProps = {
            underOppfolging: { underOppfolging: true },
            ulesteDialoger: { antallUleste: 0 },
        };
        render(<Dialog />, { wrapper: contextProviders(providerProps) as FunctionComponent });
        expect(await screen.queryByText(/ulest/i)).toBeFalsy();
    });

    test('Komponenten viser antall uleste dialogmeldinger med antall = 1', async () => {
        const providerProps: ProviderProps = {
            underOppfolging: { underOppfolging: true },
            ulesteDialoger: { antallUleste: 1 },
        };
        render(<Dialog />, { wrapper: contextProviders(providerProps) as FunctionComponent });
        expect(screen.getByText(/1 ulest melding/i)).toBeTruthy();
    });

    test('Komponenten viser antall uleste dialogmeldinger med antall > 1', async () => {
        const providerProps: ProviderProps = {
            underOppfolging: { underOppfolging: true },
            ulesteDialoger: { antallUleste: 42 },
        };
        render(<Dialog />, { wrapper: contextProviders(providerProps) as FunctionComponent });
        expect(screen.getByText(/42 uleste meldinger/i)).toBeTruthy();
    });

    test('Komponenten rendres når bruker er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: true },
        };
        render(<Dialog />, { wrapper: contextProviders(props) });
        expect(screen.getByText(tekster['dialog'])).toBeTruthy();
    });

    test('Komponenten rendres IKKE når bruker IKKE er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: false },
        };
        const { container } = render(<Dialog />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres IKKE når bruker ser 14a onboarding', () => {
        const props: ProviderProps = {
            underOppfolging: {
                underOppfolging: true,
            },
            brukerInfo: {
                rettighetsgruppe: 'DAGP',
                geografiskTilknytning: '110302',
                alder: 42,
            },
            amplitude: {
                ukerRegistrert: 2,
                gruppe: 'kss',
                eksperimenter: ['onboarding14a'],
            },
            oppfolging: {
                formidlingsgruppe: Formidlingsgruppe.ARBS,
                servicegruppe: Servicegruppe.IKVAL,
            },
            featureToggle: {
                'veientilarbeid.14a-intro': true,
            },
        };
        const { container } = render(<Dialog />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });
});
