import * as React from 'react';
import { render, screen } from '@testing-library/react';
import tekster from '../../tekster/tekster';
import { BrukerInfoContext, State as BrukerinfoState, brukerinfoStarttilstand } from '../../ducks/bruker-info';
import { DeepPartial } from 'redux';
import merge from 'merge-deep';
import Banner from './banner';

function BannerProviders(brukerInfoState: DeepPartial<BrukerinfoState>): React.FunctionComponent {
    return ({ children }) => (
        <BrukerInfoContext.Provider value={merge(brukerinfoStarttilstand, brukerInfoState)}>
            {children}
        </BrukerInfoContext.Provider>
    );
}

describe('Banner', () => {
    const OLD_ENV = process.env;
    const sykmeldtState = { data: { erSykmeldtMedArbeidsgiver: true } };
    const ikkeSykmeldtState = { data: { erSykmeldtMedArbeidsgiver: false } };

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV, REACT_APP_MICRO: 'false' };
    });

    afterAll(() => {
        process.env = OLD_ENV;
    });

    it('rendres dersom ikke mikrofrontend', async () => {
        render(<Banner />, { wrapper: BannerProviders(sykmeldtState) });
        expect(await screen.getByText(tekster['startside-sykmeldt-banner-brodsmule'])).toBeTruthy();
    });

    it('rendres med riktig tekst dersom ikke sykmeldt', async () => {
        render(<Banner />, { wrapper: BannerProviders(ikkeSykmeldtState) });
        expect(screen.getAllByText(tekster['startside-ordinaer-banner-brodsmule']).length >= 1).toBeTruthy();
    });

    it('rendres IKKE dersom microfrontend', async () => {
        process.env = { ...OLD_ENV, REACT_APP_MICRO: 'true' };
        const { container } = render(<Banner />, { wrapper: BannerProviders(ikkeSykmeldtState) });
        expect((container.firstChild as HTMLElement)?.classList.contains('banner')).toBeFalsy();
    });
});
