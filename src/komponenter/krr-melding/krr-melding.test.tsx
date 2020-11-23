import * as React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import KrrMelding from './krr-melding';
import tekster from '../../tekster/tekster';
import {contextProviders, ProviderProps} from '../../test/test-context-providers';

describe('Test av komponent', () => {
    test('Rendrer komponent hvis reservasjon hos krr og underOppfolging', async () => {
        const props: ProviderProps = {
            oppfolging: { reservasjonKRR: true },
            underOppfolging: { erBrukerUnderOppfolging: true },
        };
        render(<KrrMelding />, { wrapper: contextProviders(props) });
        expect(screen.getByText(tekster['krr-melding-ingress'])).toBeTruthy();
        expect(screen.getByText(tekster['krr-melding-kulepunkt-ingress'])).toBeTruthy();
        expect(screen.getByText(tekster['krr-melding-kulepunkt1'])).toBeTruthy();
        expect(screen.getByText(tekster['krr-melding-kulepunkt2'])).toBeTruthy();
        expect(screen.getByText(tekster['krr-melding-kulepunkt3'])).toBeTruthy();
        expect(screen.getByText(tekster['krr-melding-lenketekst'])).toBeTruthy();
        expect(await screen.queryByText(/denne teksten finnes ikke/i)).toBeFalsy();
    });

    test('Rendrer IKKE komponent hvis IKKE reservasjon hos krr', async () => {
        const props: ProviderProps = {
            oppfolging: { reservasjonKRR: false },
            underOppfolging: { erBrukerUnderOppfolging: true },
        };
        const { container } = render(<KrrMelding />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres IKKE når bruker IKKE er under oppfølging', () => {
        const props: ProviderProps = {
            oppfolging: { reservasjonKRR: true },
            underOppfolging: { erBrukerUnderOppfolging: false },
        };
        const { container } = render(<KrrMelding />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

});
