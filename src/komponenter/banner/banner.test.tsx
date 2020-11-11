import * as React from 'react';
import { render, screen } from '@testing-library/react';
import tekster from '../../tekster/tekster';
import Banner from './banner';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';

describe('Banner', () => {
    const OLD_ENV = process.env;
    const sykmeldtProps: ProviderProps = { brukerInfo: { erSykmeldtMedArbeidsgiver: true } };
    const ikkeSykmeldtProps: ProviderProps = { brukerInfo: { erSykmeldtMedArbeidsgiver: false } };

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV, REACT_APP_MICRO: 'false' };
    });

    afterAll(() => {
        process.env = OLD_ENV;
    });

    it('rendres dersom ikke mikrofrontend', async () => {
        render(<Banner />, { wrapper: contextProviders(sykmeldtProps) });
        expect(await screen.getByText(tekster['startside-sykmeldt-banner-brodsmule'])).toBeTruthy();
    });

    it('rendres med riktig tekst dersom ikke sykmeldt', async () => {
        render(<Banner />, { wrapper: contextProviders(ikkeSykmeldtProps) });
        expect(screen.getAllByText(tekster['startside-ordinaer-banner-brodsmule']).length >= 1).toBeTruthy();
    });

    it('rendres IKKE dersom microfrontend', async () => {
        process.env = { ...OLD_ENV, REACT_APP_MICRO: 'true' };
        const { container } = render(<Banner />, { wrapper: contextProviders(ikkeSykmeldtProps) });
        expect((container.firstChild as HTMLElement)?.classList.contains('banner')).toBeFalsy();
    });
});
