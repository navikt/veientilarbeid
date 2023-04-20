import { BodyShort } from '@navikt/ds-react';

import prettyPrintDato from '../../utils/pretty-print-dato';
import Feedback from '../feedback/feedback';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

const PeriodeOpplysninger = (props: any) => {
    const { aktivPeriodeStart } = props;

    return (
        <div className={`${flexStyles.flex} ${flexStyles.flexColumn}`}>
            <div className={spacingStyles.blokkS}>
                <BodyShort>
                    Siden du registrerte deg før høsten 2018 har vi ikke muligheten til å vise opplysningene du oppga på
                    registreringstidspunktet
                </BodyShort>
            </div>
            <div className={`${spacingStyles.blokkS}`}>
                <div className={`${flexStyles.flex}`}>
                    <strong className={spacingStyles.mr05}>Registrering</strong>
                </div>
                <div>
                    <div className={`${flexStyles.flex} ${flexStyles.alignCenter} ${flexStyles.wrap}`}>
                        <div className={`${spacingStyles.mr05} ${spacingStyles.mb05}`}>
                            Du registrerte deg som arbeidssøker {prettyPrintDato(aktivPeriodeStart)}
                        </div>
                    </div>
                </div>
            </div>
            <Feedback id={'svar-fra-registreringen'} />
        </div>
    );
};

export default PeriodeOpplysninger;
