import { BodyShort, Heading, Panel, Tabs } from '@navikt/ds-react';

import { useArbeidssokerPerioder } from '../contexts/arbeidssoker';
import { useFeatureToggleData } from '../contexts/feature-toggles';
import { useBrukerinfoData } from '../contexts/bruker-info';
import { useBesvarelse } from '../contexts/besvarelse';
import { useOppfolgingData } from '../contexts/oppfolging';
import { useBrukerregistreringData } from '../contexts/brukerregistrering';

import RegistrertTittel from '../komponenter/registrert-tittel/registrert-tittel';
import MinSituasjon from '../komponenter/min-situasjon/min-situasjon';
import EndreSituasjon from '../komponenter/endre-situasjon/min-situasjon';
import Behovsavklaring from '../komponenter/behovsavklaring-oppfolging/behovsavklaring-oppfolging';
import DagpengerOgYtelser from '../komponenter/dagpenger/dagpenger-og-ytelser';
import Meldekort from '../komponenter/meldekort/meldekort';
import { visBesvarelser } from '../lib/vis-besvarelse';
import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';

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

const EndreSituasjonTab = () => {
    return (
        <Tabs.Panel value="situasjon" className="h-24 w-full bg-gray-50 p-4">
            <div className={`${tabStyles.mln2_4} ${tabStyles.mt1}`}>
                <EndreSituasjon />
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

const TabsDemo = () => {
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const featuretoggleData = useFeatureToggleData();
    const brukerInfoData = useBrukerinfoData();
    const { besvarelse } = useBesvarelse();
    const oppfolgingData = useOppfolgingData();
    const registreringData = useBrukerregistreringData();

    const beregnedeArbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);

    const visEndreSituasjon = visBesvarelser({
        brukerInfoData,
        oppfolgingData,
        registreringData,
        featuretoggleData,
        besvarelseData: besvarelse,
        arbeidssokerPeriodeData: beregnedeArbeidssokerperioder,
    });

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
                {visEndreSituasjon ? <EndreSituasjonTab /> : <MinSituasjonTab />}
                <HjelpOgStotteTab />
                <YtelseTab />
                <MeldekortTab />
            </Tabs>
        </div>
    );
};

export default TabsDemo;
