import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import YtelserOnboarding from './ytelser-onboarding';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { Formidlingsgruppe, Servicegruppe } from '../../contexts/oppfolging';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';

const providerProps: ProviderProps = {
    brukerInfo: {
        rettighetsgruppe: 'DAGP',
        geografiskTilknytning: '110302',
        alder: 42,
    },
    amplitude: {
        ukerRegistrert: 2,
        gruppe: 'kss',
        eksperimenter: [],
    },
    oppfolging: {
        formidlingsgruppe: Formidlingsgruppe.ARBS,
        servicegruppe: Servicegruppe.IKVAL,
    },
    brukerregistrering: {
        registrering: {
            opprettetDato: '2020-06-01',
        },
    },
};

describe('tester komponenten for Ytelser', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('komponenten VISES for standardInnsats uten ekperiment', () => {
        const { container } = render(<YtelserOnboarding />, { wrapper: contextProviders(providerProps) });
        expect(container).not.toBeEmptyDOMElement();
    });

    test('komponenten vises IKKE for Situasjonsbestemt innsats', () => {
        const { container } = render(<YtelserOnboarding />, {
            wrapper: contextProviders({
                ...providerProps,
                oppfolging: { ...providerProps.oppfolging, servicegruppe: Servicegruppe.BKART },
            }),
        });
        expect(container).toBeEmptyDOMElement();
    });
});
