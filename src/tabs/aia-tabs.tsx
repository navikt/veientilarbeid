import { Tabs } from '@navikt/ds-react';

import RegistrertTittel from '../komponenter/registrert-tittel/registrert-tittel';
import MinSituasjon from '../komponenter/min-situasjon/min-situasjon';
import Behovsavklaring from '../komponenter/behovsavklaring-oppfolging/behovsavklaring-oppfolging';
import DagpengerOgYtelser from '../komponenter/dagpenger/dagpenger-og-ytelser';
import Meldekort from '../komponenter/meldekort/meldekort';

import styles from '../innhold/innhold.module.css';
import tabStyles from './tabs.module.css';

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
    return (
        <div className={styles.limit}>
            <RegistrertTittel />
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

export default AiaTabs;
