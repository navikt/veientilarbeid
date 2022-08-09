import { Dialog } from '@navikt/ds-icons';

import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useUnderOppfolgingData } from '../../contexts/under-oppfolging';
import { useAutentiseringData } from '../../contexts/autentisering';
import { useEgenvurderingData } from '../../contexts/egenvurdering';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useUlesteDialogerData } from '../../contexts/ulestedialoger';

import RegistrertTeller from './registrert-teller';
import { dialogLenke } from '../../innhold/lenker';
import Lenkepanel14A from './lenkepanel-14a';
import EgenvurderingKort, { AVSLAATT_EGENVURDERING } from './egenvurderingIVURD';
import { kanViseIVURDEgenvurdering } from '../../lib/kan-vise-IVURD-egenvurdering';
import { hentFraBrowserStorage } from '../../utils/browserStorage-utils';
import { Heading, Panel } from '@navikt/ds-react';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';

const TEKSTER = {
    nb: {
        heading: 'Om du ønsker oppfølging må du gi oss beskjed',
    },
    en: {
        heading: 'Get in touch if you need help',
    },
};

function HjelpOgStotte() {
    const amplitudeData = useAmplitudeData();
    const { ukerRegistrert } = amplitudeData;

    const registreringData = useBrukerregistreringData();
    const featuretoggleData = useFeatureToggleData();
    const underOppfolgingData = useUnderOppfolgingData();
    const autentiseringData = useAutentiseringData();
    const egenvurderingData = useEgenvurderingData();
    const oppfolgingData = useOppfolgingData();

    const { antallUleste } = useUlesteDialogerData();

    const brukNyKomponent = featuretoggleData['veientilarbeid.ny-hjelp-og-stotte-komponent'];

    const registrertDato = registreringData?.registrering?.opprettetDato;

    const featuretoggleEgenvurderingAktivert =
        featuretoggleData && featuretoggleData['veientilarbeid.vis-egenvurdering-med-14a'];

    const skalViseEgenvurdering = kanViseIVURDEgenvurdering({
        underOppfolgingData,
        registreringData,
        autentiseringData,
        egenvurderingData,
        oppfolgingData,
    });

    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    if (!brukNyKomponent) return null;

    const EgenVurderingMedLesLink = () => {
        return <EgenvurderingKort />;
    };

    const harAvslattEgenvurdering = hentFraBrowserStorage(AVSLAATT_EGENVURDERING);
    if (featuretoggleEgenvurderingAktivert && skalViseEgenvurdering && !harAvslattEgenvurdering)
        return <EgenVurderingMedLesLink />;

    return (
        <Panel className="flex">
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
            <div>
                <ErRendret loggTekst="Rendrer 14a sluttkort" />
                <Heading className={'blokk-xs'} size="medium">
                    {tekst('heading')}
                </Heading>
                <RegistrertTeller ukerRegistrert={ukerRegistrert} registrertDato={registrertDato} />
                <Lenkepanel14A amplitudeData={amplitudeData} href={dialogLenke} antallUlesteDialoger={antallUleste} />
                <InViewport loggTekst="Viser 14a sluttkort i viewport" />
            </div>
        </Panel>
    );
}

export default HjelpOgStotte;
