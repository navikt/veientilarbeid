import { Heading } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';

import SkrivTilOssChatOgMineDagpenger from './skriv-til-oss-chat-og-mine-dagpenger';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';

import spacingStyles from '../../spacing.module.css';

const TEKSTER: Tekster<string> = {
    nb: {
        heading: 'Dagpenger',
    },
    en: {
        heading: 'Unemployment benefits',
    },
};

const DagpengerGenerell = (props: any) => {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <>
            <Heading size="small" className={spacingStyles.blokkXs}>
                {tekst('heading')}
            </Heading>
            {props.children}
            <SkrivTilOssChatOgMineDagpenger amplitudeTemaNavn='"dagpenger-tema - dagpenger generell"' />
        </>
    );
};

export default DagpengerGenerell;
