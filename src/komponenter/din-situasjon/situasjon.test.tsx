import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Situasjon from './situasjon';
import { ComponentType, ReactChildren, ReactElement } from 'react';
import merge from 'merge-deep';
import { DeepPartial } from 'redux';

import {
    Data as BrukerRegistreringData,
    initialState as brukerRegistreringInitialState,
    BrukerregistreringContext,
} from '../../ducks/brukerregistrering';
import { Data as SituasjonData, initialState as situasjonInitialState, SituasjonContext } from '../../ducks/situasjon';
import {
    Data as FeatureToggleData,
    initialState as featureToggleInitialState,
    FeaturetoggleContext,
} from '../../ducks/feature-toggles';

type ProviderProps = {
    brukerregistrering?: DeepPartial<BrukerRegistreringData>;
    situasjon?: DeepPartial<SituasjonData>;
    featureToggle?: DeepPartial<FeatureToggleData>;
};

const situasjonProviders = function (
    props: ProviderProps
): ({ children }: { children: ReactChildren }) => ReactElement {
    return ({ children }) => (
        <BrukerregistreringContext.Provider
            value={merge(
                brukerRegistreringInitialState,
                props.brukerregistrering && { data: props.brukerregistrering }
            )}
        >
            <SituasjonContext.Provider
                value={merge(situasjonInitialState, props.situasjon && { data: props.situasjon })}
            >
                <FeaturetoggleContext.Provider
                    value={merge(featureToggleInitialState, props.featureToggle && { data: props.featureToggle })}
                >
                    {children}
                </FeaturetoggleContext.Provider>
            </SituasjonContext.Provider>
        </BrukerregistreringContext.Provider>
    );
};

describe('Tester situasjon-komponenten', () => {
    const vanligTekstIKomponent = 'Her kan du oppdatere situasjonen din';
    const permittertBrukerRegistrering = {
        registrering: { besvarelse: { dinSituasjon: 'ER_PERMITTERT' } },
    };
    const pakrevdeFeatureToggles = {
        'veientilarbeid.permittert.situasjon.endre': true,
        'veientilarbeid.permittert.ny-dialog': true,
    };

    it('rendres når bruker er permittert og feature toggles aktivert', async () => {
        const providerProps: ProviderProps = {
            brukerregistrering: permittertBrukerRegistrering,
            featureToggle: pakrevdeFeatureToggles,
        };
        render(<Situasjon />, { wrapper: situasjonProviders(providerProps) as ComponentType });
        expect(screen.getByText(vanligTekstIKomponent)).toBeTruthy();
    });

    it('rendres IKKE når default-state er brukt', async () => {
        const providerProps: ProviderProps = {};
        render(<Situasjon />, { wrapper: situasjonProviders(providerProps) as ComponentType });
        expect(await screen.queryByText(vanligTekstIKomponent)).toBeFalsy();
    });

    it('rendres IKKE uten feature toggles aktivert', async () => {
        const providerProps: ProviderProps = {
            brukerregistrering: permittertBrukerRegistrering,
        };
        render(<Situasjon />, { wrapper: situasjonProviders(providerProps) as ComponentType });
        expect(await screen.queryByText(vanligTekstIKomponent)).toBeFalsy();
    });

    it('rendres IKKE når default-state er brukt, men med feature toggles', async () => {
        const providerProps: ProviderProps = {
            featureToggle: pakrevdeFeatureToggles,
        };
        render(<Situasjon />, { wrapper: situasjonProviders(providerProps) as ComponentType });
        expect(await screen.queryByText(vanligTekstIKomponent)).toBeFalsy();
    });

    it('rendrer dato på menneskelig lesbart format', async () => {
        const providerProps: ProviderProps = {
            brukerregistrering: permittertBrukerRegistrering,
            featureToggle: pakrevdeFeatureToggles,
            situasjon: { opprettet: '2019-04-07T11:53:05.486686+01:00' },
        };
        render(<Situasjon />, { wrapper: situasjonProviders(providerProps) as ComponentType });
        expect(screen.getByText('Sist endret 7. april 2019', { exact: false })).toBeTruthy();
    });
});
