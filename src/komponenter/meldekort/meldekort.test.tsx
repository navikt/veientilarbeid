import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { Formidlingsgruppe, Servicegruppe } from '../../ducks/oppfolging';
import tekster from '../../tekster/tekster';
import Meldekort from './meldekort';

const meldekort = {
    maalformkode: 'NO',
    meldeform: 'EMELD',
    meldekort: [
        {
            meldekortId: 1526772064,
            kortType: 'ELEKTRONISK',
            meldeperiode: {
                fra: '2021-01-18T12:00:00+01:00',
                til: '2021-01-31T12:00:00+01:00',
                kortKanSendesFra: '2021-01-30T12:00:00+01:00',
                kanKortSendes: true,
                periodeKode: '202103',
            },
            meldegruppe: 'ARBS',
            kortStatus: 'OPPRE',
            bruttoBelop: 0.0,
            erForskuddsPeriode: false,
            korrigerbart: true,
        },
    ],
    etterregistrerteMeldekort: [],
    id: '1',
    antallGjenstaaendeFeriedager: 0,
};

describe('tester at komponenten rendrer som forventet', () => {
    test('Komponenten rendres når bruker er under oppfølging', () => {
        const props: ProviderProps = {
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: false,
            },
            underOppfolging: { underOppfolging: true },
        };
        const { container } = render(<Meldekort />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.getByText(tekster['meldekort-overskrift'])).toBeInTheDocument();
        expect(screen.getByText(tekster['meldekort-ingress'])).toBeInTheDocument();
    });

    test('Komponenten rendres IKKE når bruker IKKE er under oppfølging', () => {
        const props: ProviderProps = {
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: false,
            },
            underOppfolging: { underOppfolging: false },
        };
        const { container } = render(<Meldekort />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten vises IKKE om man er sykmeldt med arbeidsgiver', () => {
        const providerProps: ProviderProps = {
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: true,
            },
        };
        const { container } = render(<Meldekort />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten VISES om man IKKE er sykmeldt med arbeidsgiver', async () => {
        const providerProps: ProviderProps = {
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: false,
            },
            underOppfolging: { underOppfolging: true },
        };
        const { container } = render(<Meldekort />, { wrapper: contextProviders(providerProps) });
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.getByText(tekster['meldekort-overskrift'])).toBeInTheDocument();
        expect(screen.getByText(tekster['meldekort-ingress'])).toBeInTheDocument();
        expect(await screen.queryByText(/denne teksten finnes ikke/i)).toBeFalsy();
    });

    test('Komponenten rendres IKKE når bruker ser meldekortintro', () => {
        const props: ProviderProps = {
            meldekort: meldekort,
            brukerInfo: {
                rettighetsgruppe: 'DAGP',
            },
            amplitude: {
                ukerRegistrert: 2,
            },
            oppfolging: {
                formidlingsgruppe: Formidlingsgruppe.ARBS,
                servicegruppe: Servicegruppe.IKVAL,
            },
            underOppfolging: { underOppfolging: true },
        };
        const { container } = render(<Meldekort />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });
});
