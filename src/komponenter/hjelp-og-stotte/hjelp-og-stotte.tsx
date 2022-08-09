import { Dialog } from '@navikt/ds-icons';
import { Heading, Panel, ReadMore } from '@navikt/ds-react';

import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useUnderOppfolgingData } from '../../contexts/under-oppfolging';
import { useAutentiseringData } from '../../contexts/autentisering';
import { useEgenvurderingData } from '../../contexts/egenvurdering';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useUlesteDialogerData } from '../../contexts/ulestedialoger';
import { useSprakValg } from '../../contexts/sprak';

import RegistrertTeller from './registrert-teller';
import { dialogLenke } from '../../innhold/lenker';
import Lenkepanel14A from './lenkepanel-14a';
import EgenvurderingKort, { AVSLAATT_EGENVURDERING } from './egenvurderingIVURD';
import { kanViseIVURDEgenvurdering } from '../../lib/kan-vise-IVURD-egenvurdering';
import { hentFraBrowserStorage } from '../../utils/browserStorage-utils';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import Forklaring from './forklaring';

const TEKSTER = {
    nb: {
        heading: 'Om du ønsker oppfølging må du gi oss beskjed',
        readMoreHeading: 'Er du enig i hvordan NAV har vurdert ditt behov for hjelp og støtte?',
    },
    en: {
        heading: 'Get in touch if you need help',
        readMoreHeading: 'Do you agree with how NAV has assessed your need for help and support?',
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

    const brukNyKomponent = featuretoggleData['veientilarbeid.ny-standardvisning'];

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
                <ReadMore size="medium" header={tekst('readMoreHeading')}>
                    <Forklaring />
                </ReadMore>
            </div>
        </Panel>
    );
}

export default HjelpOgStotte;
