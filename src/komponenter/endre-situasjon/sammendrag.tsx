import { BodyShort, Button, Heading, Modal, Select, UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react';
import { useEffect, useState } from 'react';

import { useUnderOppfolging } from '../../contexts/arbeidssoker';
import { useBesvarelse, BesvarelseRequest } from '../../contexts/besvarelse';

import { DinSituasjonSvar } from '../../contexts/brukerregistrering';
import { loggAktivitet } from '../../metrics/metrics';
import { dialogLenke } from '../../innhold/lenker';
import prettyPrintDato from '../../utils/pretty-print-dato';

import spacing from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

const dinSituasjonTekster = {
    [DinSituasjonSvar.MISTET_JOBBEN]: 'Har mistet eller kommer til å miste jobben',
    [DinSituasjonSvar.HAR_SAGT_OPP]: 'Har sagt opp eller kommer til å si opp',
    [DinSituasjonSvar.DELTIDSJOBB_VIL_MER]: 'Har deltidsjobb, men vil jobbe mer',
    [DinSituasjonSvar.ALDRI_HATT_JOBB]: 'Har aldri vært i jobb',
    [DinSituasjonSvar.VIL_BYTTE_JOBB]: 'Har jobb, men vil bytte',
    [DinSituasjonSvar.JOBB_OVER_2_AAR]: 'Har ikke vært i jobb de siste 2 årene',
    [DinSituasjonSvar.ER_PERMITTERT]: 'Er permittert eller kommer til å bli permittert',
    [DinSituasjonSvar.USIKKER_JOBBSITUASJON]: 'Er usikker på jobbsituasjonen min',
    [DinSituasjonSvar.AKKURAT_FULLFORT_UTDANNING]: 'Har akkurat fullført utdanning, militærtjeneste eller annet',
    [DinSituasjonSvar.VIL_FORTSETTE_I_JOBB]: 'Har jobb og ønsker å fortsette i den jobben jeg er i',
};

const Sammendrag = (props: any) => {
    const [openModal, setOpenModal] = useState(false);
    const [valgtSituasjon, settValgtSituasjon] = useState<string>(DinSituasjonSvar.ER_PERMITTERT);
    const { startDato, manueltRegistrertAv, amplitudeData, endret, endretAv, besvarelse } = props;
    const underoppfolging = useUnderOppfolging()?.underoppfolging;
    const kanViseKomponent = underoppfolging;
    const { lagreBesvarelse } = useBesvarelse();

    const { datepickerProps, inputProps, selectedDay } = UNSAFE_useDatepicker({
        fromDate: new Date('Jan 01 2022'),
        defaultSelected: new Date(),
    });

    const handleDialogClick = () => {
        loggAktivitet({
            aktivitet: 'Går til endre andre opplysninger',
            komponent: 'Min situasjon',
            ...amplitudeData,
        });
    };

    const handleModalOpen = (event: any) => {
        event.preventDefault();
        loggAktivitet({
            aktivitet: 'Åpner modal for å endre jobbsituasjon',
            komponent: 'Min situasjon',
            ...amplitudeData,
        });
        setOpenModal(true);
    };

    const handleLagreEndringer = () => {
        loggAktivitet({
            aktivitet: 'Lagrer endring i jobbsituasjonen',
            komponent: 'Min situasjon',
            ...amplitudeData,
        });
        const payload = {
            tekst: 'Jobbsitiasjonen er oppdatert til noe. Endringene gjelder fra en dato',
            overskrift: 'Jobbsituasjonen min er endret',
            venterPaaSvarFraNav: true,
            oppdatering: {
                besvarelse: {
                    dinSituasjon: {
                        verdi: valgtSituasjon,
                        gjelderFra: selectedDay?.toISOString(),
                    },
                },
            },
        } as BesvarelseRequest;
        lagreBesvarelse(payload);
        setOpenModal(false);
    };

    useEffect(() => {
        if (besvarelse) {
            settValgtSituasjon(besvarelse.dinSituasjon.verdi);
        }
    }, [besvarelse]);
    // TODO: legge inn useEffect for å koble modal til appElement

    return !kanViseKomponent ? null : (
        <div className={`${flexStyles.flex} ${flexStyles.flexColumn}`}>
            <div className={spacing.blokkS}>
                <BodyShort className={spacing.mb1}>
                    {manueltRegistrertAv ? 'NAV' : 'Du'} registrerte deg som arbeidssøker {prettyPrintDato(startDato)}.
                    <br />
                </BodyShort>
                <BodyShort>Din nåværende jobbsituasjon er "{dinSituasjonTekster[valgtSituasjon]}".</BodyShort>
                {endret && endretAv && (
                    <BodyShort>
                        Sist oppdatert {prettyPrintDato(endret)} av {endretAv === 'BRUKER' ? 'deg' : 'NAV'}
                    </BodyShort>
                )}
                <BodyShort className={`${spacing.mb1} ${spacing.my1}`}>
                    <a href="" onClick={handleModalOpen}>
                        Jobbsituasjonen min har endret seg
                    </a>
                </BodyShort>
                <Modal
                    open={openModal}
                    aria-label="Jobbsituasjonen min har endret seg"
                    onClose={() => setOpenModal((x) => !x)}
                    shouldCloseOnEsc={!datepickerProps.open}
                    aria-labelledby="modal-heading"
                >
                    <Modal.Content>
                        <Heading spacing level="1" size="large" id="modal-heading">
                            Jobbsituasjonen min har endret seg
                        </Heading>
                        <Select
                            className={spacing.mb1}
                            label={'Velg situasjonen som passer deg best nå'}
                            onChange={(e) => settValgtSituasjon(e.target.value)}
                            value={valgtSituasjon}
                        >
                            {Object.keys(dinSituasjonTekster).map((situasjon) => (
                                <option key={situasjon} value={situasjon}>
                                    {dinSituasjonTekster[situasjon]}
                                </option>
                            ))}
                        </Select>
                        <UNSAFE_DatePicker {...datepickerProps} strategy="fixed">
                            <UNSAFE_DatePicker.Input
                                {...inputProps}
                                className={spacing.mb1}
                                label="Når skjedde eller skjer endringen?"
                                defaultValue={new Date().toLocaleDateString()}
                            />
                        </UNSAFE_DatePicker>
                        <Button variant={'primary'} onClick={handleLagreEndringer}>
                            Lagre endring i situasjon
                        </Button>
                    </Modal.Content>
                </Modal>
                <BodyShort>
                    Om andre forhold i situasjonen din har endret seg må{' '}
                    <a href={dialogLenke} onClick={handleDialogClick}>
                        gi beskjed til veilederen din
                    </a>
                    .
                </BodyShort>
            </div>
        </div>
    );
};

export default Sammendrag;
