import * as React from 'react';
import { loggAktivitet } from '../../metrics/metrics';
import { dialogLenke } from '../../innhold/lenker';
import { Besvarelse, Svar } from '../../contexts/brukerregistrering';
import prettyPrintDato from '../../utils/pretty-print-dato';
import { UnderOppfolgingContext } from '../../contexts/under-oppfolging';
import { BodyShort } from '@navikt/ds-react';

const Opplysning = (props: any) => {
    const { sporsmal, svar } = props;
    return (
        <div className="blokk-s">
            <BodyShort>
                {sporsmal}
                <br />
                <strong>{svar}</strong>
            </BodyShort>
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

const Opplysninger = (props: any) => {
    const { opprettetDato, manueltRegistrertAv, besvarelse, teksterForBesvarelse, amplitudeData } = props;
    const besvarelser = repackBesvarelser(besvarelse, teksterForBesvarelse);
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const kanViseKomponent = underOppfolging;

    const handleDialogClick = () => {
        loggAktivitet({ aktivitet: 'Går til endre registreringsopplysninger', ...amplitudeData });
    };

    return !kanViseKomponent ? null : (
        <>
            <div className="blokk-s">
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
            {besvarelser.map((item, index) => (
                <Opplysning {...item} key={index} />
            ))}
        </>
    );
};

export default Opplysninger;
