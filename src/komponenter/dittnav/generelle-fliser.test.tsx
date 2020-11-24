import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import GenerelleFliser from './generelle-fliser';
import tekster from './utils/tekster.json';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';

describe('Tester komponenten', () => {
    test('Komponenten rendres IKKE som om man er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: { erBrukerUnderOppfolging: true },
        };
        const { container } = render(<GenerelleFliser />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten VISES om man er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: { erBrukerUnderOppfolging: false },
        };
        render(<GenerelleFliser />, { wrapper: contextProviders(props) });
        expect(screen.getByText(tekster['fliser.din.pensjon'])).toBeInTheDocument();
        expect(screen.getByText(tekster['fliser.din.pensjon.ingress'])).toBeInTheDocument();
        expect(screen.getByText(tekster['fliser.mistet.jobben'])).toBeInTheDocument();
        expect(screen.getByText(tekster['fliser.mistet.jobben.ingress'])).toBeInTheDocument();
        expect(screen.getByText(tekster['fliser.skjemaer'])).toBeInTheDocument();
        expect(screen.getByText(tekster['fliser.skjemaer.ingress'])).toBeInTheDocument();
        expect(screen.getByText(tekster['fliser.ditt.sykevravaer'])).toBeInTheDocument();
        expect(screen.getByText(tekster['fliser.ditt.sykevravaer.ingress'])).toBeInTheDocument();
    });
});
