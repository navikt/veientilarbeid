import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import KrrMelding from './krr-melding';
import { initialState, OppfolgingContext, State } from '../../ducks/oppfolging';
import tekster from '../../tekster/tekster';
import { DeepPartial } from 'redux';
import merge from 'merge-deep';

const KRRProviders = function (oppfolgingPartialState: DeepPartial<State>): React.FunctionComponent {
    return ({ children }) => (
        <OppfolgingContext.Provider value={merge(initialState, oppfolgingPartialState)}>
            {children}
        </OppfolgingContext.Provider>
    );
};

describe('Test av komponent', () => {
    test('Rendrer komponent hvis reservasjon hos krr', async () => {
        render(<KrrMelding />, { wrapper: KRRProviders({ data: { reservasjonKRR: true } }) });
        expect(screen.getByText(tekster['krr-melding-ingress'])).toBeTruthy();
        expect(screen.getByText(tekster['krr-melding-kulepunkt-ingress'])).toBeTruthy();
        expect(screen.getByText(tekster['krr-melding-kulepunkt1'])).toBeTruthy();
        expect(screen.getByText(tekster['krr-melding-kulepunkt2'])).toBeTruthy();
        expect(screen.getByText(tekster['krr-melding-kulepunkt3'])).toBeTruthy();
        expect(screen.getByText(tekster['krr-melding-lenketekst'])).toBeTruthy();
        expect(await screen.queryByText(/denne teksten finnes ikke/i)).toBeFalsy();
    });

    test('Rendrer IKKE komponent hvis IKKE reservasjon hos krr', async () => {
        const { container } = render(<KrrMelding />, { wrapper: KRRProviders({ data: { reservasjonKRR: false } }) });
        expect(container).toBeEmptyDOMElement();
    });
});
