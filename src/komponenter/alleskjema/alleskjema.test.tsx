import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import AlleSkjema from './alleskjema';
import tekster from '../../tekster/tekster';

describe('Tester alle skjema komponenten', () => {
    const oldLocation = global.window.location;

    afterEach(() => {
        delete global.window.location;
        global.window.location = Object.assign({}, oldLocation);
    });

    test('Komponenten rendres når bruker er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: true },
        };
        render(<AlleSkjema />, { wrapper: contextProviders(props) });
        expect(screen.getByText(tekster['alleskjema-tittel'])).toBeTruthy();
        expect(screen.getByText(tekster['alleskjema-tekst'])).toBeTruthy();
        expect(screen.getByText(tekster['alleskjema-lenke-tekst'])).toBeTruthy();
    });

    test('Komponenten rendres IKKE når bruker IKKE er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: false },
        };
        const { container } = render(<AlleSkjema />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Klikk på knappen trigger funksjonen', () => {
        const mockHandleButtonClick = jest.fn();
        const mockWindowNavigate = jest.fn();
        delete global.window.location;
        global.window.location = ({ assign: mockWindowNavigate } as unknown) as Location;

        const props: ProviderProps = {
            underOppfolging: { underOppfolging: true },
        };
        render(<AlleSkjema />, { wrapper: contextProviders(props) });
        const button = screen.getByText(tekster['alleskjema-lenke-tekst']);
        button.onclick = mockHandleButtonClick;
        button.onsubmit = mockHandleButtonClick;
        window.location.assign = mockWindowNavigate;
        userEvent.click(button);
        expect(mockHandleButtonClick).toHaveBeenCalledTimes(1);
        expect(mockWindowNavigate).toHaveBeenCalledTimes(1);
    });
});
