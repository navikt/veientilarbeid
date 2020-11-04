import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Aap from './aap';
import tekster from '../../tekster/tekster';
import { BrukerInfoContext } from '../../ducks/bruker-info';
import { ReactChildren, ReactElement } from 'react';

const AapProviders = function ({
    brukerInfoContextProviderProps,
}): ({ children }: { children: ReactChildren }) => ReactElement {
    return ({ children }) => (
        <BrukerInfoContext.Provider value={brukerInfoContextProviderProps}>{children}</BrukerInfoContext.Provider>
    );
};

describe('Aap', () => {
    beforeAll(() => {
        window.HTMLElement.prototype.scrollIntoView = () => {};
    });

    it('rendres når bruker er sykemeldt med arbeidsgiver', async () => {
        const providerProps = {
            brukerInfoContextProviderProps: { data: { erSykmeldtMedArbeidsgiver: true } },
        };
        render(<Aap />, { wrapper: AapProviders(providerProps) });
        expect(await screen.getByText(tekster['aap-rad-tittel'])).toBeTruthy();
    });

    it('rendres IKKE når bruker ikke er sykmeldt', async () => {
        const providerProps = {
            brukerInfoContextProviderProps: { data: { erSykmeldtMedArbeidsgiver: false } },
        };
        render(<Aap />, { wrapper: AapProviders(providerProps) });
        expect(await screen.queryByText(tekster['aap-rad-tittel'])).toBeFalsy();
    });
});
