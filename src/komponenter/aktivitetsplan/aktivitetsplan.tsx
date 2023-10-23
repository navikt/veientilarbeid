import { BodyLong, Heading, Link, Box } from '@navikt/ds-react';
import { TasklistIcon } from '@navikt/aksel-icons';
import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

import { useSprakValg } from '../../contexts/sprak';

import { loggAktivitet } from '../../metrics/metrics';
import { aktivitetsplanLenke } from '../../innhold/lenker';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

const TEKSTER = {
    nb: {
        'aktivitetsplan.overskrift': 'Aktivitetsplanen din',
        'aktivitetsplan.bruke': 'Du kan bruke',
        'aktivitetsplan.lenketekst': 'aktivitetsplanen',
        'aktivitetsplan.holde-orden': 'til å holde orden på aktiviteter du gjør i samarbeid med NAV',
    },
    en: {
        'aktivitetsplan.overskrift': 'Your planned activities',
        'aktivitetsplan.bruke': 'You can use',
        'aktivitetsplan.lenketekst': 'your planned activities',
        'aktivitetsplan.holde-orden': 'to track activities you do in collaboration with NAV',
    },
};
const Aktivitetsplan = () => {
    const { amplitudeData } = useAmplitudeData();
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til aktivitetsplanen', ...amplitudeData });
    };

    return (
        <Box padding="4" className={`${flexStyles.flex} ${spacingStyles.pb2}`}>
            <span
                style={{
                    marginRight: '0.5em',
                    position: 'relative',
                    top: '6px',
                    fontSize: 'var(--a-font-size-heading-medium)',
                }}
            >
                <TasklistIcon />
            </span>
            <div>
                <Heading size="small">{tekst('aktivitetsplan.overskrift')}</Heading>
                <BodyLong>
                    {tekst('aktivitetsplan.bruke')}{' '}
                    <Link href={aktivitetsplanLenke} onClick={() => handleClick()}>
                        {tekst('aktivitetsplan.lenketekst')}
                    </Link>{' '}
                    {tekst('aktivitetsplan.holde-orden')}
                </BodyLong>
            </div>
        </Box>
    );
};

export default Aktivitetsplan;
