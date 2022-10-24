import React, { useState } from 'react';
import { BodyShort, Button, HelpText, Select } from '@navikt/ds-react';

import { useUnderOppfolging } from '../../contexts/arbeidssoker';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useSprakValg } from '../../contexts/sprak';
import { BehovForVeiledningValg, useBehovForVeiledning } from '../../contexts/behov-for-veiledning';

import { loggAktivitet } from '../../metrics/metrics';
import { dialogLenke } from '../../innhold/lenker';
import { Besvarelse, SisteStilling, Svar } from '../../contexts/brukerregistrering';
import prettyPrintDato from '../../utils/pretty-print-dato';
import Feedback from '../feedback/feedback';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';

import spacing from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

const TEKSTER = {
    nb: {
        'oppfolging.KLARE_SEG_SELV': 'Jeg ønsker å klare meg selv',
        'oppfolging.ONSKER_OPPFOLGING': 'Jeg ønsker oppfølging fra NAV',
        'oppfolging.IKKE_BESVART': 'Ikke besvart',
    },
    en: {
        'oppfolging.KLARE_SEG_SELV': 'Jeg ønsker å klare meg selv',
        'oppfolging.ONSKER_OPPFOLGING': 'Jeg ønsker oppfølging fra NAV',
        'oppfolging.IKKE_BESVART': 'Ikke besvart',
    },
};

/**
 * Dette er en fiks fordi det en periode ble postet data fra registreringen med en litt annen signatur
 * Den henter data fra sisteStilling og viser under teksterForBesvarelse
 */

function fiksSisteStilling(innholdStilling: string, innholdSituasjon: string, stilling: SisteStilling): Svar {
    const harAldriJobbet = innholdStilling === 'HAR_IKKE_HATT_JOBB' || innholdSituasjon === 'ALDRI_HATT_JOBB';
    const sporsmalId = 'sisteStilling';
    const sporsmal = 'Hva er din siste jobb?';
    const svar = harAldriJobbet ? 'Ingen yrkeserfaring' : stilling?.label || 'Ikke oppgitt';
    return {
        sporsmalId,
        sporsmal,
        svar,
    };
}

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
    const { behovForVeiledning, lagreBehovForVeiledning } = useBehovForVeiledning();

    const [visSelect, setVisSelect] = useState(false);
    const [selectedVerdi, setSelectedVerdi] = useState<BehovForVeiledningValg>(
        behovForVeiledning?.oppfolging || 'IKKE_BESVART'
    );

    const aapneSelect = () => {
        setVisSelect(true);
    };

    const setSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedVerdi(e.target.value as BehovForVeiledningValg);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setVisSelect(false);
        setSelectedVerdi(selectedVerdi);
        lagreBehovForVeiledning(selectedVerdi);
    };

    const OppfolgingOption = (props: { value: BehovForVeiledningValg }) => {
        return <option value={props.value}>{tekst(`oppfolging.${props.value}`)}</option>;
    };

    return (
        <div className={`${spacing.blokkS}`}>
            <div className={`${flexStyles.flex}`}>
                <strong className={spacing.mr05}>Hva slags oppfølging ønsker du?</strong>
                <HelpText title="Hva betyr dette?">
                    Her kan du velge om du ønsker oppfølging og veiledning fra NAV i forbindelse med jobbsøking eller om
                    du ønsker å klare deg selv.
                </HelpText>
            </div>
            <div>
                {visSelect ? (
                    <form onSubmit={handleSubmit}>
                        <div className={`${flexStyles.flex} ${flexStyles.wrap}`}>
                            <Select
                                label="Hva slags oppfølging ønsker du?"
                                hideLabel
                                onChange={setSelected}
                                value={selectedVerdi}
                                className={`${spacing.mr05} ${spacing.mb05}`}
                                style={{ flex: '0 0 auto' }}
                            >
                                {selectedVerdi === 'IKKE_BESVART' && <OppfolgingOption value={'IKKE_BESVART'} />}
                                <OppfolgingOption value={'KLARE_SEG_SELV'} />
                                <OppfolgingOption value={'ONSKER_OPPFOLGING'} />
                            </Select>
                            <Button variant={'secondary'} type={'submit'} className={spacing.mb05}>
                                Lagre svar
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className={`${flexStyles.flex} ${flexStyles.alignCenter} ${flexStyles.wrap}`}>
                        <div className={`${spacing.mr05} ${spacing.mb05}`}>
                            {tekst(`oppfolging.${behovForVeiledning?.oppfolging || 'IKKE_BESVART'}`)}
                        </div>
                        <Button variant={'secondary'} onClick={aapneSelect} className={spacing.mb05}>
                            Endre
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

const repackBesvarelser = (besvarelse: Besvarelse, teksterForBesvarelse: Array<Svar>, sisteStilling: SisteStilling) => {
    const sisteStillingInnhold = besvarelse['sisteStilling'] || '';
    const dinSituasjonInnhold = besvarelse['dinSituasjon'] || '';
    const tekster = teksterForBesvarelse || [];
    // Legger data fra sisteStilling først i teksterForBesvarelse så den oppdaterte plukkes opp av find i alleSvar
    if (tekster.length > 0) {
        tekster.unshift(fiksSisteStilling(sisteStillingInnhold, dinSituasjonInnhold, sisteStilling));
    }
    const besvarelserMedInnhold = Object.keys(besvarelse).filter((item) => besvarelse[item]);
    const alleSvar = besvarelserMedInnhold.map((item) => tekster.find((svar) => svar.sporsmalId === item));
    const svarMedInnhold = alleSvar.filter((svar) => svar !== undefined);
    return svarMedInnhold;
};

const Opplysninger = (props: any) => {
    const { opprettetDato, manueltRegistrertAv, besvarelse, teksterForBesvarelse, amplitudeData, sisteStilling } =
        props;
    const besvarelser = repackBesvarelser(besvarelse, teksterForBesvarelse, sisteStilling);
    const underoppfolging = useUnderOppfolging()?.underoppfolging;
    const kanViseKomponent = underoppfolging;
    const featuretoggles = useFeatureToggleData();
    const visKlareSegSelvSporsmal = featuretoggles['veientilarbeid.bruk-klarer-seg-selv'];

    const handleDialogClick = () => {
        loggAktivitet({ aktivitet: 'Går til endre registreringsopplysninger', ...amplitudeData });
    };

    return !kanViseKomponent ? null : (
        <div className={`${flexStyles.flex} ${flexStyles.flexColumn}`}>
            <div className={spacing.blokkS}>
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
            {visKlareSegSelvSporsmal && <Oppfolging />}
            {besvarelser.map((item, index) => (
                <Opplysning {...item} key={index} />
            ))}
            <Feedback id={'svar-fra-registreringen'} />
        </div>
    );
};

export default Opplysninger;
