import { BodyShort, Button, Heading, Modal, Select, UNSAFE_useDatepicker } from '@navikt/ds-react';
import spacing from '../../spacing.module.css';
import flex from '../../flex.module.css';
import React, { useEffect, useState } from 'react';

enum PermittertSvar {
    OPPSIGELSE = 'OPPSIGELSE',
    ENDRET = 'ENDRET',
    TILBAKE_I_JOBB = 'TILBAKE_I_JOBB',
    NY_JOBB = 'NY_JOBB',
    MIDLERTIDIG_JOBB = 'MIDLERTIDIG_JOBB',
    UAVKLART = 'UAVKLART',
    ANNET = 'ANNET',
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

interface Steg1Props {
    valgtSituasjon: string;
    settValgtSituasjon: React.Dispatch<React.SetStateAction<string>>;
    onClick: () => void;
}
const Steg1 = (props: Steg1Props) => {
    const { valgtSituasjon, settValgtSituasjon, onClick } = props;
    return (
        <>
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
            <div className={`${flex.flex} ${flex.flexEnd}`}>
                <Button variant={'primary'} onClick={onClick}>
                    Neste
                </Button>
            </div>
        </>
    );
};

const Steg2 = () => {
    return (
        <>
            <h1>Steg 2</h1>
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
            {/*<div className={`${flex.flex} ${flex.flexEnd}`}>*/}
            {/*    <Button variant={'primary'} onClick={handleLagreEndringer}>*/}
            {/*        Lagre endring i situasjon*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </>
    );
};
const PermittertModal = (props: PermittertModalProps) => {
    const { openModal, setOpenModal, /*amplitudeData,*/ besvarelse } = props;
    const { datepickerProps /*inputProps, selectedDay*/ } = UNSAFE_useDatepicker({
        fromDate: new Date('Jan 01 2022'),
        defaultSelected: new Date(),
    });
    const [aktivSide, settAktivSide] = React.useState<number>(1);
    const [valgtSituasjon, settValgtSituasjon] = useState<string>(PermittertSvar.OPPSIGELSE);

    // const { lagreBesvarelse } = useBesvarelse();

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

    useEffect(() => {
        settAktivSide(1);
    }, [openModal]);

    const Innhold = () => {
        if (aktivSide === 1) {
            return (
                <Steg1
                    valgtSituasjon={valgtSituasjon}
                    settValgtSituasjon={settValgtSituasjon}
                    onClick={() => settAktivSide(2)}
                />
            );
        }

        if (aktivSide === 2) {
            return <Steg2 />;
        }

        return null;
    };

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
                <BodyShort className={spacing.mb1}>Steg {aktivSide} / 2</BodyShort>
                <Innhold />
            </Modal.Content>
        </Modal>
    );
};

export default PermittertModal;
