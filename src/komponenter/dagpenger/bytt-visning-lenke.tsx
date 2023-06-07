import { Link } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';
import { XMarkIcon } from '@navikt/aksel-icons';

const TEKSTER: Tekster<string> = {
    nb: {
        aktuelt: 'Dagpenger er mest aktuelt',
        ikkeAktuelt: 'Dagpenger er ikke aktuelt',
    },
    en: {
        aktuelt: 'Unemployment benefits are most relevant',
        ikkeAktuelt: 'Unemployment benefits are not applicable',
    },
};

const ByttVisningLenke = (props: {
    handleByttVisningKlikk: (e: React.MouseEvent) => void;
    valgtYtelserVisning: string;
}) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    return (
        <div className={`${flexStyles.flex} ${flexStyles.alignCenter} ${spacingStyles.mt1}`}>
            <Link href="" onClick={props.handleByttVisningKlikk}>
                <XMarkIcon
                    aria-hidden="true"
                    className={spacingStyles.mr05}
                    title={
                        props.valgtYtelserVisning === 'dagpenger'
                            ? 'Ikke vis informasjon om dagpenger'
                            : 'Vis informasjon om dagpenger'
                    }
                />
                {props.valgtYtelserVisning === 'dagpenger' ? tekst('ikkeAktuelt') : tekst('aktuelt')}
            </Link>
        </div>
    );
};

export default ByttVisningLenke;
