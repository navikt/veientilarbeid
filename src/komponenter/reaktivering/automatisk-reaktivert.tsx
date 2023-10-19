import { BodyLong, Button, Heading, Panel } from '@navikt/ds-react';
import { InformationIcon } from '@navikt/aksel-icons';
import { useEffect, useRef, useState } from 'react';

import { useFeatureToggleData, FeatureToggles } from '../../contexts/feature-toggles';
import { useArbeidssokerPerioder } from '../../contexts/arbeidssoker';
import { useReaktivering, ReaktiveringSvarAlternativer } from '../../contexts/reaktivering';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

import { ReadMoreInaktivering } from './readmore-derfor-ble-du-inaktivert';
import { ReadMoreViktigRegistrert } from './readmore-viktig-registrert';
import AiAInViewport from '../aia-in-viewport/aia-in-viewport';
import ErRendret from '../er-rendret/er-rendret';
import beregnArbeidssokerperioder from '../../lib/beregn-arbeidssokerperioder';
import prettyPrintDato from '../../utils/pretty-print-dato';
import { loggAktivitet } from '../../metrics/metrics';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { Sprak } from '../../contexts/sprak';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

const TEKSTER = {
    nb: {
        tittel: 'Du har blitt registrert som arbeidssøker på nytt!',
        periodeAvsluttet: 'ble arbeidssøkerperioden din avsluttet.',
        meldekortInnsendt: 'sendte du inn et meldekort der du svarte at du ønsker å være registrert som arbeidssøker.',
        derfor: 'Derfor ble du registrert på nytt.',
        registrertSporsmal: 'Ønsker du å være registrert?',
        registrertJa: 'Ja, jeg ønsker å være registrert',
        registrertNei: 'Nei, jeg ønsker ikke å være registrert',
        sprak: 'Read in English',
    },
    en: {
        tittel: 'You have been registered as a job seeker again!',
        periodeAvsluttet: 'your job seeker period has ended.',
        meldekortInnsendt:
            'you sent in a employment status form in which you replied "yes" to that you want to be registered as a job seeker.',
        derfor: "That's why you were registered again.",
        registrertSporsmal: 'Do you want to be registered?',
        registrertJa: 'Yes, I want to be registered',
        registrertNei: 'No, I do not wish to be registered',
        sprak: 'Les på norsk',
    },
};

function AutomatiskReaktivert() {
    const defaultSprak = 'nb' as Sprak;
    const [valgtSprak, setValgtSprak] = useState(defaultSprak);
    const featureToggleData = useFeatureToggleData();
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const { reaktivering, lagreReaktiveringSvar } = useReaktivering();
    const { amplitudeData } = useAmplitudeData();

    const tekst = lagHentTekstForSprak(TEKSTER, valgtSprak as Sprak);
    const harUbesvartReaktivering = reaktivering && reaktivering.svar === null;
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);
    const visSprakvelger = featureToggleData[FeatureToggles.BRUK_SPRAKVELGER];
    const kanViseKomponent = featureToggleData[FeatureToggles.BRUK_BEKREFT_REAKTIVERING] && harUbesvartReaktivering;
    const panelRef = useRef<HTMLDivElement>(null);

    async function handleReaktiveringSvar(svar: ReaktiveringSvarAlternativer) {
        await lagreReaktiveringSvar(svar);
        loggAktivitet({ aktivitet: `Svarer ${svar} på reaktiveringsbekreftelsen`, ...amplitudeData });
    }

    function toggleByttSprak() {
        loggAktivitet({ aktivitet: `Bytter språk på reaktiveringsbekreftelsen`, ...amplitudeData });
        setValgtSprak(valgtSprak === 'en' ? 'nb' : 'en');
    }

    useEffect(() => {
        if (panelRef.current) {
            panelRef.current.scrollIntoView({ block: 'end', inline: 'nearest' });
        }
    }, []);

    if (!kanViseKomponent) return null;

    return (
        <Panel className={spacingStyles.px1_5} ref={panelRef}>
            <ErRendret loggTekst="Rendrer automatisk reaktivert" />
            {visSprakvelger && (
                <Button variant="tertiary" size="xsmall" className={spacingStyles.ml1_75} onClick={toggleByttSprak}>
                    {tekst('sprak')}
                </Button>
            )}
            <div className={flexStyles.flex}>
                <span
                    style={{
                        marginRight: '0.5em',
                        position: 'relative',
                        top: '6px',
                        fontSize: 'var(--a-font-size-heading-medium)',
                    }}
                >
                    <InformationIcon aria-hidden="true" />
                </span>
                <div>
                    <Heading size="small">{tekst('tittel')}</Heading>
                    <BodyLong className={spacingStyles.mb1}>
                        {prettyPrintDato(arbeidssokerperioder.forrigePeriodeAvsluttetDato, valgtSprak)}{' '}
                        {tekst('periodeAvsluttet')}
                    </BodyLong>
                    <BodyLong className={spacingStyles.mb1}>
                        {prettyPrintDato(reaktivering.opprettetDato, valgtSprak)} {tekst('meldekortInnsendt')}
                    </BodyLong>
                    <BodyLong className={spacingStyles.mb1}>{tekst('derfor')}</BodyLong>
                    <ReadMoreInaktivering sprak={valgtSprak} />
                    <ReadMoreViktigRegistrert sprak={valgtSprak} />
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
            <AiAInViewport loggTekst="Automatisk reaktivert" />
        </Panel>
    );
}

export { AutomatiskReaktivert };
