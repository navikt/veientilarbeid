import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import IkkeRegistrert from './ikke-registrert';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';

describe('Tester IkkeRegistrert-komponenten', () => {
    const oldLocation = global.window.location;

    beforeEach(() => {
        mockIntersectionObserver();
    });

    afterEach(() => {
        delete (global as any).window.location;
        global.window.location = Object.assign({}, oldLocation);
    });

    test('SKJULES når man ikke skal se registrering', async () => {
        const { container } = render(<IkkeRegistrert />);
        expect(container).toBeEmptyDOMElement();
    });

    test('VISES når den skal', async () => {
        delete (global as any).window.location;
        global.window.location = { search: '?goTo=registrering' } as unknown as Location;
        render(<IkkeRegistrert />);
        expect(screen.getByText(/du er ikke registrert som arbeidssøker/i)).toBeTruthy();
    });

    test('knapp fungerer som forventet', async () => {
        const mockHandleClick = vi.fn();
        const mockLocationAssign = vi.fn();

        delete (global as any).window.location;
        global.window.location = { assign: mockLocationAssign, search: '?goTo=registrering' } as unknown as Location;

        render(<IkkeRegistrert />);

        const knapp = screen.getByText(/registrer deg som arbeidssøker/i);
        knapp.onclick = mockHandleClick;
        userEvent.click(knapp);
        expect(mockHandleClick).toHaveBeenCalledTimes(1);
        expect(mockLocationAssign).toHaveBeenCalledTimes(1);
    });
});
