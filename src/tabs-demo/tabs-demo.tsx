import { Tabs } from '@navikt/ds-react';

import styles from '../innhold/innhold.module.css';

const Example = () => {
    return (
        <div className={styles.limit}>
            <Tabs defaultValue="situasjon">
                <Tabs.List>
                    <Tabs.Tab value="situasjon" label="Min situasjon" />
                    <Tabs.Tab value="hjelp" label="Hjelp og støtte" />
                    <Tabs.Tab value="ytelse" label="Pengestøtte" />
                    <Tabs.Tab value="meldekort" label="Meldekort" />
                </Tabs.List>
                <Tabs.Panel value="situasjon" className="h-24 w-full bg-gray-50 p-4">
                    Min situasjon-tab
                </Tabs.Panel>
                <Tabs.Panel value="hjelp" className="h-24 w-full bg-gray-50 p-4">
                    Hjelp og støtte-tab
                </Tabs.Panel>
                <Tabs.Panel value="ytelse" className="h-24  w-full bg-gray-50 p-4">
                    Pengestøtte-tab
                </Tabs.Panel>
                <Tabs.Panel value="meldekort" className="h-24  w-full bg-gray-50 p-4">
                    Meldekort-tab
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};

export default Example;
