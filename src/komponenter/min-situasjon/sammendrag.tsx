import { BodyShort } from '@navikt/ds-react';

import { useUnderOppfolging } from '../../contexts/arbeidssoker';

import { loggAktivitet } from '../../metrics/metrics';
import { dialogLenke } from '../../innhold/lenker';
import prettyPrintDato from '../../utils/pretty-print-dato';

import spacing from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

const Sammendrag = (props: any) => {
    const { opprettetDato, manueltRegistrertAv, amplitudeData } = props;
    const underoppfolging = useUnderOppfolging()?.underoppfolging;
    const kanViseKomponent = underoppfolging;

    const handleDialogClick = () => {
        loggAktivitet({ aktivitet: 'Går til endre registreringsopplysninger', ...amplitudeData });
    };

    return !kanViseKomponent ? null : (
        <div className={`${flexStyles.flex} ${flexStyles.flexColumn}`}>
            <div className={spacing.blokkS}>
                <BodyShort>
                    {manueltRegistrertAv ? 'NAV' : 'Du'} registrerte deg som arbeidssøker{' '}
                    {prettyPrintDato(opprettetDato)}.<br />
                    Du kan endre opplysningene du ga ved å kontakte NAV.
                    <br />
                    Veilederen din bruker opplysningene for å vurdere hvor mye veiledning du trenger.
                    <br />
                    <a href={dialogLenke} onClick={handleDialogClick}>
                        Gi beskjed til veilederen din
                    </a>{' '}
                    hvis situasjonen din endrer seg.
                </BodyShort>
            </div>
        </div>
    );
};

export default Sammendrag;
