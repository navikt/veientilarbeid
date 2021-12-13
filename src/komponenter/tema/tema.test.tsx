import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { settIBrowserStorage, fjernFraBrowserStorage } from '../../utils/browserStorage-utils';
import Tema from './tema';

const AMPLITUDE_TEMA_TAG = 'test-tag';
const introkort = [<div>introkort</div>, <div>Kort 1</div>, <div>Kort 2</div>, <div>Kort 3</div>, <div>Sluttkort</div>];

const providerProps: ProviderProps = {
    amplitude: {
        ukerRegistrert: 0,
    },
    brukerregistrering: {
        registrering: {
            opprettetDato: '2020-06-01',
        },
    },
};

describe('Tester onboarding komponenten med mange kort', () => {
    beforeEach(() => {
        fjernFraBrowserStorage(AMPLITUDE_TEMA_TAG);
        mockIntersectionObserver();
    });

    test('Viser prestate som standard', () => {
        render(
            <Tema
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                hoppOverPreState={false}
                amplitudeTemaTag={AMPLITUDE_TEMA_TAG}
                innhold={introkort}
            />,
            { wrapper: contextProviders(providerProps) }
        );

        expect(screen.getByText(/introkort/i)).toBeInTheDocument();
    });

    test('Kan starte onboarding', () => {
        render(
            <Tema
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                amplitudeTemaTag={AMPLITUDE_TEMA_TAG}
                hoppOverPreState={false}
                innhold={introkort}
            />,
            { wrapper: contextProviders(providerProps) }
        );

        const startKnapp = screen.getByText(/start introduksjon/i);
        userEvent.click(startKnapp);
        expect(screen.getByText(/Kort 1/i)).toBeInTheDocument();
    });

    test('Går rett til kort 1 hvis hopp "hoppOverPreState" true', () => {
        render(
            <Tema
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                amplitudeTemaTag={AMPLITUDE_TEMA_TAG}
                hoppOverPreState={true}
                innhold={introkort}
            />,
            { wrapper: contextProviders(providerProps) }
        );
        expect(screen.getByText(/Kort 1/i)).toBeInTheDocument();
    });

    test('Kan navigere fram og tilbake i onboardingen', () => {
        render(
            <Tema
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                amplitudeTemaTag={AMPLITUDE_TEMA_TAG}
                hoppOverPreState={true}
                innhold={introkort}
            />,
            { wrapper: contextProviders(providerProps) }
        );

        const nesteKnapp = screen.getByText(/neste/i);
        userEvent.click(nesteKnapp);
        expect(screen.getByText(/Kort 2/i)).toBeInTheDocument();
        const tilbakeKnapp = screen.getByText(/forrige/i);
        userEvent.click(tilbakeKnapp);
        expect(screen.getByText(/Kort 1/i)).toBeInTheDocument();
    });

    test('TilbakeKnapp er disabled på kort 1', () => {
        render(
            <Tema
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                amplitudeTemaTag={AMPLITUDE_TEMA_TAG}
                hoppOverPreState={true}
                innhold={introkort}
            />,
            { wrapper: contextProviders(providerProps) }
        );

        const tilbakelabel = screen.getByText(/forrige/i);
        const tilbakeKnapp = tilbakelabel && tilbakelabel.parentElement;
        tilbakeKnapp && userEvent.click(tilbakeKnapp);
        expect(tilbakeKnapp).toHaveAttribute('disabled');
        expect(screen.getByText(/Kort 1/i)).toBeInTheDocument();
    });

    test('Går rett til sluttkort hvis hopp "hoppRettTilSluttkort" true', () => {
        render(
            <Tema
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                amplitudeTemaTag={AMPLITUDE_TEMA_TAG}
                hoppOverPreState={true}
                hoppRettTilSluttkort={true}
                innhold={introkort}
            />,
            { wrapper: contextProviders(providerProps) }
        );
        expect(screen.getByText(/sluttkort/i)).toBeInTheDocument();
    });

    test('Går rett til sluttkort allerede lest onboarding', () => {
        settIBrowserStorage('ONBOARDING_INTRO', 'true');
        render(
            <Tema
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                amplitudeTemaTag={AMPLITUDE_TEMA_TAG}
                hoppOverPreState={true}
                innhold={introkort}
            />,
            { wrapper: contextProviders(providerProps) }
        );
        expect(screen.getByText(/sluttkort/i)).toBeInTheDocument();
    });

    test('Kan lese intro fra sluttkort', () => {
        render(
            <Tema
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                amplitudeTemaTag={AMPLITUDE_TEMA_TAG}
                hoppOverPreState={true}
                hoppRettTilSluttkort={true}
                innhold={introkort}
            />,
            { wrapper: contextProviders(providerProps) }
        );
        const lesIntroKnapp = screen.getByText(/vis introduksjon/i);
        userEvent.click(lesIntroKnapp);
        expect(screen.getByText(/kort 1/i)).toBeInTheDocument();
    });

    test('Viser slutttkort uten footer når 12 uker siden registrert', () => {
        render(
            <Tema
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                amplitudeTemaTag={AMPLITUDE_TEMA_TAG}
                hoppOverPreState={false}
                innhold={introkort}
            />,
            {
                wrapper: contextProviders({
                    amplitude: {
                        ukerRegistrert: 12,
                    },
                }),
            }
        );
        expect(screen.getByText(/sluttkort/i)).toBeInTheDocument();
        expect(screen.queryByText(/Start introduksjonen/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Hopp over introduksjonen for nå/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Vis introduksjon/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Forrige/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Fullfør/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Neste/i)).not.toBeInTheDocument();
    });
});

const bareSluttkort = [<div>Sluttkort</div>];

describe('Tester onboarding komponenten med bare sluttkort', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('Viser sluttkort som standard', () => {
        render(
            <Tema
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                amplitudeTemaTag={AMPLITUDE_TEMA_TAG}
                hoppOverPreState={false}
                innhold={bareSluttkort}
            />,
            { wrapper: contextProviders(providerProps) }
        );

        expect(screen.getByText(/sluttkort/i)).toBeInTheDocument();
    });

    test('Skjuler navigasjonsknapper', () => {
        render(
            <Tema
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                amplitudeTemaTag={AMPLITUDE_TEMA_TAG}
                hoppOverPreState={false}
                innhold={bareSluttkort}
            />,
            { wrapper: contextProviders(providerProps) }
        );
        expect(screen.queryByText(/Start introduksjonen/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Hopp over introduksjonen for nå/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Vis introduksjon/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Forrige/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Fullfør/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Neste/i)).not.toBeInTheDocument();
    });
});
