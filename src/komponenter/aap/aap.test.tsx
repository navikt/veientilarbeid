import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Aap from './aap';
import tekster from '../../tekster/tekster';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';

describe('Aap', () => {
    beforeAll(() => {
        window.HTMLElement.prototype.scrollIntoView = () => {};
    });

    it('rendres når bruker er sykemeldt med arbeidsgiver', async () => {
        const sykmeldt: ProviderProps = { brukerInfo: { erSykmeldtMedArbeidsgiver: true } };

        render(<Aap />, { wrapper: contextProviders(sykmeldt) });
        expect(await screen.getByText(tekster['aap-rad-tittel'])).toBeTruthy();
    });

    it('rendres IKKE når bruker ikke er sykmeldt', async () => {
        const ikkeSykmeldt: ProviderProps = { brukerInfo: { erSykmeldtMedArbeidsgiver: false } };

        render(<Aap />, { wrapper: contextProviders(ikkeSykmeldt) });
        expect(await screen.queryByText(tekster['aap-rad-tittel'])).toBeFalsy();
    });
});
