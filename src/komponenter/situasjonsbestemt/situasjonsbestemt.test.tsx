import { render, screen } from '@testing-library/react';

import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import Situasjonsbestemt from './situasjonsbestemt';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';

describe('tester at komponenten situasjonsbestemt fungerer som forventet', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('Viser ikke sykmeldt når bruker IKKE er sykmeldt med arbeidsgiver', async () => {
        const props: ProviderProps = {
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: false,
            },
            underOppfolging: { underOppfolging: true },
        };
        const { container } = render(<Situasjonsbestemt />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
        expect(await screen.queryByText('Ditt sykefravær')).not.toBeInTheDocument();
    });

    test('Viser sykmeldt når bruker ER sykmeldt med arbeidsgiver', async () => {
        const providerProps: ProviderProps = {
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: true,
            },
            underOppfolging: { underOppfolging: true },
        };
        const { container } = render(<Situasjonsbestemt />, { wrapper: contextProviders(providerProps) });
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.getByText('Ditt sykefravær')).toBeInTheDocument();
    });
});
