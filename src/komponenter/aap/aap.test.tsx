import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Aap from './aap';
import tekster from '../../tekster/tekster';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { InnloggingsNiva } from '../../context/autentisering';

describe('Aap', () => {
    it('rendres når bruker er sykemeldt med arbeidsgiver og under oppfølging og Nivå 4', async () => {
        const props: ProviderProps = {
            brukerInfo: { erSykmeldtMedArbeidsgiver: true },
            underOppfolging: { underOppfolging: true },
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
        };

        render(<Aap />, { wrapper: contextProviders(props) });
        expect(await screen.getByText(tekster['aap-rad-tittel'])).toBeTruthy();
    });

    it('rendres IKKE når featureToggle veientilarbeid.rydding.skjulAAPRad  er aktivert', async () => {
        const props: ProviderProps = {
            brukerInfo: { erSykmeldtMedArbeidsgiver: true },
            underOppfolging: { underOppfolging: true },
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
            featureToggle: {
                'veientilarbeid.rydding.skjulAAPRad': true,
            },
        };

        const { container } = render(<Aap />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    it('rendres IKKE når bruker IKKE er sykmeldt og under oppfolging nivå 4', async () => {
        const props: ProviderProps = {
            brukerInfo: { erSykmeldtMedArbeidsgiver: false },
            underOppfolging: { underOppfolging: true },
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
        };

        const { container } = render(<Aap />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    it('rendres IKKE når bruker er sykmeldt og IKKE under oppfolging og nivå 4', async () => {
        const props: ProviderProps = {
            brukerInfo: { erSykmeldtMedArbeidsgiver: true },
            underOppfolging: { underOppfolging: false },
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
        };
        const { container } = render(<Aap />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });
});
