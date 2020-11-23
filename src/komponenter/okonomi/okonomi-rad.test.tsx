import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import OkonomiRad from './okonomi-rad';

describe('Tester at komponenten rendres som forventet', () => {
    test('Komponenten rendres IKKE som default', () => {
        const props: ProviderProps = {};
        const { container } = render(<OkonomiRad />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres om man er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: {
                erBrukerUnderOppfolging: true,
            },
        };
        const { container } = render(<OkonomiRad />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
    });
});
