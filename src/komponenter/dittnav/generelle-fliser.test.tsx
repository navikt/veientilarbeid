import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import GenerelleFliser from './generelle-fliser';
import tekster from './utils/tekster.json';
import {contextProviders, ProviderProps} from '../../test/test-context-providers';

describe('Tester komponenten', () => {
    test('Komponenten VISES ikke om man er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: true },
        };
        const { container } = render(<GenerelleFliser />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten VISES om man ikke er under oppfølging og aldri har vært det', () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: false },
            brukerregistrering: null,
        };
        const { container } = render(<GenerelleFliser />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
    });

    test('Komponenten VISES om man ikke er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: false },
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
