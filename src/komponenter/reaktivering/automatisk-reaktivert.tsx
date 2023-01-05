import { BodyLong, Button, Heading, Panel } from '@navikt/ds-react';
import { InformationColored } from '@navikt/ds-icons';

import { useFeatureToggleData, FeatureToggles } from '../../contexts/feature-toggles';
import { useArbeidssokerPerioder } from '../../contexts/arbeidssoker';
import { useReaktivering, ReaktiveringSvarAlternativer } from '../../contexts/reaktivering';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

import { ReadMoreInaktivering } from './readmore-derfor-ble-du-inaktivert';
import { ReadMoreViktigRegistrert } from './readmore-viktig-registrert';
import InViewport from '../in-viewport/in-viewport';
import beregnArbeidssokerperioder from '../../lib/beregn-arbeidssokerperioder';
import prettyPrintDato from '../../utils/pretty-print-dato';
import { loggAktivitet } from '../../metrics/metrics';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

const TEKSTER = {
    nb: {
        tittel: 'Du har blitt registrert som arbeidssøker på nytt!',
        periodeAvsluttet: 'ble arbeidssøkerperioden din avsluttet.',
        meldekortInnsendt: 'sendte du inn et meldekort der du svarte at du ønsker å være registrert som arbeidssøker.',
        registrertSporsmal: 'Ønsker du å være registrert?',
        registrertJa: 'Ja, jeg ønsker å være registrert',
        registrertNei: 'Nei, jeg ønsker ikke å være registrert',
    },
    en: {
        tittel: 'Du har blitt registrert som arbeidssøker på nytt!',
        periodeAvsluttet: 'ble arbeidssøkerperioden din avsluttet.',
        meldekortInnsendt: 'sendte du inn et meldekort der du svarte at du ønsker å være registrert som arbeidssøker.',
        registrertSporsmal: 'Ønsker du å være registrert?',
        registrertJa: 'Ja, jeg ønsker å være registrert',
        registrertNei: 'Nei, jeg ønsker ikke å være registrert',
    },
};

function AutomatiskReaktivert() {
    const featureToggleData = useFeatureToggleData();
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const { reaktivering, lagreReaktiveringSvar } = useReaktivering();
    const { amplitudeData } = useAmplitudeData();

    const tekst = lagHentTekstForSprak(TEKSTER, 'nb');
    const harUbesvartReaktivering = reaktivering && reaktivering.svar === null;
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);
    const kanViseKomponent = featureToggleData[FeatureToggles.BRUK_BEKREFT_REAKTIVERING] && harUbesvartReaktivering;

    async function handleReaktiveringSvar(svar: ReaktiveringSvarAlternativer) {
        await lagreReaktiveringSvar(svar);
        loggAktivitet({ aktivitet: `Svarer ${svar} på reaktiveringsbekreftelsen`, ...amplitudeData });
    }

    if (!kanViseKomponent) return null;

    return (
        <Panel className={spacingStyles.px1_5}>
            <div className={flexStyles.flex}>
                <span
                    style={{
                        marginRight: '0.5em',
                        position: 'relative',
                        top: '6px',
                        fontSize: 'var(--a-font-size-heading-medium)',
                    }}
                >
                    <InformationColored aria-hidden="true" />
                </span>
                <div>
                    <Heading size="medium">{tekst('tittel')}</Heading>
                    <BodyLong className={spacingStyles.mb1}>
                        {prettyPrintDato(arbeidssokerperioder.forrigePeriodeAvsluttetDato)} {tekst('periodeAvsluttet')}
                    </BodyLong>
                    <BodyLong className={spacingStyles.mb1}>
                        {prettyPrintDato(reaktivering.opprettetDato)} {tekst('meldekortInnsendt')}
                    </BodyLong>
                    <BodyLong className={spacingStyles.mb1}>Derfor ble du registrert på nytt.</BodyLong>
                    <ReadMoreInaktivering />
                    <ReadMoreViktigRegistrert />
                    <div className={`${spacingStyles.mt1} ${flexStyles.flex} ${flexStyles.flexColumn}`}>
                        <Heading size="small" spacing>
                            {tekst('registrertSporsmal')}
                        </Heading>
                        <Button className={spacingStyles.mb1} onClick={() => handleReaktiveringSvar('ja')}>
                            {tekst('registrertJa')}
                        </Button>
                        <Button variant="secondary" onClick={() => handleReaktiveringSvar('nei')}>
                            {tekst('registrertNei')}
                        </Button>
                    </div>
                </div>
            </div>
            <InViewport loggTekst="Viser automatisk reaktivert i viewport" />
        </Panel>
    );
}

export { AutomatiskReaktivert };
