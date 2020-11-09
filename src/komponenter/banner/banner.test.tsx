import * as React from 'react';
import { render, screen } from '@testing-library/react';
import tekster from '../../tekster/tekster';
import Banner from './banner';
import { contextProviders } from '../../test/test-context-providers';

describe('Banner', () => {
    const OLD_ENV = process.env;
    const sykmeldtState = { erSykmeldtMedArbeidsgiver: true };
    const ikkeSykmeldtState = { erSykmeldtMedArbeidsgiver: false };

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV, REACT_APP_MICRO: 'false' };
    });

    afterAll(() => {
        process.env = OLD_ENV;
    });

    it('rendres dersom ikke mikrofrontend', async () => {
        render(<Banner />, { wrapper: contextProviders({ brukerInfo: sykmeldtState }) });
        expect(await screen.getByText(tekster['startside-sykmeldt-banner-brodsmule'])).toBeTruthy();
    });

    it('rendres med riktig tekst dersom ikke sykmeldt', async () => {
        render(<Banner />, { wrapper: contextProviders({ brukerInfo: ikkeSykmeldtState }) });
        expect(screen.getAllByText(tekster['startside-ordinaer-banner-brodsmule']).length >= 1).toBeTruthy();
    });

    it('rendres IKKE dersom microfrontend', async () => {
        process.env = { ...OLD_ENV, REACT_APP_MICRO: 'true' };
        const { container } = render(<Banner />, { wrapper: contextProviders({ brukerInfo: ikkeSykmeldtState }) });
        expect((container.firstChild as HTMLElement)?.classList.contains('banner')).toBeFalsy();
    });
});
