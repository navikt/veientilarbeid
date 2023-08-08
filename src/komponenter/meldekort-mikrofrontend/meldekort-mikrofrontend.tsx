import useSWRImmutable from 'swr/immutable';
import { Heading } from '@navikt/ds-react';
import { MeldekortDataFraApi } from './types/MeldekortType';
import { meldekortApiUrl } from './api/urls';
import { isMeldekortbruker, meldekortState } from './domain/meldekortState';
import { fetcher } from './api/api';
import MeldekortEtterregistrering from './domain/meldekort-etterregistrering/MeldekortEtterregistrering';
import MeldekortPending from './domain/meldekort-pending/MeldekortPending';
import MeldekortReady from './domain/meldekort-ready/MeldekortReady';
import styles from './meldekort.module.css';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

const TEKSTER: Tekster<string> = {
    nb: {
        'meldekort.tittel': 'Meldekort',
    },
    nn: {
        'meldekort.tittel': 'Meldekort',
    },
    en: {
        'meldekort.tittel': 'Employment status form',
    },
};
function MeldekortMikrofrontend() {
    const { data: meldekortFraApi, error } = useSWRImmutable<MeldekortDataFraApi>(meldekortApiUrl, fetcher);
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    if (!meldekortFraApi) {
        return null;
    }

    if (error) {
        throw Error('Klarte ikke å hente meldekortdata');
    }

    if (!isMeldekortbruker(meldekortFraApi)) {
        return null;
    }

    const { isPendingForInnsending, isReadyForInnsending, meldekortData } = meldekortState(meldekortFraApi);

    return (
        <section className={styles.meldekort}>
            <Heading size="medium" level="2" spacing>
                {tekst('meldekort.tittel')}
            </Heading>
            <div className={styles.container}>
                <MeldekortEtterregistrering meldekort={meldekortData} />
                {isPendingForInnsending ? <MeldekortPending meldekort={meldekortData} /> : null}
                {isReadyForInnsending ? <MeldekortReady meldekort={meldekortData} /> : null}
            </div>
        </section>
    );
}

export default MeldekortMikrofrontend;
