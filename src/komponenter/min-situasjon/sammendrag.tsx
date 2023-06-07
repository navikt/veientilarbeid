import { BodyShort } from '@navikt/ds-react';

import { useUnderOppfolging } from '../../contexts/arbeidssoker';

import { loggAktivitet } from '../../metrics/metrics';
import { dialogLenke } from '../../innhold/lenker';

import spacing from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

const Sammendrag = (props: any) => {
    const { amplitudeData } = props;
    const underoppfolging = useUnderOppfolging()?.underoppfolging;
    const kanViseKomponent = underoppfolging;

    const handleDialogClick = () => {
        loggAktivitet({
            aktivitet: 'Går til endre registreringsopplysninger',
            komponent: 'Min situasjon',
            ...amplitudeData,
        });
    };

    return !kanViseKomponent ? null : (
        <div className={`${flexStyles.flex} ${flexStyles.flexColumn}`}>
            <div className={spacing.blokkS}>
                <BodyShort>
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
