import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Feedback from './feedback-legacy';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { mockResizeObserver } from '../../mocks/resize-observer-mock';

describe('tester feedback komponenten', () => {
    mockResizeObserver();
    const standardProps: ProviderProps = {
        featureToggle: { 'veientilarbeid.feedback': true },
    };

    test('komponenten rendres ikke uten feature toggle', () => {
        const { container } = render(<Feedback />, {
            wrapper: contextProviders({ featureToggle: { 'veientilarbeid.feedback': false } }),
        });
        expect(container).toBeEmptyDOMElement();
    });

    test('komponenten rendres ikke uten id', () => {
        const { container } = render(<Feedback />, { wrapper: contextProviders(standardProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('komponenten rendrer som forventet', () => {
        const { container } = render(<Feedback id="feedback-test" />, { wrapper: contextProviders(standardProps) });
        expect(container).not.toBeEmptyDOMElement();
    });

    test('valgene blir registrert', () => {
        render(<Feedback id="feedback-test" />, { wrapper: contextProviders(standardProps) });
        const jaKnapp = screen.getByRole('button', { name: /ja/i });
        const neiKnapp = screen.getByRole('button', { name: /nei/i });
        const vetikkeKnapp = screen.getByRole('button', { name: /vet ikke/i });
        userEvent.click(jaKnapp);
        expect(jaKnapp.className).toContain('valgt');
        userEvent.click(neiKnapp);
        expect(neiKnapp.className).toContain('valgt');
        userEvent.click(vetikkeKnapp);
        expect(vetikkeKnapp.className).toContain('valgt');
    });

    test('Default spørsmålstekst vises om man ikke sender inn annet', () => {
        const defaultTekst = 'Var dette nyttig å lese?';
        render(<Feedback id="feedback-test" />, { wrapper: contextProviders(standardProps) });
        expect(screen.getByText(defaultTekst)).toBeTruthy();
    });

    test('Man kan overskrive default spørsmålstekst', () => {
        const overstyrtTekst = 'Digget du dette?';
        render(<Feedback id="feedback-test" sporsmal={overstyrtTekst} />, { wrapper: contextProviders(standardProps) });
        expect(screen.getByText(overstyrtTekst)).toBeTruthy();
    });
});
