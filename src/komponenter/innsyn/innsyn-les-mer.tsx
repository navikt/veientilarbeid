import { useState } from 'react';
import { ReadMore } from '@navikt/ds-react';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useSprakValg } from '../../contexts/sprak';
import { useArbeidssokerPerioder } from '../../contexts/arbeidssoker';
import { InnloggingsNiva, useAutentiseringData } from '../../contexts/autentisering';

import { loggAktivitet } from '../../metrics/metrics';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import beregnArbeidssokerperioder from '../../lib/beregn-arbeidssokerperioder';
import Opplysninger from './registreringsopplysninger';
import PeriodeOpplysninger from './periodeopplysninger';
import { useBrukerregistreringData } from '../../hooks/use-brukerregistrering-data';
import { useOpplysningerOmArbeidssoker } from '../../contexts/opplysninger-om-arbeidssoker';
import OpplysningerOmArbeidssokerKomponent from './opplysninger-om-arbeidssoker-komponent';

const TEKSTER = {
    nb: {
        header: 'Dine opplysninger fra registreringen',
    },
    en: {
        header: 'See your answers from the registration as job seeker',
    },
};

const InnsynLesMer = () => {
    const [clickedInnsyn, setClickedInnsyn] = useState(false);
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const brukerregistreringData = useBrukerregistreringData();
    const arbeidssokerperiodeData = useArbeidssokerPerioder();
    const { amplitudeData } = useAmplitudeData();
    const { harAktivArbeidssokerperiode, aktivPeriodeStart } = beregnArbeidssokerperioder(arbeidssokerperiodeData);
    const { opprettetDato, manueltRegistrertAv, besvarelse, teksterForBesvarelse, sisteStilling } =
        brukerregistreringData?.registrering || {};

    const visOpplysninger = opprettetDato && besvarelse && teksterForBesvarelse;
    const visPeriodeOpplysninger = harAktivArbeidssokerperiode === 'Ja';
    const autentiseringData = useAutentiseringData();
    const kanViseRegistreringsOpplysningerKomponent =
        autentiseringData.securityLevel === InnloggingsNiva.LEVEL_4 && visOpplysninger;
    const kanVisePeriodeOpplysningerKomponent =
        autentiseringData.securityLevel === InnloggingsNiva.LEVEL_4 && visPeriodeOpplysninger;

    const { opplysningerOmArbeidssoker } = useOpplysningerOmArbeidssoker();
    const visOpplysningerOmArbeidssoker = Boolean(opplysningerOmArbeidssoker[0]);

    const handleClickOpenRegistreringsopplysninger = () => {
        if (!clickedInnsyn) {
            loggAktivitet({ aktivitet: 'Ser opplysninger fra registreringen', ...amplitudeData });
            setClickedInnsyn(true);
        }
    };

    const handleClickOpenPeriodeopplysninger = () => {
        if (!clickedInnsyn) {
            loggAktivitet({ aktivitet: 'Ser opplysninger fra arbeidssøkerperioder', ...amplitudeData });
            setClickedInnsyn(true);
        }
    };

    return kanViseRegistreringsOpplysningerKomponent ? (
        <ReadMore size="medium" header={tekst('header')} onClick={handleClickOpenRegistreringsopplysninger}>
            {visOpplysningerOmArbeidssoker ? (
                <OpplysningerOmArbeidssokerKomponent opplysninger={opplysningerOmArbeidssoker[0]} />
            ) : (
                <Opplysninger
                    opprettetDato={opprettetDato}
                    manueltRegistrertAv={manueltRegistrertAv}
                    besvarelse={besvarelse}
                    teksterForBesvarelse={teksterForBesvarelse}
                    amplitudeData={amplitudeData}
                    sisteStilling={sisteStilling}
                />
            )}
        </ReadMore>
    ) : kanVisePeriodeOpplysningerKomponent ? (
        <ReadMore size="medium" header={tekst('header')} onClick={handleClickOpenPeriodeopplysninger}>
            <PeriodeOpplysninger aktivPeriodeStart={aktivPeriodeStart} amplitudeData={amplitudeData} />
        </ReadMore>
    ) : null;
};

export default InnsynLesMer;
