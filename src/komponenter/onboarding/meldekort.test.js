import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import Meldekort from './meldekort';

describe('tester onboarding komponenten for meldekort', () => {
    test('komponenten rendres', () => {
        const props = {};
        const { container } = render(<Meldekort />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.getByText(/Hvordan fungerer meldekort i NAV/i)).toBeInTheDocument();
    });

    test('funksjonen for neste og forrige kort fungerer for nyregistrerte', () => {
        const props = { amplitude: { ukerRegistrert: 0 } };
        const { container } = render(<Meldekort />, { wrapper: contextProviders(props) });
        const nesteknapp = screen.getByText(/neste/i).parentElement;
        const tilbakeknapp = screen.getByText(/tilbake/i).parentElement;

        expect(screen.getByText(/1 av 4/i)).toBeInTheDocument();
        expect(nesteknapp).toBeEnabled();
        expect(tilbakeknapp).toBeDisabled();

        // Navigerer seg gjennom kortene - fremover
        userEvent.click(nesteknapp);
        expect(screen.getByText(/2 av 4/i)).toBeInTheDocument();
        userEvent.click(nesteknapp);
        expect(screen.getByText(/3 av 4/i)).toBeInTheDocument();
        expect(nesteknapp).toBeEnabled();

        // Kan gå tilbake til side 1
        userEvent.click(tilbakeknapp);
        expect(screen.getByText(/2 av 4/i)).toBeInTheDocument();
        userEvent.click(tilbakeknapp);
        expect(screen.getByText(/1 av 4/i)).toBeInTheDocument();
        expect(tilbakeknapp).toBeDisabled();

        // Gå helt til siste side
        userEvent.click(nesteknapp);
        userEvent.click(nesteknapp);
        userEvent.click(nesteknapp);
        expect(screen.getByText(/Innsending av meldekort/i)).toBeInTheDocument();
        expect(nesteknapp).toBeDisabled();
        expect(tilbakeknapp).toBeEnabled();
    });

    test('man starter på endstate om man har vært registrert over 0 uker', () => {
        const props = {
            amplitude: {
                ukerRegistrert: 1,
            },
        };
        const { container } = render(<Meldekort />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.queryByText(/Neste/)).not.toBeInTheDocument();
    });
});
