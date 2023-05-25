import { BodyShort } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { useBehovForVeiledning } from '../../contexts/behov-for-veiledning';

import Feedback from '../feedback/feedback';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { BesvarelseResponse, DinSituasjonTilleggsdata } from '../../contexts/besvarelse';
import prettyPrintDato from '../../utils/pretty-print-dato';
import { sporsmalMap, svarMap } from '../../models/sporsmal-og-svar';
import TilleggsData from './tilleggsdata';

import spacing from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

const TEKSTER = {
    nb: {
        'oppfolging.STANDARD_INNSATS': 'Jeg ønsker å klare meg selv',
        'oppfolging.SITUASJONSBESTEMT_INNSATS': 'Jeg ønsker oppfølging fra NAV',
        'oppfolging.IKKE_BESVART': 'Ikke besvart',
    },
    en: {
        'oppfolging.STANDARD_INNSATS': 'Jeg ønsker å klare meg selv',
        'oppfolging.SITUASJONSBESTEMT_INNSATS': 'Jeg ønsker oppfølging fra NAV',
        'oppfolging.IKKE_BESVART': 'Ikke besvart',
    },
};

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

const Oppfolging = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const { behovForVeiledning } = useBehovForVeiledning();

    return (
        <div className={`${spacing.blokkS}`}>
            <div className={`${flexStyles.flex}`}>
                <strong className={spacing.mr05}>Hva slags veiledning ønsker du?</strong>
            </div>
            <div>
                <div className={`${flexStyles.flex} ${flexStyles.alignCenter} ${flexStyles.wrap}`}>
                    <div className={`${spacing.mr05} ${spacing.mb05}`}>
                        {tekst(`oppfolging.${behovForVeiledning?.oppfolging || 'IKKE_BESVART'}`)}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface Svar {
    sporsmal: string;
    svar: string | null;
    verdi: string | null;
    datapunkt: string;
    tilleggsData: DinSituasjonTilleggsdata | null;
}

const repackBesvarelser = (besvarelseData: BesvarelseResponse) => {
    const besvarelse = besvarelseData?.besvarelse || {};
    const besvarelserMedInnhold = Object.keys(besvarelse).map(
        (key) =>
            new Object({
                sporsmal: sporsmalMap[key],
                svar: besvarelse[key].verdi ? svarMap[key][besvarelse[key].verdi] : null,
                verdi: besvarelse[key].verdi || null,
                datapunkt: key,
                tilleggsData: besvarelse[key].tilleggsData || null,
            }) as Svar
    );
    const besvarteBesvarelser = besvarelserMedInnhold.filter((item) => item.svar !== null);
    return besvarteBesvarelser;
};

interface OpplysningerProps {
    besvarelseData: BesvarelseResponse;
}

const RegistreringsOpplysninger = (props: OpplysningerProps) => {
    const { besvarelseData } = props;
    const registreringDato = besvarelseData?.registreringDato ? prettyPrintDato(besvarelseData.registreringDato) : '';
    const opprettetAv = besvarelseData?.opprettetAv && besvarelseData.opprettetAv === 'BRUKER' ? 'Du' : 'NAV';
    const endretDato = besvarelseData?.endretDato ? prettyPrintDato(besvarelseData.endretDato) : '';
    const endretAv = besvarelseData?.endretAv && besvarelseData.endretAv === 'BRUKER' ? 'deg' : 'NAV';
    if (!besvarelseData) return null;
    return (
        <div className={`${spacing.blokkS}`}>
            <div className={`${flexStyles.flex}`}>
                <strong className={spacing.mr05}>Registrering</strong>
            </div>
            <div>
                <div>
                    <div className={`${spacing.mr05} ${spacing.mb05}`}>
                        {opprettetAv} registrerte deg som arbeidssøker {registreringDato}.
                    </div>
                    <div className={`${spacing.mr05} ${spacing.mb05}`}>
                        Opplysningene ble sist endret av {endretAv} {endretDato}.
                    </div>
                </div>
            </div>
        </div>
    );
};

const OpplysningerFraBesvarelsen = (props: OpplysningerProps) => {
    const { besvarelseData } = props;
    const besvarelser = repackBesvarelser(besvarelseData);

    return !besvarelseData ? null : (
        <div className={`${flexStyles.flex} ${flexStyles.flexColumn}`}>
            <div className={spacing.blokkS}>
                <BodyShort>
                    Du kan endre opplysningene du ga ved å kontakte NAV.
                    <br />
                    Veilederen din bruker opplysningene for å vurdere hvor mye veiledning du trenger.
                </BodyShort>
            </div>
            <RegistreringsOpplysninger besvarelseData={besvarelseData} />
            <Oppfolging />
            {besvarelser.map((item, index) => (
                <Opplysning {...item} key={index} />
            ))}
            <Feedback id={'svar-fra-besvarelsen'} />
        </div>
    );
};

export default OpplysningerFraBesvarelsen;
