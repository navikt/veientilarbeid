import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { InnloggingsNiva } from '../../context/autentisering';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import OkonomiRad from './okonomi-rad';

describe('Tester at komponenten rendres som forventet', () => {
    test('Komponenten rendres IKKE som default', () => {
        const props: ProviderProps = {};
        const { container } = render(<OkonomiRad />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres IKKE om man IKKE er sykmeldt med arbeidsgiver', () => {
        const props: ProviderProps = {
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: false,
            },
            underOppfolging: {
                underOppfolging: true,
            },
        };
        render(<OkonomiRad />, { wrapper: contextProviders(props) });
        expect(screen.getByText(/trekk dagpengesøknaden/i)).toBeInTheDocument();
    });

    test('Komponenten VISES om man er under oppfølging OG sykmeldt med arbeidsgiver', () => {
        const props: ProviderProps = {
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: true,
            },
            underOppfolging: {
                underOppfolging: true,
            },
        };
        const { container } = render(<OkonomiRad />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
    });

    test('Komponenten vises IKKE om man om den er togglet av', () => {
        const props: ProviderProps = {
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: true,
            },
            underOppfolging: {
                underOppfolging: true,
            },
            featureToggle: {
                'veientilarbeid.rydding.skjulOkonomiBoks': true,
            },
        };
        const { container } = render(<OkonomiRad />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });
});
