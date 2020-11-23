import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/react';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import OkonomiRad from './okonomi-rad-dagpenger';
import tekster from '../../tekster/tekster';

describe('Tester rendring av komponenten', () => {
    test('Komponenten rendres IKKE som default', () => {
        const props: ProviderProps = {};
        const { container } = render(<OkonomiRad />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres når man er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: {
                erBrukerUnderOppfolging: true,
            },
        };
        render(<OkonomiRad />, { wrapper: contextProviders(props) });
        expect(screen.getByText(tekster['dagpenger-heading-tekst'])).toBeTruthy();
    });
});
