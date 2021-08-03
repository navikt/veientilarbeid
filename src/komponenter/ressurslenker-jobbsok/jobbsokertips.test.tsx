import * as React from 'react';
import { ComponentType } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Jobbsokertips from './jobbsokertips';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';

describe('Tester jobbsøkertips-komponenten', () => {
    test('Komponenten skal IKKE renderes som standard oppførsel', async () => {
        const props: ProviderProps = {};
        const { container } = render(<Jobbsokertips />, { wrapper: contextProviders(props) as ComponentType });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten skal IKKE vises UTEN lagret jobbsøkerbesvarelse', async () => {
        const props: ProviderProps = { jobbsokerbesvarelse: { raad: undefined } };
        const { container } = render(<Jobbsokertips />, { wrapper: contextProviders(props) as ComponentType });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten skal vise riktig tekst MED lagret jobbsøkerbesvarelse', async () => {
        const props: ProviderProps = { jobbsokerbesvarelse: { raad: ['søk på jobber'] } };
        render(<Jobbsokertips />, { wrapper: contextProviders(props) as ComponentType });
        expect(screen.getByText(/dine jobbsøkertips/i)).toBeTruthy();
    });
});
