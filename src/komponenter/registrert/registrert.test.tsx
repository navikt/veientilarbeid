import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { InnloggingsNiva } from '../../contexts/autentisering';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import Registrert from './registrert';
import { Formidlingsgruppe, Servicegruppe } from '../../contexts/oppfolging';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';

const meldekort = {
    meldekort: [
        {
            meldekortId: 1526772064,
            kortType: 'ELEKTRONISK',
            meldeperiode: {
                fra: '2021-01-10T12:00:00+01:00',
                til: '2021-01-24T12:00:00+01:00',
                kortKanSendesFra: '2021-01-23T12:00:00+01:00',
                kanKortSendes: true,
                periodeKode: '202103',
            },
            meldegruppe: 'DAGP',
            kortStatus: 'OPPRE',
            bruttoBelop: 0.0,
            erForskuddsPeriode: false,
            korrigerbart: true,
        },
    ],
};

const providerProps: ProviderProps = {
    autentisering: { securityLevel: InnloggingsNiva.LEVEL_4 },
    meldekort: meldekort,
    brukerInfo: {
        rettighetsgruppe: 'DAGP',
        geografiskTilknytning: '3413',
    },
    underOppfolging: { underOppfolging: true },
    oppfolging: {
        formidlingsgruppe: Formidlingsgruppe.ARBS,
        servicegruppe: Servicegruppe.IKVAL,
    },
    amplitude: { ukerRegistrert: 0 },
    iDag: new Date('2021-01-26T12:00:00+01:00'),
};

describe('Test av registreringskomponenten', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('Meldekort-intro-komponenten rendres når featuretoggle er satt og hører til eksperimentkontor', () => {
        const props: ProviderProps = providerProps;
        const { container } = render(<Registrert />, { wrapper: contextProviders({ ...props }) });
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.getByText(/Hvorfor er det viktig å sende meldekort/i)).toBeInTheDocument();
    });

    test('Komponenten vises IKKE dersom man ikke har ARBS og nivå 4', () => {
        const providerProps: ProviderProps = {
            underOppfolging: { underOppfolging: true },
            meldekort,
        };
        const { container } = render(<Registrert />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten VISES dersom man har ARBS, er underOppfolging og er logget inn på nivå 4', () => {
        const providerProps: ProviderProps = {
            underOppfolging: { underOppfolging: true },
            meldekort,
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
            oppfolging: {
                formidlingsgruppe: Formidlingsgruppe.ARBS,
            },
        };
        const { container } = render(<Registrert />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeInTheDocument();
    });

    test('Komponenten rendres IKKE når bruker IKKE er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: false },
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
            oppfolging: {
                formidlingsgruppe: Formidlingsgruppe.ARBS,
            },
        };
        const { container } = render(<Registrert />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });
});
