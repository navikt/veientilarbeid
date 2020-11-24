import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { FremtidigSituasjonSvar } from '../../ducks/brukerregistrering';
import Ressurslenker from './ressurslenker-jobbsok';

describe('Tester at komponenten rendres som forventet', () => {
    test('Komponeneten vises IKKE by default', () => {
        const props: ProviderProps = {};
        const { container } = render(<Ressurslenker />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponeneten vises om man er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: {
                erBrukerUnderOppfolging: true,
            },
        };
        const { container } = render(<Ressurslenker />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
    });

    test('Komponeneten vises IKKE om man er sykmeldt og skal tilbake til samme arbeidsgiver', () => {
        const props: ProviderProps = {
            brukerregistrering: {
                registrering: {
                    besvarelse: {
                        fremtidigSituasjon: FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER,
                    },
                },
            },
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: true,
            },
            underOppfolging: {
                erBrukerUnderOppfolging: true,
            },
        };
        const { container } = render(<Ressurslenker />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponeneten vises IKKE om man er sykmeldt og skal tilbake til samme arbeidsgiver i ny stilling', () => {
        const props: ProviderProps = {
            brukerregistrering: {
                registrering: {
                    besvarelse: {
                        fremtidigSituasjon: FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING,
                    },
                },
            },
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: true,
            },
            underOppfolging: {
                erBrukerUnderOppfolging: true,
            },
        };
        const { container } = render(<Ressurslenker />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });
});
