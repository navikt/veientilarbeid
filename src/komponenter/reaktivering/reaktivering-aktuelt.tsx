import * as React from 'react';
import { Alert, BodyShort, Button, Heading, Link } from '@navikt/ds-react';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useMeldeplikt } from '../../contexts/meldeplikt';

import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { loggAktivitet } from '../../metrics/metrics';
import { dialogLenke, reaktiveringLenke } from '../../innhold/lenker';
import SisteMeldekortVidereRegistrertValg from './siste-meldekort-videre-registrert-valg';

import styles from '../../innhold/innhold.module.css';
import spacingStyles from '../../spacing.module.css';
import ReaktiveringKnapp from './reaktivering-knapp';
import { FeatureToggles, useFeatureToggleData } from '../../contexts/feature-toggles';

interface Props {
    handleIkkeReaktivering: (event: React.SyntheticEvent) => void;
}

const ReaktiveringAktuelt = (props: Props) => {
    const { amplitudeData } = useAmplitudeData();
    const { meldeplikt } = useMeldeplikt();
    const featureToggle = useFeatureToggleData();

    const { handleIkkeReaktivering } = props;

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
            <Alert variant="warning">
                <Heading size="small" level="2" className={spacingStyles.mb1}>
                    Du er ikke lenger registrert som arbeidssøker hos NAV
                </Heading>
                <div>
                    <SisteMeldekortVidereRegistrertValg meldeplikt={meldeplikt} />
                    <BodyShort className={spacingStyles.blokkS}>
                        {featureToggle[FeatureToggles.BRUK_REAKTIVERING_KNAPP] ? (
                            <ReaktiveringKnapp aktivitet="Trykker på reaktivering" />
                        ) : (
                            <Button variant="primary" onClick={() => handleReaktivering('Går til reaktivering')}>
                                Registrer deg som arbeidssøker
                            </Button>
                        )}
                    </BodyShort>
                    <BodyShort className={spacingStyles.blokkXs}>
                        <Link href={dialogLenke} onClick={handleIkkeReaktivering}>
                            Jeg har ikke lenger behov for å være registrert som arbeidssøker hos NAV
                        </Link>
                    </BodyShort>
                    <Heading size="small" level="3" className={spacingStyles.mb1}>
                        Hva betyr det å ikke lenger være registrert?
                    </Heading>
                    <BodyShort className={spacingStyles.blokkXs}>
                        Har du mottatt dagpenger vil utbetalingene nå være stoppet. Du må registrere deg på nytt og
                        sende inn ny søknad om dagpenger.
                    </BodyShort>
                    <BodyShort className={spacingStyles.blokkXs}>
                        Dersom du har søkt eller ønsker å søke om dagpenger må du være registrert som arbeidssøker.
                    </BodyShort>
                    <BodyShort className={spacingStyles.blokkXs}>
                        Dersom du ønsker arbeidsrettet oppfølging fra NAV, må du være registrert som arbeidssøker.
                    </BodyShort>
                    <BodyShort>
                        Er du usikker på om din situasjon betyr at du bør være registrert som arbeidssøker?
                    </BodyShort>
                    <BodyShort className={spacingStyles.blokkXs}>
                        <Link href={dialogLenke} onClick={() => handleDialog('Går til dialog fra reaktiveringskortet')}>
                            Ta kontakt med veilederen din i dialogtjenesten
                        </Link>
                    </BodyShort>
                </div>
                <InViewport loggTekst="Viser tema i viewport: kan reaktiveres" />
            </Alert>
        </section>
    );
};

export default ReaktiveringAktuelt;
