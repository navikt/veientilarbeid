import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dagpenger from './dagpenger';
import tekster from '../../tekster/tekster';

describe('Tester dagpengerkomponenten', () => {
    test('Dagpenger-komponenten rendrer som den skal', () => {
        render(<Dagpenger />);
        expect(screen.getByText(tekster['dagpenger-tittel'])).toBeTruthy();
        expect(screen.getByText(tekster['dagpenger-tekst'])).toBeTruthy();
        expect(screen.getByText(tekster['dagpenger-lenke-tekst'])).toBeTruthy();
    });

    test('Knappen fungerer som den skal', () => {
        const mockHandleClick = jest.fn();
        const mockLocationAssign = jest.fn();

        render(<Dagpenger />);

        const button = screen.getByText(tekster['dagpenger-lenke-tekst']);
        button.onclick = mockHandleClick;
        window.location.assign = mockLocationAssign;

        userEvent.click(button);
        expect(mockHandleClick).toHaveBeenCalledTimes(1);
        expect(mockLocationAssign).toHaveBeenCalledTimes(1);
    });
});
