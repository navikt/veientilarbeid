import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
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

    if (!skalViseEgenvurderingLenke || (featuretoggleAktivert && brukerErStandard)) {
        return null;
    }

    return (
        <Panel border className="ramme blokk-s">
            <section className="egenvurdering">
                <div className="innhold">
                    <Systemtittel tag="h2" className="blokk-xs">
                        {tekster['egenvurdering-tittel']}
                    </Systemtittel>
                    <Normaltekst className="blokk-s egenvurdering__tekst">{tekster['egenvurdering-tekst']}</Normaltekst>
                    <Hovedknapp onClick={handleButtonClick} className="blokk-xs">
                        {tekster['egenvurdering-lenke-tekst']}
                    </Hovedknapp>
                </div>
            </section>
        </Panel>
    );
};

export default Egenvurdering;
