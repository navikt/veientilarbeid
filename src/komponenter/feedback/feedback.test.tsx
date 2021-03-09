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
        const jaKnapp = screen.getByText(/ja/i).closest('button');
        const neiKnapp = screen.getByText(/nei/i).closest('button');
        const vetikkeKnapp = screen.getByText(/vet ikke/i).closest('button'); // @ts-ignore
        userEvent.click(jaKnapp); // @ts-ignore
        expect(jaKnapp.className).toContain('valgt'); // @ts-ignore
        userEvent.click(neiKnapp); // @ts-ignore
        expect(neiKnapp.className).toContain('valgt'); // @ts-ignore
        userEvent.click(vetikkeKnapp); // @ts-ignore
        expect(vetikkeKnapp.className).toContain('valgt'); // @ts-ignore
    });
});
