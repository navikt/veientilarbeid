import {
    OpplysningerOmArbeidssoker,
    SPORSMAL_TEKSTER,
    SporsmalId,
    Svar,
    Utdanningsnivaa,
} from '@navikt/arbeidssokerregisteret-utils';
import { BodyShort } from '@navikt/ds-react';
import spacing from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import prettyPrintDato from '../../utils/pretty-print-dato';
import Feedback from '../feedback/feedback';
import Oppfolging from './oppfolging';

type OpplysningProps = { sporsmal: string; svar: Svar };
const Opplysning = (props: OpplysningProps) => {
    const tekst = lagHentTekstForSprak(SPORSMAL_TEKSTER, useSprakValg().sprak);
    const { sporsmal, svar } = props;

    return (
        <div className={spacing.blokkS}>
            <BodyShort>
                <strong>{tekst(sporsmal)}</strong>
                <br />
                {tekst(svar as string) ?? svar}
            </BodyShort>
        </div>
    );
};

function mapNuskodeTilUtdannignsnivaa(nus: string) {
    switch (nus) {
        case '0':
            return Utdanningsnivaa.INGEN_UTDANNING;
        case '2':
            return Utdanningsnivaa.GRUNNSKOLE;
        case '3':
            return Utdanningsnivaa.VIDEREGAENDE_GRUNNUTDANNING;
        case '4':
            return Utdanningsnivaa.VIDEREGAENDE_FAGBREV_SVENNEBREV;
        case '6':
            return Utdanningsnivaa.HOYERE_UTDANNING_1_TIL_4;
        case '7':
            return Utdanningsnivaa.HOYERE_UTDANNING_5_ELLER_MER;
        default:
            return Utdanningsnivaa.INGEN_SVAR;
    }
}

function getSisteStillingSvar(opplysninger: OpplysningerOmArbeidssoker) {
    if (opplysninger.arbeidserfaring.harHattArbeid === 'NEI') {
        return 'Ingen yrkeserfaring';
    }

    const detaljer = opplysninger.jobbsituasjon[0]?.detaljer;
    return detaljer?.stilling || 'Ikke oppgitt';
}

function mapOpplysninger(opplysninger: OpplysningerOmArbeidssoker): OpplysningProps[] {
    const result: OpplysningProps[] = [
        {
            sporsmal: SporsmalId.dinSituasjon,
            svar: opplysninger.jobbsituasjon[0].beskrivelse,
        },
        {
            sporsmal: SporsmalId.sisteStilling,
            svar: getSisteStillingSvar(opplysninger),
        },
        {
            sporsmal: SporsmalId.utdanning,
            svar: mapNuskodeTilUtdannignsnivaa(opplysninger.utdanning.nus),
        },
        {
            sporsmal: SporsmalId.utdanningBestatt,
            svar: opplysninger.utdanning.bestaatt,
        },
        {
            sporsmal: SporsmalId.utdanningGodkjent,
            svar: opplysninger.utdanning.godkjent,
        },
        {
            sporsmal: SporsmalId.helseHinder,
            svar: opplysninger.helse.helseTilstandHindrerArbeid,
        },
    ];

    return result;
}

type Props = {
    opplysninger: OpplysningerOmArbeidssoker;
};
function OpplysningerOmArbeidssokerKomponent(props: Props) {
    const { opplysninger } = props;
    const opprettetDato = opplysninger.sendtInnAv.tidspunkt;
    const erRegistrertAvSluttbruker = opplysninger.sendtInnAv.utfoertAv.type === 'SLUTTBRUKER';
    const besvarelser = mapOpplysninger(opplysninger);

    return (
        <div className={`${flexStyles.flex} ${flexStyles.flexColumn}`}>
            <div className={spacing.blokkS}>
                <BodyShort>
                    Du kan endre opplysningene du ga ved å kontakte NAV.
                    <br />
                    Veilederen din bruker opplysningene for å vurdere hvor mye veiledning du trenger.
                </BodyShort>
            </div>
            <div className={`${spacing.blokkS}`}>
                <div className={`${flexStyles.flex}`}>
                    <strong className={spacing.mr05}>Registrering</strong>
                </div>
                <div>
                    <div className={`${flexStyles.flex} ${flexStyles.alignCenter} ${flexStyles.wrap}`}>
                        <div className={`${spacing.mr05} ${spacing.mb05}`}>
                            {erRegistrertAvSluttbruker ? 'Du' : 'NAV'} registrerte deg som arbeidssøker{' '}
                            {prettyPrintDato(opprettetDato)}
                        </div>
                    </div>
                </div>
            </div>
            <Oppfolging />
            {besvarelser.map((item, index) => (
                <Opplysning {...item} key={index} />
            ))}
            <Feedback id={'svar-fra-registreringen'} />
        </div>
    );
}

export default OpplysningerOmArbeidssokerKomponent;
