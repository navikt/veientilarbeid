import { loggAktivitet } from '../../metrics/metrics';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import './egenvurdering.less';
import { behovsvurderingLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
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

export const antallTimerMellomAOgBRundetOpp = (a: Date, b: Date): number => {
    if (!a || !b) {
        return 0;
    }
    return Math.ceil((b.getTime() - a.getTime()) / 36e5);
};

export const antallTimerSidenRegistrering = (registreringsDato: Date) => {
    return antallTimerMellomAOgBRundetOpp(registreringsDato, new Date());
};

const Egenvurdering = () => {
    const amplitudeData = useAmplitudeData();
    const registreringData = useBrukerregistreringData();
    const egenvurderingData = useEgenvurderingData();
    const oppfolgingData = useOppfolgingData();
    const autentiseringData = useAutentiseringData();
    const underOppfolgingData = useUnderOppfolgingData();
    const featuretoggleData = useFeatureToggleData();

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
        <Panel border className="ramme blokk-s">
            <section className="egenvurdering">
                <div className="innhold">
                    <Heading level="2" size="medium" className="blokk-xs">
                        {tekster['egenvurdering-tittel']}
                    </Heading>
                    <BodyShort className="blokk-s egenvurdering__tekst">{tekster['egenvurdering-tekst']}</BodyShort>
                    <Button variant="primary" onClick={handleButtonClick} className="blokk-xs">
                        {tekster['egenvurdering-lenke-tekst']}
                    </Button>
                </div>
            </section>
        </Panel>
    );
};

export default Egenvurdering;
