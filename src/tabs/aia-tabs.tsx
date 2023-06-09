import { Tabs } from '@navikt/ds-react';

import { useAmplitudeData } from '../komponenter/hent-initial-data/amplitude-provider';

import RegistrertTittel from '../komponenter/registrert-tittel/registrert-tittel';
import MinSituasjon from '../komponenter/min-situasjon/min-situasjon';
import Behovsavklaring from '../komponenter/behovsavklaring-oppfolging/behovsavklaring-oppfolging';
import DagpengerOgYtelser from '../komponenter/dagpenger/dagpenger-og-ytelser';
import Meldekort from '../komponenter/meldekort/meldekort';
import { loggAktivitet } from '../metrics/metrics';

import styles from '../innhold/innhold.module.css';
import tabStyles from './tabs.module.css';
import { useEffect, useState } from 'react';
import { hentQueryParam, settQueryParam } from '../utils/query-param-utils';

const MinSituasjonTab = () => {
    return (
        <Tabs.Panel value="situasjon" className="h-24 w-full bg-gray-50 p-4">
            <MinSituasjon />
        </Tabs.Panel>
    );
};

const HjelpOgStotteTab = () => {
    return (
        <Tabs.Panel value="hjelp" className="h-24 w-full bg-gray-50 p-4">
            <Behovsavklaring />
        </Tabs.Panel>
    );
};

const YtelseTab = () => {
    return (
        <Tabs.Panel value="ytelse" className="h-24  w-full bg-gray-50 p-4">
            <DagpengerOgYtelser />
        </Tabs.Panel>
    );
};

const MeldekortTab = () => {
    return (
        <Tabs.Panel value="meldekort" className="h-24  w-full bg-gray-50 p-4">
            <Meldekort />
        </Tabs.Panel>
    );
};
const QUERY_PARAM = 'aia.aktivTab';
enum TabValue {
    MIN_SITUASJON = 'situasjon',
    HJELP_OG_STOTTE = 'hjelp',
    PENGESTOTTE = 'ytelse',
    MELDEKORT = 'meldekort',
}
const AiaTabs = () => {
    const { amplitudeData } = useAmplitudeData();

    const loggTabSkifte = (tab: string) => {
        loggAktivitet({ aktivitet: `Bytter til ${tab}`, komponent: 'tabs', ...amplitudeData });
    };

    const [aktivTab, settAktivTab] = useState<TabValue>(TabValue.MIN_SITUASJON);
    const onChangeTab = (tab: string) => {
        settQueryParam(QUERY_PARAM, tab);
        settAktivTab(tab as TabValue);
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
                    <Tabs.Tab value="situasjon" label="Min situasjon" onClick={() => loggTabSkifte('Min situasjon')} />
                    <Tabs.Tab value="hjelp" label="Hjelp og støtte" onClick={() => loggTabSkifte('Hjelp og støtte')} />
                    <Tabs.Tab value="ytelse" label="Pengestøtte" onClick={() => loggTabSkifte('Pengestøtte')} />
                    <Tabs.Tab value="meldekort" label="Meldekort" onClick={() => loggTabSkifte('Meldekort')} />
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
