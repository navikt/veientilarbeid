import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AlleSkjema from './alleskjema';
import tekster from '../../tekster/tekster';

describe('Tester alle skjema komponenten', () => {
    test('Komponenten rendres når den skal vises', () => {
        render(<AlleSkjema />);
        expect(screen.getByText(tekster['alleskjema-tittel'])).toBeTruthy();
        expect(screen.getByText(tekster['alleskjema-tekst'])).toBeTruthy();
        expect(screen.getByText(tekster['alleskjema-lenke-tekst'])).toBeTruthy();
    });

    test('Klikk på knappen trigger funksjonen', () => {
        const mockHandleButtonClick = jest.fn((e: Event) => {
            e.stopPropagation();
        });
        const mockWindowNavigate = jest.fn();
        render(<AlleSkjema />);
        const button = screen.getByText(tekster['alleskjema-lenke-tekst']);
        button.onclick = mockHandleButtonClick;
        button.onsubmit = mockHandleButtonClick;
        window.location.assign = mockWindowNavigate;
        userEvent.click(button);
        expect(mockHandleButtonClick).toHaveBeenCalledTimes(1);
        expect(mockWindowNavigate).toHaveBeenCalledTimes(0);
    });
});
