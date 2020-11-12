import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { contextProviders } from '../../test/test-context-providers';
import tekster from '../../tekster/tekster';
import DittSykefravaer from './ditt-sykefravaer';

describe('Tester at komponenten rendres som den skal', () => {
    test('Komponenten vises IKKE dersom ikke sykefravær', () => {
        const providerProps = {};
        const { container } = render(<DittSykefravaer />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten VISES dersom ikke erSykmeldtMedArbeidsgiver', async () => {
        const providerProps = {
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: true,
            },
        };
        render(<DittSykefravaer />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(tekster['ditt-sykefravaer-overskrift'])).toBeInTheDocument();
        expect(screen.getByText(tekster['ditt-sykefravaer-ingress'])).toBeInTheDocument();
        expect(await screen.queryByText(/denne teksten finnes ikke/i)).toBeFalsy();
    });
});
