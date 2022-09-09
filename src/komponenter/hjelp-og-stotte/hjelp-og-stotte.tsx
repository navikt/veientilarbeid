import { useState } from 'react';
import { Dialog } from '@navikt/ds-icons';
import { Detail, Heading, Panel, ReadMore } from '@navikt/ds-react';

import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useAutentiseringData } from '../../contexts/autentisering';
import { useEgenvurderingData } from '../../contexts/egenvurdering';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useUlesteDialogerData } from '../../contexts/ulestedialoger';
import { useSprakValg } from '../../contexts/sprak';

import RegistrertTeller from './registrert-teller';
import { dialogLenke } from '../../innhold/lenker';
import DialogKnapp from './dialog-knapp';
import EgenvurderingIVURD, { AVSLAATT_EGENVURDERING } from './egenvurderingIVURD';
import { kanViseIVURDEgenvurdering } from '../../lib/kan-vise-IVURD-egenvurdering';
import { hentFraBrowserStorage } from '../../utils/browserStorage-utils';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { loggAktivitet } from '../../metrics/metrics';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import Forklaring from './forklaring';
import EgenvurderingUke12, { INTRO_KEY_12UKER } from './egenvurdering-uke12';
import { kanVise12UkerEgenvurdering } from '../../lib/kan-vise-12-uker-egenvurdering';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { erKSSBruker } from '../../lib/er-kss-bruker';
import { useProfil } from '../../contexts/profil';
import { hentProfilnokkelFraLocalStorage } from '../../utils/profil-id-mapper';
import { useUnderOppfolging } from '../../contexts/arbeidssoker';

const TEKSTER = {
    nb: {
        heading: 'Om du ønsker hjelp fra oss må du gi beskjed',
        readMoreHeading: 'Hva slags hjelp kan jeg få?',
    },
    en: {
        heading: 'Get in touch if you need help',
        readMoreHeading: 'What kind of help can I get?',
    },
};

function HjelpOgStotte() {
    const [clickedLesMer, setClickedLesMer] = useState(false);
    const amplitudeData = useAmplitudeData();
    const { ukerRegistrert } = amplitudeData;

    const registreringData = useBrukerregistreringData();
    const featuretoggleData = useFeatureToggleData();
    const autentiseringData = useAutentiseringData();
    const egenvurderingData = useEgenvurderingData();
    const oppfolgingData = useOppfolgingData();
    const brukerInfoData = useBrukerinfoData();
    const { antallUleste } = useUlesteDialogerData();
    const { profil } = useProfil();

    const registrertDato = registreringData?.registrering?.opprettetDato;
    const underOppfolging = useUnderOppfolging()?.underoppfolging;

    const brukProfil = featuretoggleData['veientilarbeid.bruk-profil'];

    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    const handleClickLesMer = () => {
        if (!clickedLesMer) {
            loggAktivitet({ aktivitet: 'Åpner forklaringen for hjelp og støtte', ...amplitudeData });
            setClickedLesMer(true);
        }
    };

    const skalViseKssInnhold = erKSSBruker({
        amplitudeData,
        featuretoggleData,
        oppfolgingData,
        brukerInfoData,
        registreringData,
    });

    const sistSettEgenvurderingUke12Browserstorage = hentFraBrowserStorage(INTRO_KEY_12UKER);

    const sistSettEgenvurderingUke12Profil = brukProfil
        ? profil?.[hentProfilnokkelFraLocalStorage(INTRO_KEY_12UKER)]
        : null;

    const sistSettEgenvurderingUke12 =
        sistSettEgenvurderingUke12Profil ?? sistSettEgenvurderingUke12Browserstorage ?? 0;

    const harAvslattEgenvurderingProfil = brukProfil
        ? profil?.[hentProfilnokkelFraLocalStorage(AVSLAATT_EGENVURDERING)]
        : null;

    const harAvslattEgenvurdering = harAvslattEgenvurderingProfil ?? hentFraBrowserStorage(AVSLAATT_EGENVURDERING);

    const skalViseEgenvurderingInnsatsgruppeIkkeFastsatt =
        !harAvslattEgenvurdering &&
        kanViseIVURDEgenvurdering({
            underOppfolging,
            registreringData,
            autentiseringData,
            egenvurderingData,
            oppfolgingData,
        });

    const skalViseEgenvurderingUke12 =
        skalViseKssInnhold &&
        kanVise12UkerEgenvurdering({
            brukerInfoData,
            egenvurderingData,
            oppfolgingData,
            registreringData,
            amplitudeData,
            featuretoggleData,
            sistVistFraLocalstorage: Number(sistSettEgenvurderingUke12),
        });

    const skalViseEgenvurdering = skalViseEgenvurderingInnsatsgruppeIkkeFastsatt || skalViseEgenvurderingUke12;

    const Egenvurdering = () => {
        if (skalViseEgenvurderingInnsatsgruppeIkkeFastsatt) {
            return <EgenvurderingIVURD />;
        }
        if (skalViseEgenvurderingUke12) {
            return <EgenvurderingUke12 />;
        }
        return null;
    };

    const DefaultInnhold = () => {
        return (
            <>
                <Heading className={'blokk-xs'} size="medium">
                    {tekst('heading')}
                </Heading>
                <RegistrertTeller ukerRegistrert={ukerRegistrert} registrertDato={registrertDato} />
                <DialogKnapp amplitudeData={amplitudeData} href={dialogLenke} antallUlesteDialoger={antallUleste} />
            </>
        );
    };

    return (
        <Panel className="flex px-1_5">
            <ErRendret loggTekst="Rendrer hjelp og støtte-komponent" />
            <span
                style={{
                    marginRight: '0.5em',
                    position: 'relative',
                    top: '6px',
                    fontSize: 'var(--navds-font-size-heading-medium)',
                }}
            >
                <Dialog />
            </span>
            <div className="full-width">
                <Detail uppercase style={{ marginTop: '-1rem' }}>
                    Hjelp og støtte
                </Detail>
                {skalViseEgenvurdering ? <Egenvurdering /> : <DefaultInnhold />}
                <ReadMore size="medium" header={tekst('readMoreHeading')} onClick={handleClickLesMer}>
                    <Forklaring />
                </ReadMore>
            </div>
            <InViewport loggTekst="Viser hjelp og støtte-komponent i viewport" />
        </Panel>
    );
}

export default HjelpOgStotte;
