import prettyPrintDato from '../../utils/pretty-print-dato';
import { Alert, Button } from '@navikt/ds-react';
import flex from '../../flex.module.css';
import { PermittertSvar } from './permittert-modal';

export interface Steg3Props {
    valgtSituasjon: PermittertSvar;
    tilleggsData?: any;
    onClose(): void;
}

const OppsigelseKvittering = (props: Steg3Props) => {
    const { tilleggsData } = props;
    return (
        <ul>
            <li>Du har oppgitt at du mottok oppsigelsen {prettyPrintDato(tilleggsData.oppsigelseDato)}</li>
            <li>Din arbeidsgiver betaler lønn til og med {prettyPrintDato(tilleggsData.sisteArbeidsdagDato)}</li>
        </ul>
    );
};

const EndretPermitteringsprosentKvittering = (props: Steg3Props) => {
    const { tilleggsData } = props;
    return (
        <ul>
            <li>
                Du har oppgitt at du endret permitteringprosenten til <b>{tilleggsData.permitteringsProsent}%</b>
            </li>
            <li>Endringen gjelder fra {prettyPrintDato(tilleggsData.gjelderFraDato)}</li>
        </ul>
    );
};
const Steg3 = (props: Steg3Props) => {
    const { valgtSituasjon, onClose } = props;
    const Kvittering = () => {
        if (valgtSituasjon === PermittertSvar.OPPSIGELSE) {
            return <OppsigelseKvittering {...props} />;
        } else if (valgtSituasjon === PermittertSvar.ENDRET_PERMITTERINGSPROSENT) {
            return <EndretPermitteringsprosentKvittering {...props} />;
        }

        return null;
    };
    return (
        <>
            <Alert variant="info">NAV har mottatt oppdateringen.</Alert>
            <Kvittering />
            <div className={`${flex.flex} ${flex.flexEnd}`}>
                <Button variant={'primary'} onClick={onClose}>
                    Lukk
                </Button>
            </div>
        </>
    );
};

export default Steg3;
