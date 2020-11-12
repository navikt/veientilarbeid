import React from 'react';
import Aktivitetsplan from './aktivitetsplan';
import { render, screen } from '@testing-library/react';

describe('Tester komponenten Aktivitetsplan', () => {
    const oldLocation = global.window.location;
    afterEach(() => {
        delete global.window.location;
        global.window.location = Object.assign({}, oldLocation);
    });

    test('Komponenten skal vises som standard oppførsel', async () => {
        render(<Aktivitetsplan />);
        expect(screen.getByText(/aktivitetsplanen/i)).toBeTruthy();
    });

    test('Komponenten skal vise vanlig melding uten query-parameter nyRegistrering', async () => {
        delete global.window.location;
        global.window.location = { search: '' } as Location;

        render(<Aktivitetsplan />);
        expect(screen.getByText(/her holder du orden på aktiviteter/i)).toBeTruthy();
    });

    test('Komponenten skal vise tilpasset melding med query-parameter nyRegistrering=true ', async () => {
        delete global.window.location;
        global.window.location = { search: '?nyRegistrering=true' } as Location;

        render(<Aktivitetsplan />);
        expect(screen.getByText(/NAV har satt opp aktiviteter i aktivitetsplanen din/i)).toBeTruthy();
    });
});
