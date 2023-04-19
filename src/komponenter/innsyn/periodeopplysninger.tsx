import { BodyShort } from '@navikt/ds-react';

import { loggAktivitet } from '../../metrics/metrics';
import { dialogLenke } from '../../innhold/lenker';
import prettyPrintDato from '../../utils/pretty-print-dato';
import Feedback from '../feedback/feedback';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

const PeriodeOpplysninger = (props: any) => {
    const { aktivPeriodeStart, amplitudeData } = props;

    const handleDialogClick = () => {
        loggAktivitet({
            aktivitet: 'Går til endre registreringsopplysninger fra arbeidssøkerperioder',
            ...amplitudeData,
        });
    };

    return (
        <div className={`${flexStyles.flex} ${flexStyles.flexColumn}`}>
            <div className={spacingStyles.blokkS}>
                <BodyShort>
                    Du ble registrert som arbeidssøker {prettyPrintDato(aktivPeriodeStart)}.<br />
                    Siden du registrerte deg før høsten 2018 har vi ikke muligheten til å vise opplysningene du oppga på
                    registreringstidspunktet
                    <br />
                    <a href={dialogLenke} onClick={handleDialogClick}>
                        Gi beskjed til veilederen din
                    </a>{' '}
                    hvis situasjonen din har endret seg.
                </BodyShort>
            </div>
            <Feedback id={'svar-fra-registreringen'} />
        </div>
    );
};

export default PeriodeOpplysninger;
