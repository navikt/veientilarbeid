import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Feedback from './feedback';

describe('tester feedback komponenten', () => {
    test('komponenten rendrer som forventet', () => {
        const { container } = render(<Feedback id="feedback-test" />);
        expect(container).not.toBeEmptyDOMElement();
    });

    test('valgene blir registrert', () => {
        render(<Feedback id="feedback-test" />);
        const jaKnapp = screen.getByText(/ja/i).closest('button');
        const neiKnapp = screen.getByText(/nei/i).closest('button');
        const vetikkeKnapp = screen.getByText(/vet ikke/i).closest('button');
        userEvent.click(jaKnapp);
        expect(jaKnapp.className).toContain('valgt');
        userEvent.click(neiKnapp);
        expect(neiKnapp.className).toContain('valgt');
        userEvent.click(vetikkeKnapp);
        expect(vetikkeKnapp.className).toContain('valgt');
    });
});
