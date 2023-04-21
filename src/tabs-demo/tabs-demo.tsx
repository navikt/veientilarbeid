import { BodyShort, Heading, Panel, Tabs } from '@navikt/ds-react';

import RegistrertTittel from '../komponenter/registrert-tittel/registrert-tittel';
import MinSituasjon from '../komponenter/min-situasjon/min-situasjon';
import HjelpOgStotte from '../komponenter/hjelp-og-stotte/hjelp-og-stotte';

import styles from '../innhold/innhold.module.css';
import tabStyles from './tabs.module.css';

const Varselboks = () => {
    return (
        <Panel border>
            <Heading size="medium">Utkast/påbegynt søknad om dagpenger</Heading>
            <BodyShort>Fullfør og send inn søknaden du startet på 21. april</BodyShort>
        </Panel>
    );
};

const MinSituasjonTab = () => {
    return (
        <Tabs.Panel value="situasjon" className="h-24 w-full bg-gray-50 p-4">
            <div className={`${tabStyles.mln2_4} ${tabStyles.mt1}`}>
                <MinSituasjon />
            </div>
        </Tabs.Panel>
    );
};

const HjelpOgStotteTab = () => {
    return (
        <Tabs.Panel value="hjelp" className="h-24 w-full bg-gray-50 p-4">
            <HjelpOgStotte />
        </Tabs.Panel>
    );
};

const YtelseTab = () => {
    return (
        <Tabs.Panel value="ytelse" className="h-24  w-full bg-gray-50 p-4">
            Pengestøtte-tab
        </Tabs.Panel>
    );
};

const MeldekortTab = () => {
    return (
        <Tabs.Panel value="meldekort" className="h-24  w-full bg-gray-50 p-4">
            Meldekort-tab
        </Tabs.Panel>
    );
};

const TabsDemo = () => {
    return (
        <div className={styles.limit}>
            <RegistrertTittel />
            <Varselboks />
            <Tabs defaultValue="situasjon" className={tabStyles.mb2}>
                <Tabs.List>
                    <Tabs.Tab value="situasjon" label="Min situasjon" />
                    <Tabs.Tab value="hjelp" label="Hjelp og støtte" />
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

export default TabsDemo;
