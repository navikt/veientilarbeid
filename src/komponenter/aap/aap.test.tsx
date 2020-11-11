import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Aap from './aap';
import tekster from '../../tekster/tekster';
import { contextProviders } from '../../test/test-context-providers';

describe('Aap', () => {
    beforeAll(() => {
        window.HTMLElement.prototype.scrollIntoView = () => {};
    });

    it('rendres når bruker er sykemeldt med arbeidsgiver', async () => {
        const sykmeldt = { erSykmeldtMedArbeidsgiver: true };

        render(<Aap />, { wrapper: contextProviders({ brukerInfo: sykmeldt }) });
        expect(await screen.getByText(tekster['aap-rad-tittel'])).toBeTruthy();
    });

    it('rendres IKKE når bruker ikke er sykmeldt', async () => {
        const ikkeSykmeldt = { erSykmeldtMedArbeidsgiver: false };

        render(<Aap />, { wrapper: contextProviders({ brukerInfo: ikkeSykmeldt }) });
        expect(await screen.queryByText(tekster['aap-rad-tittel'])).toBeFalsy();
    });
});
