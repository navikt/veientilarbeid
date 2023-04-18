import { SelfService } from '@navikt/ds-icons';
import { Detail, Panel } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import InnsynLesMer from '../innsyn/innsyn-les-mer';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

const TEKSTER = {
    nb: {
        heading: 'Min situasjon',
        readMoreHeading: 'Hva slags hjelp kan jeg få?',
    },
    en: {
        heading: 'My situation',
        readMoreHeading: 'What kind of help can I get?',
    },
};

function MinSituasjon(props: any) {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

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
                <SelfService aria-hidden="true" />
            </span>
            <div className={spacingStyles.fullWidth}>
                <Detail uppercase style={{ marginTop: '-1rem' }}>
                    {tekst('heading')}
                </Detail>
                <InnsynLesMer />
            </div>
        </Panel>
    );
}

export default MinSituasjon;
