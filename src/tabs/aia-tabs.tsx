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

const AiaTabs = () => {
    const { amplitudeData } = useAmplitudeData();

    const handleTabSkifte = (tab: string) => {
        loggAktivitet({ aktivitet: `Bytter til ${tab}`, komponent: 'tabs', ...amplitudeData });
    };

    return (
        <div className={styles.limit}>
            <RegistrertTittel />
            <Tabs defaultValue="situasjon" className={`${tabStyles.mb2} ${tabStyles.mt1}`}>
                <Tabs.List>
                    <Tabs.Tab
                        value="situasjon"
                        label="Min situasjon"
                        onClick={() => handleTabSkifte('Min situasjon')}
                    />
                    <Tabs.Tab
                        value="hjelp"
                        label="Hjelp og støtte"
                        onClick={() => handleTabSkifte('Hjelp og støtte')}
                    />
                    <Tabs.Tab value="ytelse" label="Pengestøtte" onClick={() => handleTabSkifte('Pengestøtte')} />
                    <Tabs.Tab value="meldekort" label="Meldekort" onClick={() => handleTabSkifte('Meldekort')} />
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
