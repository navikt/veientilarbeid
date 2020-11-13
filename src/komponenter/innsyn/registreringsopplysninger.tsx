import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { AmplitudeAktivitetContext } from '../../ducks/amplitude-aktivitet-context';
import { loggAktivitet } from '../../metrics/metrics';
import { dialogLenke } from '../../innhold/lenker';
import { Besvarelse, Svar } from '../../ducks/brukerregistrering';
import prettyPrintDato from '../../utils/pretty-print-dato';
import './registreringsopplysninger.less';

const Opplysning = (props: any) => {
    const { sporsmal, svar } = props;
    return (
        <div className="blokk-s">
            <Normaltekst>
                {sporsmal}
                <br />
                <strong>{svar}</strong>
            </Normaltekst>
        </div>
    );
};

const repackBesvarelser = (besvarelse: Besvarelse, teksterForBesvarelse: Array<Svar>) => {
    const tekster = teksterForBesvarelse || [];
    const besvarelserMedInnhold = Object.keys(besvarelse).filter((item) => besvarelse[item]);
    const alleSvar = besvarelserMedInnhold.map((item) => tekster.find((svar) => svar.sporsmalId === item));
    const svarMedInnhold = alleSvar.filter((svar) => svar !== undefined);
    return svarMedInnhold;
};

const opplysninger = (props: any) => {
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);
    const { opprettetDato, manueltRegistrertAv, besvarelse, teksterForBesvarelse } = props;
    const besvarelser = repackBesvarelser(besvarelse, teksterForBesvarelse);
    const handleDialogClick = () => {
        loggAktivitet({ aktivitet: 'Går til endre registreringsopplysninger', ...amplitudeAktivitetsData });
    };

    return (
        <>
            <div className="blokk-s">
                <Normaltekst>
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
                </Normaltekst>
            </div>
            {besvarelser.map((item, index) => (
                <Opplysning {...item} key={index} />
            ))}
        </>
    );
};

export default opplysninger;
