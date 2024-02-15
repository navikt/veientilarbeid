import { BodyShort, Link } from '@navikt/ds-react';

import Feedback from '../feedback/feedback';
import { Besvarelse, BesvarelseResponse, DinSituasjonTilleggsdata } from '../../contexts/besvarelse';
import prettyPrintDato from '../../utils/pretty-print-dato';
import { sporsmalMap, svarMap } from '../../models/sporsmal-og-svar';
import { dialogLenke } from '../../innhold/lenker';
import TilleggsData from './tilleggsdata';

import spacing from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';
import Oppfolging from './oppfolging';

const Opplysning = (props: any) => {
    const { sporsmal, svar, verdi, datapunkt, tilleggsData } = props;
    return (
        <div className={spacing.blokkS}>
            <BodyShort>
                <strong>{sporsmal}</strong>
                <br />
                {svar}
            </BodyShort>
            {datapunkt === 'dinSituasjon' && <TilleggsData tilleggsData={tilleggsData} verdi={verdi} />}
        </div>
    );
};

const DinSituasjon = (props: any) => {
    const { svar, endretTidspunkt, endretAv } = props;
    const erEndret = endretAv && endretTidspunkt;
    return (
        <div className={spacing.blokkS}>
            <BodyShort>
                <strong>Hvilken jobbsituasjon passer best?</strong>
                <br />
                {erEndret
                    ? `${prettyPrintDato(endretTidspunkt)} endret ${endretAv === 'BRUKER' ? 'du' : 'NAV'} til "${svar}"`
                    : `${svar}`}
                .
            </BodyShort>
            {erEndret && (
                <BodyShort>
                    For å se endringene du har oppgitt kan du <Link href={dialogLenke}>gå til dialogen</Link>.
                </BodyShort>
            )}
        </div>
    );
};

interface Svar {
    sporsmal: string;
    svar: string | null;
    verdi: string | null;
    endretTidspunkt: string | null;
    endretAv: string | null;
    datapunkt: string;
    tilleggsData: DinSituasjonTilleggsdata | null;
}

const repackBesvarelser = (besvarelseData: BesvarelseResponse) => {
    const besvarelse = besvarelseData?.besvarelse || {};
    const besvarelserMedInnhold = Object.keys(besvarelse).map((key) => {
        const k = key as keyof Besvarelse;
        return {
            sporsmal: sporsmalMap[k],
            svar: besvarelse[k]?.verdi ? svarMap[k][besvarelse[k]!.verdi] : null,
            verdi: besvarelse[k]?.verdi || null,
            endretTidspunkt: besvarelse[k]?.endretTidspunkt || null,
            endretAv: besvarelse[k]?.endretAv || null,
            datapunkt: key,
            tilleggsData: (besvarelse[k] as any)?.tilleggsData || null,
        } as Svar;
    });
    const besvarteBesvarelser = besvarelserMedInnhold.filter((item) => item.svar !== null);
    return besvarteBesvarelser;
};

interface OpplysningerProps {
    besvarelseData: BesvarelseResponse;
    manueltRegistrertAv: object | undefined | null;
}

const RegistreringsOpplysninger = (props: OpplysningerProps) => {
    const { besvarelseData, manueltRegistrertAv } = props;
    const registreringsTidspunkt = besvarelseData?.registreringsTidspunkt
        ? prettyPrintDato(besvarelseData.registreringsTidspunkt)
        : '';
    const opprettetAv = manueltRegistrertAv ? 'NAV' : 'Du';
    const endretTidspunkt = besvarelseData?.endretTidspunkt ? prettyPrintDato(besvarelseData.endretTidspunkt) : '';
    const endretAv = besvarelseData?.endretAv && besvarelseData.endretAv === 'BRUKER' ? 'deg' : 'NAV';
    const erBesvarelsenEndret = besvarelseData?.erBesvarelsenEndret || false;

    if (!besvarelseData) return null;
    return (
        <div className={`${spacing.blokkS}`}>
            <div className={`${flexStyles.flex}`}>
                <strong className={spacing.mr05}>Registrering</strong>
            </div>
            <div>
                <div className={`${spacing.mr05} ${spacing.mb05}`}>
                    <BodyShort>
                        {opprettetAv} registrerte deg som arbeidssøker {registreringsTidspunkt}.
                    </BodyShort>
                    {erBesvarelsenEndret && (
                        <BodyShort>
                            Opplysningene ble sist endret av {endretAv} {endretTidspunkt}.
                        </BodyShort>
                    )}
                </div>
            </div>
        </div>
    );
};

const OpplysningerFraBesvarelsen = (props: OpplysningerProps) => {
    const { besvarelseData, manueltRegistrertAv } = props;
    const besvarelser = repackBesvarelser(besvarelseData);
    const dinSituasjon = besvarelser.find((svar) => svar.datapunkt === 'dinSituasjon');
    const filtrerteBesvarelser = besvarelser.filter((svar) => svar.datapunkt !== 'dinSituasjon');

    return !besvarelseData ? null : (
        <div className={`${flexStyles.flex} ${flexStyles.flexColumn}`}>
            <div className={spacing.blokkS}>
                <BodyShort>
                    Du kan endre opplysningene du ga ved å kontakte NAV.
                    <br />
                    Veilederen din bruker opplysningene for å vurdere hvor mye veiledning du trenger.
                </BodyShort>
            </div>
            <RegistreringsOpplysninger besvarelseData={besvarelseData} manueltRegistrertAv={manueltRegistrertAv} />
            {dinSituasjon && <DinSituasjon {...dinSituasjon} />}
            <Oppfolging />
            {filtrerteBesvarelser.map((item, index) => (
                <Opplysning {...item} key={index} />
            ))}
            <Feedback id={'svar-fra-besvarelsen'} />
        </div>
    );
};

export default OpplysningerFraBesvarelsen;
