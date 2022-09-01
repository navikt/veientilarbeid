import { FunctionComponent } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Egenvurdering from './egenvurdering';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { Servicegruppe } from '../../contexts/oppfolging';
import { ForeslattInnsatsgruppe } from '../../contexts/brukerregistrering';
import { InnloggingsNiva } from '../../contexts/autentisering';

describe('Tester egenvurdering-komponenten', () => {
    const oldLocation = global.window.location;

    afterEach(() => {
        delete (global as any).window.location;
        global.window.location = Object.assign({}, oldLocation);
    });

    let standardInnsatsBrukerregistrering = {
        registrering: {
            opprettetDato: '2020-01-01',
            profilering: { innsatsgruppe: ForeslattInnsatsgruppe.STANDARD_INNSATS },
        },
    };

    it('vises ikke når brukerregistrering ikke finnes', async () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: false },
            oppfolging: { servicegruppe: Servicegruppe.IVURD },
            brukerregistrering: null,
        };
        const { container } = render(<Egenvurdering />, { wrapper: contextProviders(props) as FunctionComponent });
        expect(container).toBeEmptyDOMElement();
    });

    it('renderes når den skal', async () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: true },
            oppfolging: { servicegruppe: Servicegruppe.IVURD },
            brukerregistrering: standardInnsatsBrukerregistrering,
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
        };
        render(<Egenvurdering />, { wrapper: contextProviders(props) as FunctionComponent });
        expect(screen.getByText('Hva trenger du for å komme i jobb?')).toBeTruthy();
    });

    test('Komponenten rendres IKKE når bruker IKKE er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: false },
            oppfolging: { servicegruppe: Servicegruppe.IVURD },
            brukerregistrering: standardInnsatsBrukerregistrering,
        };
        const { container } = render(<Egenvurdering />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    it('rendres ikke med gyldig levert egenvurdering', async () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: true },
            oppfolging: { servicegruppe: Servicegruppe.IVURD },
            brukerregistrering: standardInnsatsBrukerregistrering,
            egenvurdering: { sistOppdatert: '2020-02-01' },
        };
        render(<Egenvurdering />, { wrapper: contextProviders(props) as FunctionComponent });
        expect(await screen.queryByText('Hva trenger du for å komme i jobb?')).toBeFalsy();
    });

    it('renderes ikke som standard-oppførsel', async () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: true },
        };

        render(<Egenvurdering />, { wrapper: contextProviders(props) as FunctionComponent });
        expect(await screen.queryByText('Hva trenger du for å komme i jobb?')).toBeFalsy();
    });

    it('knapp fungerer som forventet', async () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: true },
            oppfolging: { servicegruppe: Servicegruppe.IVURD },
            brukerregistrering: standardInnsatsBrukerregistrering,
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
        };
        render(<Egenvurdering />, { wrapper: contextProviders(props) as FunctionComponent });
        const mockHandleClick = vi.fn();
        const mockLocationAssign = vi.fn();

        delete (global as any).window.location;
        global.window.location = { assign: mockLocationAssign } as unknown as Location;

        const knapp = screen.getByText('SVAR HER');
        knapp.onclick = mockHandleClick;
        userEvent.click(knapp);
        expect(mockHandleClick).toHaveBeenCalledTimes(1);
        expect(mockLocationAssign).toHaveBeenCalledTimes(1);
    });
});
