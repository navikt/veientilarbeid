import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import Reaktivering from './reaktivering-melding';
import tekster from '../../tekster/tekster';

describe('Tester at komponenten rendres slik den skal', () => {
    test('Komponenten rendres IKKE som default', () => {
        const providerProps: ProviderProps = {};
        const { container } = render(<Reaktivering />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres IKKE dersom man er under oppfølging', () => {
        const providerProps: ProviderProps = {
            underOppfolging: {
                underOppfolging: true
            }
        };
        const { container } = render(<Reaktivering />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres dersom brukeren KAN reaktiveres', async () => {
        const providerProps: ProviderProps = {
            oppfolging: {
                kanReaktiveres: true,
            },
        };
        render(<Reaktivering />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(tekster['reaktivering-melding-tekst'])).toBeInTheDocument();
        expect(screen.getByText(tekster['reaktivering-melding-lenke-tekst'])).toBeInTheDocument();
        expect(await screen.queryByText(/denne teksten finnes ikke/i)).not.toBeInTheDocument();
    });
});
