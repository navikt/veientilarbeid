import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';
import { settIBrowserStorage } from '../../utils/browserStorage-utils';

import Onboarding from './onboarding';

const introkort = [<div>introkort</div>, <div>Kort 1</div>, <div>Kort 2</div>, <div>Kort 3</div>, <div>Sluttkort</div>];

describe('Tester onboarding komponenten med mange kort', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('Viser prestate som standard', () => {
        render(
            <Onboarding
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                hoppOverPreState={false}
                innhold={introkort}
            />
        );

        expect(screen.getByText(/introkort/i)).toBeInTheDocument();
    });

    test('Kan starte onboarding', () => {
        render(
            <Onboarding
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                hoppOverPreState={false}
                innhold={introkort}
            />
        );

        const startKnapp = screen.getByText(/start introduksjon/i);
        userEvent.click(startKnapp);
        expect(screen.getByText(/Kort 1/i)).toBeInTheDocument();
    });

    test('Går rett til kort 1 hvis hopp "hoppOverPreState" true', () => {
        render(
            <Onboarding
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                hoppOverPreState={true}
                innhold={introkort}
            />
        );
        expect(screen.getByText(/Kort 1/i)).toBeInTheDocument();
    });

    test('Kan navigere fram og tilbake i onboardingen', () => {
        render(
            <Onboarding
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                hoppOverPreState={true}
                innhold={introkort}
            />
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
            <Onboarding
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                hoppOverPreState={true}
                innhold={introkort}
            />
        );

        const tilbakeKnapp = screen.getByText(/forrige/i);
        userEvent.click(tilbakeKnapp);
        expect(tilbakeKnapp).toHaveAttribute('disabled');
        expect(screen.getByText(/Kort 1/i)).toBeInTheDocument();
    });

    test('Går rett til sluttkort hvis hopp "hoppRettTilSluttkort" true', () => {
        render(
            <Onboarding
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                hoppOverPreState={true}
                hoppRettTilSluttkort={true}
                innhold={introkort}
            />
        );
        expect(screen.getByText(/sluttkort/i)).toBeInTheDocument();
    });

    test('Går rett til sluttkort allerede lest onboarding', () => {
        settIBrowserStorage('ONBOARDING_INTRO', 'true');
        render(
            <Onboarding
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                hoppOverPreState={true}
                innhold={introkort}
            />
        );
        expect(screen.getByText(/sluttkort/i)).toBeInTheDocument();
    });

    test('Kan lese intro fra sluttkort', () => {
        render(
            <Onboarding
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                hoppOverPreState={true}
                hoppRettTilSluttkort={true}
                innhold={introkort}
            />
        );
        const lesIntroKnapp = screen.getByText(/vis introduksjon/i);
        userEvent.click(lesIntroKnapp);
        expect(screen.getByText(/kort 1/i)).toBeInTheDocument();
    });
});

const bareSluttkort = [<div>Sluttkort</div>];

describe('Tester onboarding komponenten med bare sluttkort', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('Viser sluttkort som standard', () => {
        render(
            <Onboarding
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                hoppOverPreState={false}
                innhold={bareSluttkort}
            />
        );

        expect(screen.getByText(/sluttkort/i)).toBeInTheDocument();
    });

    test('Skjuler navigasjonsknapper', () => {
        render(
            <Onboarding
                header="Introduksjon til onboardingen"
                id="ONBOARDING_INTRO"
                hoppOverPreState={false}
                innhold={bareSluttkort}
            />
        );
        expect(screen.queryByText(/Start introduksjonen/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Hopp over introduksjonen for nå/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Vis introduksjon/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Forrige/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Fullfør/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Neste/i)).not.toBeInTheDocument();
    });
});
