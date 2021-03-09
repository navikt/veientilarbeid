import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Feedback from './feedback';

describe('tester feedback komponenten', () => {
    test('komponenten rendres ikke uten id', () => {
        const { container } = render(<Feedback />);
        expect(container).toBeEmptyDOMElement();
    });

    test('komponenten rendrer som forventet', () => {
        const { container } = render(<Feedback id="feedback-test" />);
        expect(container).not.toBeEmptyDOMElement();
    });

    test('valgene blir registrert', () => {
        render(<Feedback id="feedback-test" />);
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
});
