import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import {contextProviders, ProviderProps} from '../../test/test-context-providers';
import tekster from '../../tekster/tekster';
import DittSykefravaer from './ditt-sykefravaer';

describe('Tester at komponenten rendres som den skal', () => {
    test('Komponenten vises IKKE dersom ikke sykefravær', () => {
        const providerProps: ProviderProps = { underOppfolging: { erBrukerUnderOppfolging: true } };
        const { container } = render(<DittSykefravaer />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten VISES dersom erSykmeldtMedArbeidsgiver og underOppfolging', async () => {
        const providerProps: ProviderProps = {
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: true,
            },
            underOppfolging: { erBrukerUnderOppfolging: true },
        };
        render(<DittSykefravaer />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(tekster['ditt-sykefravaer-overskrift'])).toBeInTheDocument();
        expect(screen.getByText(tekster['ditt-sykefravaer-ingress'])).toBeInTheDocument();
        expect(await screen.queryByText(/denne teksten finnes ikke/i)).toBeFalsy();
    });

    test('Komponenten rendres IKKE når bruker IKKE er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: { erBrukerUnderOppfolging: false },
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: true,
            },
        };
        const { container } = render(<DittSykefravaer />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });
});
