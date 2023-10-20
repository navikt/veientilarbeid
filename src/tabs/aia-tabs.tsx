import { Tabs } from '@navikt/ds-react';
import { HTMLProps, useEffect, useState } from 'react';

import { useAmplitudeData } from '../komponenter/hent-initial-data/amplitude-provider';
import useHarGyldigBehovsvurdering from '../hooks/use-har-gyldig-behovsvurdering';
import { useBeregnDagpengestatus } from '../hooks/use-beregn-dagpengestatus';
import { Data, useMeldekortData } from '../hooks/use-meldekortdata';
import { useProfil } from '../contexts/profil';

import RegistrertTittel from '../komponenter/registrert-tittel/registrert-tittel';
import MinSituasjon from '../komponenter/min-situasjon/min-situasjon';
import Behovsavklaring from '../komponenter/behovsavklaring-oppfolging/behovsavklaring-oppfolging';
import DagpengerOgYtelser from '../komponenter/dagpenger/dagpenger-og-ytelser';
import Meldekort from '../komponenter/meldekort/meldekort';
import { loggAktivitet } from '../metrics/metrics';
import { hentQueryParam, settQueryParam } from '../utils/query-param-utils';
import { DagpengeStatus } from '../lib/beregn-dagpenge-status';
import { datoUtenTid } from '../utils/date-utils';
import { hentIDag } from '../utils/chrono';
import { Profil } from '../profil';
import {
    beregnDagerEtterFastsattMeldedag,
    beregnDagerTilInaktivering,
    hentMeldekortForLevering,
} from '../utils/meldekort-utils';

import tabStyles from './tabs.module.css';
import styles from '../innhold/innhold.module.css';
import {
    harSendtInnNyDokumentasjon,
    harSitasjonSomKreverDokumentasjon,
} from '../komponenter/endre-situasjon/send-inn-dokumentasjon';
import { useBesvarelse } from '../contexts/besvarelse';

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

function harIkkeSoktDagpenger(dagpengeStatus: DagpengeStatus, profil: Profil | null) {
    const valgtVisning = profil?.aiaValgtPengestotteVisning;

    return (
        valgtVisning !== 'ytelser' &&
        !['paabegynt', 'sokt', 'mottar', 'avslag', 'innvilget', 'soktogpaabegynt', 'stanset'].includes(dagpengeStatus)
    );
}

function skalViseMeldekortVarsel(meldekortData?: Data) {
    if (!meldekortData) {
        return false;
    }

    const dato = datoUtenTid(hentIDag().toISOString());
    const meldekortForLevering = hentMeldekortForLevering(dato, meldekortData);
    const erInnenforTidsfrist =
        beregnDagerTilInaktivering(beregnDagerEtterFastsattMeldedag(dato, meldekortData) ?? 0) >= 0;

    return meldekortForLevering.length === 1 && erInnenforTidsfrist;
}

function useSkalViseHjelpOgStotteVarsel() {
    const { besvarelse: besvarelseData } = useBesvarelse();
    const { profil } = useProfil();
    const aktuellSitausjon = besvarelseData?.besvarelse?.dinSituasjon?.verdi;

    if (!aktuellSitausjon) {
        return false;
    }

    return harSitasjonSomKreverDokumentasjon(aktuellSitausjon) && !harSendtInnNyDokumentasjon(profil, besvarelseData);
}
const AiaTabs = () => {
    const [aktivTab, settAktivTab] = useState<TabValue>(TabValue.MIN_SITUASJON);
    const harGyldigBehovsvurdering = useHarGyldigBehovsvurdering();
    const visPengestotteVarsel = harIkkeSoktDagpenger(useBeregnDagpengestatus(), useProfil().profil);
    const visMeldekortVarsel = skalViseMeldekortVarsel(useMeldekortData().meldekortData);
    const visHjelpOgStotteVarsel = useSkalViseHjelpOgStotteVarsel();

    const { amplitudeData } = useAmplitudeData();

    const loggTabSkifte = (tab: string) => {
        loggAktivitet({ aktivitet: `Bytter til ${tab}`, komponent: 'tabs', ...amplitudeData });
    };

    const onChangeTab = (tab: string) => {
        settQueryParam(QUERY_PARAM, tab);
        settAktivTab(tab as TabValue);
        loggTabSkifte(tabValueMap[tab as TabValue]);
    };

    useEffect(() => {
        const tabFraQuery = hentQueryParam(QUERY_PARAM);

        if (
            [TabValue.HJELP_OG_STOTTE, TabValue.MIN_SITUASJON, TabValue.MELDEKORT, TabValue.PENGESTOTTE].includes(
                tabFraQuery as any,
            )
        ) {
            settAktivTab(tabFraQuery as TabValue);
        }
    }, []);

    return (
        <div className={styles.limitStandard}>
            <RegistrertTittel />
            <div className={styles.card}>
                <Tabs value={aktivTab} onChange={onChangeTab} className={`${tabStyles.mb2} ${tabStyles.mt1}`}>
                    <Tabs.List>
                        <Tabs.Tab
                            value="situasjon"
                            label={
                                <>
                                    Min situasjon{' '}
                                    {visHjelpOgStotteVarsel && (
                                        <VarslingSirkel
                                            title={'Du har ikke sendt inn dokumentasjon'}
                                            aria-label={'Du har ikke sendt inn dokumentasjon'}
                                        />
                                    )}
                                </>
                            }
                            className={tabStyles.nowrap}
                        />
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
                        <Tabs.Tab
                            value="ytelse"
                            label={
                                <>
                                    Pengestøtte{' '}
                                    {visPengestotteVarsel && (
                                        <VarslingSirkel
                                            title={'Du har ikke sendt inn søknad om dagpenger'}
                                            aria-label={'Du har ikke sendt inn søknad om dagpenger'}
                                        />
                                    )}
                                </>
                            }
                        />
                        <Tabs.Tab
                            value="meldekort"
                            label={
                                <>
                                    Meldeplikt{' '}
                                    {visMeldekortVarsel && (
                                        <VarslingSirkel
                                            title={'Du kan sende inn meldekort'}
                                            aria-label={'Du kan sende inn meldekort'}
                                        />
                                    )}
                                </>
                            }
                        />
                    </Tabs.List>
                    <MinSituasjonTab />
                    <HjelpOgStotteTab />
                    <YtelseTab />
                    <MeldekortTab />
                </Tabs>
            </div>
        </div>
    );
};

export default AiaTabs;
