import { Tabs } from '@navikt/ds-react';
import { HTMLProps, useEffect, useState } from 'react';

import { useAmplitudeData } from '../komponenter/hent-initial-data/amplitude-provider';

import RegistrertTittel from '../komponenter/registrert-tittel/registrert-tittel';
import MinSituasjon from '../komponenter/min-situasjon/min-situasjon';
import Behovsavklaring from '../komponenter/behovsavklaring-oppfolging/behovsavklaring-oppfolging';
import DagpengerOgYtelser from '../komponenter/dagpenger/dagpenger-og-ytelser';
import Meldekort from '../komponenter/meldekort/meldekort';
import { loggAktivitet } from '../metrics/metrics';
import { hentQueryParam, settQueryParam } from '../utils/query-param-utils';

import tabStyles from './tabs.module.css';
import styles from '../innhold/innhold.module.css';
import useHarGyldigBehovsvurdering from '../hooks/use-har-gyldig-behovsvurdering';

const QUERY_PARAM = 'aia.aktivTab';

enum TabValue {
    MIN_SITUASJON = 'situasjon',
    HJELP_OG_STOTTE = 'hjelp',
    PENGESTOTTE = 'ytelse',
    MELDEKORT = 'meldekort',
}

const tabValueMap = {
    situasjon: 'Min situasjon',
    hjelp: 'Hjelp og støtte',
    ytelse: 'Pengestøtte',
    meldekort: 'Meldekort',
};

const MinSituasjonTab = () => {
    return (
        <Tabs.Panel value="situasjon">
            <MinSituasjon />
        </Tabs.Panel>
    );
};

const HjelpOgStotteTab = () => {
    return (
        <Tabs.Panel value="hjelp">
            <Behovsavklaring />
        </Tabs.Panel>
    );
};

const YtelseTab = () => {
    return (
        <Tabs.Panel value="ytelse">
            <DagpengerOgYtelser />
        </Tabs.Panel>
    );
};

const MeldekortTab = () => {
    return (
        <Tabs.Panel value="meldekort">
            <Meldekort />
        </Tabs.Panel>
    );
};

const VarslingSirkel = (props: HTMLProps<any>) => {
    return (
        <span
            {...props}
            style={{
                position: 'relative',
                borderRadius: '50%',
                background: 'var(--a-surface-danger)',
                height: '8px',
                width: '8px',
                top: '-10px',
                left: '-3px',
            }}
        ></span>
    );
};

const AiaTabs = () => {
    const { amplitudeData } = useAmplitudeData();

    const loggTabSkifte = (tab: string) => {
        loggAktivitet({ aktivitet: `Bytter til ${tab}`, komponent: 'tabs', ...amplitudeData });
    };

    const [aktivTab, settAktivTab] = useState<TabValue>(TabValue.MIN_SITUASJON);
    const harGyldigBehovsvurdering = useHarGyldigBehovsvurdering();

    const onChangeTab = (tab: string) => {
        settQueryParam(QUERY_PARAM, tab);
        settAktivTab(tab as TabValue);
        loggTabSkifte(tabValueMap[tab]);
    };

    useEffect(() => {
        const tabFraQuery = hentQueryParam(QUERY_PARAM);

        if (
            [TabValue.HJELP_OG_STOTTE, TabValue.MIN_SITUASJON, TabValue.MELDEKORT, TabValue.PENGESTOTTE].includes(
                tabFraQuery as any
            )
        ) {
            settAktivTab(tabFraQuery as TabValue);
        }
    }, []);

    return (
        <div className={styles.limit}>
            <RegistrertTittel />
            <Tabs value={aktivTab} onChange={onChangeTab} className={`${tabStyles.mb2} ${tabStyles.mt1}`}>
                <Tabs.List>
                    <Tabs.Tab value="situasjon" label="Min situasjon" className={tabStyles.nowrap} />
                    <Tabs.Tab
                        value="hjelp"
                        label={
                            <>
                                Hjelp og støtte{' '}
                                {!harGyldigBehovsvurdering && (
                                    <VarslingSirkel
                                        title={'Du har ikke vurdert ditt behov for veiledning'}
                                        aria-label={'Du har ikke vurdert ditt behov for veiledning'}
                                    />
                                )}
                            </>
                        }
                        className={tabStyles.nowrap}
                    />
                    <Tabs.Tab value="ytelse" label="Pengestøtte" />
                    <Tabs.Tab value="meldekort" label="Meldekort" />
                </Tabs.List>
                <MinSituasjonTab />
                <HjelpOgStotteTab />
                <YtelseTab />
                <MeldekortTab />
            </Tabs>
        </div>
    );
};

export default AiaTabs;
