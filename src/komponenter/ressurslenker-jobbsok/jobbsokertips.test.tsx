import Jobbsokertips from './jobbsokertips';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { ComponentType } from 'react';

describe('Tester jobbsøkertips-komponenten', () => {
    test('Komponenten skal renderes som standard oppførsel', async () => {
        const props: ProviderProps = {};
        render(<Jobbsokertips />, { wrapper: contextProviders(props) as ComponentType });
        expect(screen.getByText(/få jobbsøkertips/i)).toBeTruthy();
    });

    test('Komponenten skal vise riktig tekst UTEN lagret jobbsøkerbesvarelse', async () => {
        const props: ProviderProps = { jobbsokerbesvarelse: { raad: undefined } };
        render(<Jobbsokertips />, { wrapper: contextProviders(props) as ComponentType });
        expect(screen.getByText(/få jobbsøkertips/i)).toBeTruthy();
    });

    test('Komponenten skal vise riktig tekst MED lagret jobbsøkerbesvarelse', async () => {
        const props: ProviderProps = { jobbsokerbesvarelse: { raad: ['søk på jobber'] } };
        render(<Jobbsokertips />, { wrapper: contextProviders(props) as ComponentType });
        expect(screen.getByText(/dine jobbsøkertips/i)).toBeTruthy();
    });
});
