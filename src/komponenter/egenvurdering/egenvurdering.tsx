import { loggAktivitet } from '../../metrics/metrics';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { behovsvurderingLenke } from '../../innhold/lenker';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useAutentiseringData } from '../../contexts/autentisering';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { useEgenvurderingData } from '../../contexts/egenvurdering';
import { useUnderOppfolgingData } from '../../contexts/under-oppfolging';
import { kanViseIVURDEgenvurdering } from '../../lib/kan-vise-IVURD-egenvurdering';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import erStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from '../../lib/er-situasjonsbestemt-innsatsgruppe';
import { BodyShort, Button, Heading, Panel } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Hva trenger du for å komme i jobb?',
        'lenke-tekst': 'SVAR HER',
        innhold:
            'Du har krav på en skriftlig vurdering av behovet ditt for hjelp fra NAV. Derfor vil vi vite hva du selv mener.',
    },
};

export const antallTimerMellomAOgBRundetOpp = (a: Date, b: Date): number => {
    if (!a || !b) {
        return 0;
    }
    return Math.ceil((b.getTime() - a.getTime()) / 36e5);
};

const Egenvurdering = () => {
    const amplitudeData = useAmplitudeData();
    const registreringData = useBrukerregistreringData();
    const egenvurderingData = useEgenvurderingData();
    const oppfolgingData = useOppfolgingData();
    const autentiseringData = useAutentiseringData();
    const underOppfolgingData = useUnderOppfolgingData();
    const featuretoggleData = useFeatureToggleData();
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    const skalViseEgenvurderingLenke = kanViseIVURDEgenvurdering({
        underOppfolgingData,
        registreringData,
        autentiseringData,
        egenvurderingData,
        oppfolgingData,
    });

    const featuretoggleAktivert = featuretoggleData && featuretoggleData['veientilarbeid.vis-egenvurdering-med-14a'];

    const handleButtonClick = () => {
        loggAktivitet({ aktivitet: 'Går til egenvurdering', ...amplitudeData });
        window.location.assign(behovsvurderingLenke);
    };

    const brukerregistreringData = registreringData?.registrering ?? null;
    const brukerErStandard = erStandardInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });
    const brukerErSituasjonsbestemt = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });

    if (
        !skalViseEgenvurderingLenke ||
        (featuretoggleAktivert && brukerErStandard) ||
        (featuretoggleAktivert && brukerErSituasjonsbestemt)
    ) {
        return null;
    }

    return (
        <Panel border className="blokk-s">
            <Heading level="2" size="medium" className="blokk-xs">
                {tekst('tittel')}
            </Heading>
            <BodyShort className="blokk-s">{tekst('innhold')}</BodyShort>
            <Button variant="primary" onClick={handleButtonClick} className="blokk-xs">
                {tekst('lenke-tekst')}
            </Button>
        </Panel>
    );
};

export default Egenvurdering;
