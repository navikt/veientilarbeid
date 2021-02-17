import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import Meldekort from './meldekort'

describe('tester onboarding komponenten for meldekort', () => {
  test('komponenten rendres', () => {
    const props = {}
    const { container } = render(<Meldekort />, { wrapper: contextProviders(props) });
    expect(container).not.toBeEmptyDOMElement();
    expect(screen.getByText(/Hvordan fungerer meldekort i NAV/i)).toBeInTheDocument();
  })

  test('funksjonen for neste og forrige kort fungerer', () => {
    const props = {}
    const { container } = render(<Meldekort />, { wrapper: contextProviders(props) });
    const nesteknapp = screen.getByText(/neste/i)
    const tilbakeknapp = screen.getByText(/tilbake/i)
    expect(screen.getByText(/1 av 4/i)).toBeInTheDocument();
    
    // Navigerer seg gjennom kortene - fremover
    userEvent.click(nesteknapp)
    expect(screen.getByText(/2 av 4/i)).toBeInTheDocument();
    userEvent.click(nesteknapp)
    expect(screen.getByText(/3 av 4/i)).toBeInTheDocument();
    userEvent.click(nesteknapp)
    expect(screen.getByText(/4 av 4/i)).toBeInTheDocument();

    // Sjekker at man ikke kan gå lenger frem enn siste kort
    userEvent.click(nesteknapp)
    expect(screen.getByText(/4 av 4/i)).toBeInTheDocument();

    // Navigerer seg gjennom kortene - bakover
    userEvent.click(tilbakeknapp)
    expect(screen.getByText(/3 av 4/i)).toBeInTheDocument();
    userEvent.click(tilbakeknapp)
    expect(screen.getByText(/2 av 4/i)).toBeInTheDocument();
    userEvent.click(tilbakeknapp)
    expect(screen.getByText(/1 av 4/i)).toBeInTheDocument();

    // Sjekker at man ikke kan gå lenger tilbake enn første kort
    userEvent.click(tilbakeknapp)
    expect(screen.getByText(/1 av 4/i)).toBeInTheDocument();
  })
})
