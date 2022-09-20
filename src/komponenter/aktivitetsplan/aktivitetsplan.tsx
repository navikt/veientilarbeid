import { BodyLong, Heading, Link, Panel } from '@navikt/ds-react';
import { Task } from '@navikt/ds-icons';
import spacingStyles from '../../spacing.module.css';

import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useSprakValg } from '../../contexts/sprak';

import { loggAktivitet } from '../../metrics/metrics';
import { aktivitetsplanLenke } from '../../innhold/lenker';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';

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
    const amplitudeData = useAmplitudeData();
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til aktivitetsplanen', ...amplitudeData });
    };

    return (
        <Panel className={`flex ${spacingStyles.pb2}`}>
            <span
                style={{
                    marginRight: '0.5em',
                    position: 'relative',
                    top: '6px',
                    fontSize: 'var(--navds-font-size-heading-medium)',
                }}
            >
                <Task />
            </span>
            <div>
                <Heading size="medium">{tekst('aktivitetsplan.overskrift')}</Heading>
                <BodyLong>
                    {tekst('aktivitetsplan.bruke')}{' '}
                    <Link href={aktivitetsplanLenke} onClick={() => handleClick()}>
                        {tekst('aktivitetsplan.lenketekst')}
                    </Link>{' '}
                    {tekst('aktivitetsplan.holde-orden')}
                </BodyLong>
            </div>
        </Panel>
    );
};

export default Aktivitetsplan;
