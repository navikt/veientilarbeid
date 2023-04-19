import { Calender } from '@navikt/ds-icons';
import { Detail, Heading, Panel } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useArbeidssokerPerioder } from '../../contexts/arbeidssoker';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import Sammendrag from './sammendrag';
import InnsynLesMer from '../innsyn/innsyn-les-mer';
import beregnArbeidssokerperioder from '../../lib/beregn-arbeidssokerperioder';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

const TEKSTER = {
    nb: {
        detail: 'Min situasjon',
        heading: 'Min arbeidssøkersituasjon',
    },
    en: {
        detail: 'My situation',
        heading: 'My situation as job seeker',
    },
};

const situasjon = {
    MISTET_JOBBEN: 'Har mistet eller kommer til å miste jobben',
    ALDRI_HATT_JOBB: 'Har aldri vært i jobb',
    HAR_SAGT_OPP: 'Har sagt opp eller kommer til å si opp',
    VIL_BYTTE_JOBB: 'Har jobb, men vil bytte',
    ER_PERMITTERT: 'Er permittert eller kommer til å bli permittert',
    USIKKER_JOBBSITUASJON: 'Er usikker på jobbsituasjonen min',
    JOBB_OVER_2_AAR: 'Har ikke vært i jobb de siste 2 årene',
    VIL_FORTSETTE_I_JOBB: 'Har jobb og ønsker å fortsette i den jobben jeg er i',
    AKKURAT_FULLFORT_UTDANNING: 'Har akkurat fullført utdanning, militærtjeneste eller annet',
    DELTIDSJOBB_VIL_MER: 'Har deltidsjobb, men vil jobbe mer',
    DEFAULT: 'Min arbeidssøkersituasjon',
};

function MinSituasjon(props: any) {
    const brukerregistreringData = useBrukerregistreringData();
    const arbeidssokerperiodeData = useArbeidssokerPerioder();
    const { amplitudeData } = useAmplitudeData();

    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const { aktivPeriodeStart } = beregnArbeidssokerperioder(arbeidssokerperiodeData);
    const { opprettetDato, manueltRegistrertAv, besvarelse } = brukerregistreringData?.registrering || {};
    const minSituasjon = (besvarelse && besvarelse['dinSituasjon']) || 'DEFAULT';

    return (
        <Panel className={`${flexStyles.flex} ${spacingStyles.px1_5}`}>
            <span
                style={{
                    marginRight: '0.5em',
                    position: 'relative',
                    top: '6px',
                    fontSize: 'var(--a-font-size-heading-medium)',
                }}
            >
                <Calender aria-hidden="true" />
            </span>
            <div className={spacingStyles.fullWidth}>
                <Detail uppercase style={{ marginTop: '-1rem' }}>
                    {tekst('detail')}
                </Detail>
                <Heading className={spacingStyles.blokkXs} size="medium">
                    {besvarelse ? situasjon[minSituasjon] : tekst('heading')}
                </Heading>
                <Sammendrag
                    startDato={opprettetDato || aktivPeriodeStart}
                    manueltRegistrertAv={manueltRegistrertAv}
                    amplitudeData={amplitudeData}
                />
                <InnsynLesMer />
            </div>
        </Panel>
    );
}

export default MinSituasjon;
