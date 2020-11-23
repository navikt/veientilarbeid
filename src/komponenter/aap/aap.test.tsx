import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Aap from './aap';
import tekster from '../../tekster/tekster';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';

describe('Aap', () => {
    beforeAll(() => {
        window.HTMLElement.prototype.scrollIntoView = () => {};
    });

    it('rendres når bruker er sykemeldt med arbeidsgiver og under oppfølging', async () => {
        const props: ProviderProps = {
            brukerInfo: { erSykmeldtMedArbeidsgiver: true },
            underOppfolging: { erBrukerUnderOppfolging: true },
        };

        render(<Aap />, { wrapper: contextProviders(props) });
        expect(await screen.getByText(tekster['aap-rad-tittel'])).toBeTruthy();
    });

    it('rendres IKKE når bruker IKKE er sykmeldt og under oppfolging', async () => {
        const props: ProviderProps = {
            brukerInfo: { erSykmeldtMedArbeidsgiver: false },
            underOppfolging: { erBrukerUnderOppfolging: true },
        };

        const { container } = render(<Aap />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    it('rendres IKKE når bruker er sykmeldt og IKKE under oppfolging', async () => {
        const props: ProviderProps = {
            brukerInfo: { erSykmeldtMedArbeidsgiver: true },
            underOppfolging: { erBrukerUnderOppfolging: false },
        };

        const { container } = render(<Aap />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });
});
