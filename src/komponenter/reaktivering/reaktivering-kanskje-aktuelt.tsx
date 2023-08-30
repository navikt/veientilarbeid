import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useMeldeplikt } from '../../contexts/meldeplikt';

import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { loggAktivitet } from '../../metrics/metrics';
import { dialogLenke } from '../../innhold/lenker';
import SisteMeldekortVidereRegistrertValg from './siste-meldekort-videre-registrert-valg';

import styles from '../../innhold/innhold.module.css';
import spacingStyles from '../../spacing.module.css';
import ReaktiveringKnapp from './reaktivering-knapp';

interface ReaktiveringKanskjeAktueltProps {
    skalViseDato: boolean;
}

const ReaktiveringKanskjeAktuelt = (props: ReaktiveringKanskjeAktueltProps) => {
    const { amplitudeData } = useAmplitudeData();
    const { meldeplikt } = useMeldeplikt();
    const { skalViseDato } = props;

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
                    {skalViseDato && <SisteMeldekortVidereRegistrertValg meldeplikt={meldeplikt} />}
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
                        <ReaktiveringKnapp aktivitet="Trykker på reaktivering fra reaktivering ikke aktuelt" />
                    </BodyShort>
                    <InViewport loggTekst="Reaktivering ikke aktuelt" />
                </div>
                <InViewport loggTekst="Viser tema i viewport: kan reaktiveres" />
            </Alert>
        </section>
    );
};

export default ReaktiveringKanskjeAktuelt;
