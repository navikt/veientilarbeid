import { Alert, Button } from '@navikt/ds-react';

import { DinSituasjonSvar, PermittertSvar } from './permittert-modal';
import Veiledning from './veiledning';
import TilleggsData from '../innsyn/tilleggsdata';

import spacing from '../../spacing.module.css';
import flex from '../../flex.module.css';

export interface Steg3Props {
    valgtSituasjon: PermittertSvar | DinSituasjonSvar;
    tilleggsData?: any;
    onClose(): void;
}

const Steg3 = (props: Steg3Props) => {
    const { valgtSituasjon, onClose, tilleggsData } = props;
    return (
        <>
            <Alert variant="info" className={spacing.mb1}>
                NAV har mottatt oppdateringen.
            </Alert>
            <TilleggsData verdi={valgtSituasjon} tilleggsData={tilleggsData} />
            <Veiledning valgtSituasjon={valgtSituasjon} tilleggsData={tilleggsData} />
            <div className={`${flex.flex} ${flex.flexEnd}`}>
                <Button variant={'primary'} onClick={onClose}>
                    Lukk
                </Button>
            </div>
        </>
    );
};

export default Steg3;
