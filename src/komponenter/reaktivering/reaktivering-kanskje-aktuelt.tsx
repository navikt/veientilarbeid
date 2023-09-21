import { Alert, BodyShort, Button, Heading, Link } from '@navikt/ds-react';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { loggAktivitet } from '../../metrics/metrics';
import { dialogLenke, reaktiveringLenke } from '../../innhold/lenker';

import styles from '../../innhold/innhold.module.css';
import spacingStyles from '../../spacing.module.css';
import ReaktiveringKnapp from './reaktivering-knapp';
import { FeatureToggles, useFeatureToggleData } from '../../contexts/feature-toggles';

const ReaktiveringKanskjeAktuelt = () => {
    const { amplitudeData } = useAmplitudeData();
    const featureToggle = useFeatureToggleData();

    const handleReaktivering = (aktivitet: string) => {
        loggAktivitet({ aktivitet: aktivitet, ...amplitudeData });
        window.location.assign(reaktiveringLenke);
    };

    const handleDialog = (aktivitet: string) => {
        loggAktivitet({ aktivitet: aktivitet, ...amplitudeData });
        window.location.assign(dialogLenke);
    };

    return (
        <section className={`${styles.limit} ${spacingStyles.blokkM}`}>
            <ErRendret loggTekst="Rendrer tema: kan reaktiveres" />
            <Alert variant="info">
                <Heading size="small" level="2" className={spacingStyles.mb1}>
                    Du er ikke lenger registrert som arbeidssøker hos NAV
                </Heading>
                <div>
                    <BodyShort>
                        Er du usikker på om din situasjon betyr at du bør være registrert som arbeidssøker?
                    </BodyShort>
                    <BodyShort className={spacingStyles.mb1}>
                        <Link
                            href={dialogLenke}
                            onClick={() => handleDialog('Går til dialog fra reaktivering ikke aktuelt')}
                        >
                            Ta kontakt med veilederen din i dialogtjenesten
                        </Link>
                    </BodyShort>
                    <BodyShort className={spacingStyles.mb1}>
                        {featureToggle[FeatureToggles.BRUK_REAKTIVERING_KNAPP] ? (
                            <ReaktiveringKnapp aktivitet="Bruker reaktiverer seg selv fra reaktivering ikke aktuelt" />
                        ) : (
                            <Button
                                variant="secondary"
                                onClick={() => handleReaktivering('Går til reaktivering fra reaktivering ikke aktuelt')}
                            >
                                Registrer deg som arbeidssøker
                            </Button>
                        )}
                    </BodyShort>
                    <InViewport loggTekst="Reaktivering ikke aktuelt" />
                </div>
                <InViewport loggTekst="Viser tema i viewport: kan reaktiveres" />
            </Alert>
        </section>
    );
};

export default ReaktiveringKanskjeAktuelt;
