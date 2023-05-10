import { BodyShort } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { useBehovForVeiledning } from '../../contexts/behov-for-veiledning';

import Feedback from '../feedback/feedback';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';

import spacing from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';
import { BesvarelseResponse } from '../../contexts/besvarelse';

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
    const { sporsmal, svar } = props;
    return (
        <div className={spacing.blokkS}>
            <BodyShort>
                <strong>{sporsmal}</strong>
                <br />
                {svar}
            </BodyShort>
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
}

const repackBesvarelser = (besvarelseData: BesvarelseResponse) => {
    const besvarelse = besvarelseData?.besvarelse || {};
    const besvarelserMedInnhold = Object.keys(besvarelse).map(
        (key) =>
            new Object({
                sporsmal: key,
                svar: besvarelse[key].verdi,
            }) as Svar
    );
    const besvarteBesvarelser = besvarelserMedInnhold.filter((item) => item.svar !== null);
    return besvarteBesvarelser;
};

interface OpplysningerProps {
    besvarelseData: BesvarelseResponse;
}

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
            <div className={`${spacing.blokkS}`}>
                <div className={`${flexStyles.flex}`}>
                    <strong className={spacing.mr05}>Registrering</strong>
                </div>
                <div>
                    <div className={`${flexStyles.flex} ${flexStyles.alignCenter} ${flexStyles.wrap}`}>
                        <div className={`${spacing.mr05} ${spacing.mb05}`}>opprettet dato og opprettet av</div>
                    </div>
                </div>
            </div>
            <Oppfolging />
            {besvarelser.map((item, index) => (
                <Opplysning {...item} key={index} />
            ))}
            <Feedback id={'svar-fra-besvarelsen'} />
        </div>
    );
};

export default OpplysningerFraBesvarelsen;
