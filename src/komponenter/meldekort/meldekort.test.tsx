import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import {contextProviders, ProviderProps} from '../../test/test-context-providers';
import tekster from '../../tekster/tekster';
import Meldekort from './meldekort';

describe('tester at komponenten rendrer som forventet', () => {
    test('Komponenten rendres når bruker er under oppfølging', () => {
        const props: ProviderProps = {
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: false,
            },
            underOppfolging: { erBrukerUnderOppfolging: true },
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
            underOppfolging: { erBrukerUnderOppfolging: false },
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
            underOppfolging: { erBrukerUnderOppfolging: true },
        };
        const { container } = render(<Meldekort />, { wrapper: contextProviders(providerProps) });
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.getByText(tekster['meldekort-overskrift'])).toBeInTheDocument();
        expect(screen.getByText(tekster['meldekort-ingress'])).toBeInTheDocument();
        expect(await screen.queryByText(/denne teksten finnes ikke/i)).toBeFalsy();
    });
});
