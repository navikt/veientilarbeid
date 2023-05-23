import { BodyShort, Button, Heading, Modal, Select, UNSAFE_useDatepicker } from '@navikt/ds-react';
import spacing from '../../spacing.module.css';
import flex from '../../flex.module.css';
import React, { useEffect, useState } from 'react';

enum PermittertSvar {
    OPPSIGELSE = 'OPPSIGELSE',
    ENDRET = 'ENDRET',
    TILBAKE_TIL_JOBB = 'TILBAKE_TIL_JOBB',
    NY_JOBB = 'NY_JOBB',
    MIDLERTIDIG_JOBB = 'MIDLERTIDIG_JOBB',
    UAVKLART = 'UAVKLART',
    ANNET = 'ANNET',
}

const permittertTekster = {
    [PermittertSvar.OPPSIGELSE]: 'Jeg har fått oppsigelse',
    [PermittertSvar.ENDRET]: 'Permitteringsprosenten har endret seg',
    [PermittertSvar.TILBAKE_TIL_JOBB]: 'Skal tilbake til jobben',
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
    valgtSituasjon: PermittertSvar;
    settValgtSituasjon: React.Dispatch<React.SetStateAction<PermittertSvar>>;
    onClick: () => void;
}

interface Steg2Props {
    valgtSituasjon: PermittertSvar;
}

const OPPSIGELSE = () => {
    return <BodyShort>Steg 2 for oppsigelse</BodyShort>;
};

const ENDRET = () => {
    return <BodyShort>Steg 2 for endret</BodyShort>;
};

const TILBAKE_TIL_JOBB = () => {
    return <BodyShort>Steg 2 for tilbake til jobb</BodyShort>;
};

const NY_JOBB = () => {
    return <BodyShort>Steg 2 for ny jobb</BodyShort>;
};

const MIDLERTIDIG_JOBB = () => {
    return <BodyShort>Steg 2 for midlertidig jobb</BodyShort>;
};

const UAVKLART = () => {
    return <BodyShort>Steg 2 for uavklart</BodyShort>;
};

const ANNET = () => {
    return <BodyShort>Steg 2 for annet</BodyShort>;
};

const Steg1 = (props: Steg1Props) => {
    const { valgtSituasjon, settValgtSituasjon, onClick } = props;
    return (
        <>
            <Select
                className={spacing.mb1}
                label={'Velg den nye situasjonen som passer deg best'}
                onChange={(e) => settValgtSituasjon(e.target.value as PermittertSvar)}
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

const Steg2 = (props: Steg2Props) => {
    const { valgtSituasjon } = props;
    if (valgtSituasjon === PermittertSvar.OPPSIGELSE) {
        return <OPPSIGELSE />;
    } else if (valgtSituasjon === PermittertSvar.TILBAKE_TIL_JOBB) {
        return <TILBAKE_TIL_JOBB />;
    } else if (valgtSituasjon === PermittertSvar.MIDLERTIDIG_JOBB) {
        return <MIDLERTIDIG_JOBB />;
    } else if (valgtSituasjon === PermittertSvar.NY_JOBB) {
        return <NY_JOBB />;
    } else if (valgtSituasjon === PermittertSvar.ENDRET) {
        return <ENDRET />;
    } else if (valgtSituasjon === PermittertSvar.ANNET) {
        return <ANNET />;
    } else if (valgtSituasjon === PermittertSvar.UAVKLART) {
        return <UAVKLART />;
    } else {
        return <ANNET />;
    }
};

const PermittertModal = (props: PermittertModalProps) => {
    const { openModal, setOpenModal, /*amplitudeData,*/ besvarelse } = props;
    const { datepickerProps /*inputProps, selectedDay*/ } = UNSAFE_useDatepicker({
        fromDate: new Date('Jan 01 2022'),
        defaultSelected: new Date(),
    });
    const [aktivSide, settAktivSide] = React.useState<number>(1);
    const [valgtSituasjon, settValgtSituasjon] = useState<PermittertSvar>(PermittertSvar.OPPSIGELSE);

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
            return <Steg2 valgtSituasjon={valgtSituasjon} />;
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
                <Heading level="2" size="medium">
                    Fortell oss hva som har endret seg slik at vi kan veilede deg videre
                </Heading>
                <BodyShort className={spacing.mb1}>Steg {aktivSide} / 2</BodyShort>
                <Innhold />
            </Modal.Content>
        </Modal>
    );
};

export default PermittertModal;
