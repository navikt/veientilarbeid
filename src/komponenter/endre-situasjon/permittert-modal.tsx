import { BodyShort, Button, Heading, Modal, Select, UNSAFE_useDatepicker } from '@navikt/ds-react';
import spacing from '../../spacing.module.css';
import flex from '../../flex.module.css';
import React, { useEffect, useState } from 'react';
import { DinSituasjonSvar } from '../../contexts/brukerregistrering';

enum PermittertSvar {
    OPPSIGELSE,
    ENDRET,
    TILBAKE_I_JOBB,
    NY_JOBB,
    MIDLERTIDIG_JOBB,
    UAVKLART,
    ANNET,
}
const permittertTekster = {
    [PermittertSvar.OPPSIGELSE]: 'Jeg har fått oppsigelse',
    [PermittertSvar.ENDRET]: 'Permitteringsprosenten har endret seg',
    [PermittertSvar.TILBAKE_I_JOBB]: 'Har fått tilbake jobben',
    [PermittertSvar.NY_JOBB]: 'Jeg har fått meg ny jobb',
    [PermittertSvar.MIDLERTIDIG_JOBB]: 'Jeg har fått midlertidig jobb',
    [PermittertSvar.UAVKLART]: 'Arbeidssituasjonen min er uavklart',
    [PermittertSvar.ANNET]: 'Annet',
};
interface PermittertModalProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    amplitudeData: any;
    besvarelse: any | null; //BesvarelseResponse['besvarelse'] | null;
}

const PermittertModal = (props: PermittertModalProps) => {
    const { openModal, setOpenModal, /*amplitudeData,*/ besvarelse } = props;
    const { datepickerProps /*inputProps, selectedDay*/ } = UNSAFE_useDatepicker({
        fromDate: new Date('Jan 01 2022'),
        defaultSelected: new Date(),
    });
    // const { lagreBesvarelse } = useBesvarelse();
    const [valgtSituasjon, settValgtSituasjon] = useState<string>(DinSituasjonSvar.ER_PERMITTERT);
    // const handleLagreEndringer = () => {
    //     loggAktivitet({
    //         aktivitet: 'Lagrer endring i jobbsituasjonen',
    //         komponent: 'Min situasjon',
    //         ...amplitudeData,
    //     });
    //     const payload = {
    //         tekst: 'Jobbsitiasjonen er oppdatert til noe. Endringene gjelder fra en dato',
    //         overskrift: 'Jobbsituasjonen min er endret',
    //         venterPaaSvarFraNav: true,
    //         oppdatering: {
    //             besvarelse: {
    //                 dinSituasjon: {
    //                     verdi: valgtSituasjon,
    //                     gjelderFra: selectedDay?.toISOString(),
    //                 },
    //             },
    //         },
    //     } as BesvarelseRequest;
    //     lagreBesvarelse(payload);
    //     setOpenModal(false);
    // };

    useEffect(() => {
        if (besvarelse) {
            settValgtSituasjon(besvarelse.dinSituasjon.verdi);
        }
    }, [besvarelse]);

    return (
        <Modal
            open={openModal}
            aria-label="Jobbsituasjonen min har endret seg"
            onClose={() => setOpenModal((x) => !x)}
            shouldCloseOnEsc={!datepickerProps.open}
            aria-labelledby="modal-heading"
        >
            <Modal.Content>
                <Heading spacing level="1" size="large" id="modal-heading">
                    Min jobbsituasjonen har endret seg
                </Heading>
                <BodyShort className={spacing.mb1}>Steg 1 / 2</BodyShort>
                <Select
                    className={spacing.mb1}
                    label={'Velg den nye situasjonen som passer deg best'}
                    onChange={(e) => settValgtSituasjon(e.target.value)}
                    value={valgtSituasjon}
                >
                    {Object.keys(permittertTekster).map((situasjon) => (
                        <option key={situasjon} value={situasjon}>
                            {permittertTekster[situasjon]}
                        </option>
                    ))}
                </Select>
                {/*<UNSAFE_DatePicker {...datepickerProps} strategy="fixed">*/}
                {/*    <UNSAFE_DatePicker.Input*/}
                {/*        {...inputProps}*/}
                {/*        className={spacing.mb1}*/}
                {/*        label="Når mottok du oppsigelsen?"*/}
                {/*        defaultValue={new Date().toLocaleDateString()}*/}
                {/*    />*/}
                {/*</UNSAFE_DatePicker>*/}
                {/*<BodyShort className={spacing.mb1}>*/}
                {/*    NAV bruker opplysningene til å vurdere hvor mye veiledning du trenger.*/}
                {/*</BodyShort>*/}
                {/*<Button variant={'primary'} onClick={handleLagreEndringer}>*/}
                {/*    Lagre endring i situasjon*/}
                {/*</Button>*/}
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button variant={'primary'}>Neste</Button>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default PermittertModal;
