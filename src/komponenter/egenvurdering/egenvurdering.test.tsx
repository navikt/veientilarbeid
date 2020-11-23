import * as React from 'react';
import {ComponentType} from 'react';
import {render, screen} from '@testing-library/react';
import Egenvurdering from './egenvurdering';
import tekster from '../../tekster/tekster';
import {contextProviders, ProviderProps} from '../../test/test-context-providers';
import {Servicegruppe} from '../../ducks/oppfolging';
import {ForeslattInnsatsgruppe} from '../../ducks/brukerregistrering';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

describe('Tester egenvurdering-komponenten', () => {
    let standardInnsatsBrukerregistrering = {
        registrering: {
            opprettetDato: '2020-01-01',
            profilering: { innsatsgruppe: ForeslattInnsatsgruppe.STANDARD_INNSATS },
        },
    };
    it('renderes når den skal', async () => {
        const props: ProviderProps = {
            underOppfolging: { erBrukerUnderOppfolging: true },
            oppfolging: { servicegruppe: Servicegruppe.IVURD },
            brukerregistrering: standardInnsatsBrukerregistrering,
        };
        render(<Egenvurdering />, { wrapper: contextProviders(props) as ComponentType });
        expect(screen.getByText(tekster['egenvurdering-tittel'])).toBeTruthy();
    });

    test('Komponenten rendres IKKE når bruker IKKE er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: { erBrukerUnderOppfolging: false },
            oppfolging: { servicegruppe: Servicegruppe.IVURD },
            brukerregistrering: standardInnsatsBrukerregistrering,
        };
        const { container } = render(<Egenvurdering />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    it('rendres ikke med gyldig levert egenvurdering', async () => {
        const props: ProviderProps = {
            underOppfolging: { erBrukerUnderOppfolging: true },
            oppfolging: { servicegruppe: Servicegruppe.IVURD },
            brukerregistrering: standardInnsatsBrukerregistrering,
            egenvurdering: { sistOppdatert: '2020-02-01' },
        };
        render(<Egenvurdering />, { wrapper: contextProviders(props) as ComponentType });
        expect(await screen.queryByText(tekster['egenvurdering-tittel'])).toBeFalsy();
    });

    it('renderes ikke som standard-oppførsel', async () => {
        const props: ProviderProps = {
            underOppfolging: { erBrukerUnderOppfolging: true },
        };

        render(<Egenvurdering />, { wrapper: contextProviders(props) as ComponentType });
        expect(await screen.queryByText(tekster['egenvurdering-tittel'])).toBeFalsy();
    });

    it('knapp fungerer som forventet', async () => {
        const props: ProviderProps = {
            underOppfolging: { erBrukerUnderOppfolging: true },
            oppfolging: { servicegruppe: Servicegruppe.IVURD },
            brukerregistrering: standardInnsatsBrukerregistrering,
        };
        render(<Egenvurdering />, { wrapper: contextProviders(props) as ComponentType });

        const mockLocationAssign = jest.fn();
        window.location.assign = mockLocationAssign;

        const knapp = screen.getByText(tekster['egenvurdering-lenke-tekst']);
        userEvent.click(knapp);
        expect(mockLocationAssign).toHaveBeenCalledTimes(1);
    });
});
