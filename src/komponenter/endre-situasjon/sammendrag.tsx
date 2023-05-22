import { BodyShort, Button } from '@navikt/ds-react';
import { useState } from 'react';

import { useUnderOppfolging } from '../../contexts/arbeidssoker';
import { loggAktivitet } from '../../metrics/metrics';
import { dialogLenke } from '../../innhold/lenker';
import prettyPrintDato from '../../utils/pretty-print-dato';

import spacing from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';
import PermittertModal from './permittert-modal';

const Sammendrag = (props: any) => {
    const [openModal, setOpenModal] = useState(false);
    const { startDato, manueltRegistrertAv, amplitudeData, besvarelse } = props;
    const underoppfolging = useUnderOppfolging()?.underoppfolging;
    const kanViseKomponent = underoppfolging;

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

    return !kanViseKomponent ? null : (
        <div className={`${flexStyles.flex} ${flexStyles.flexColumn}`}>
            <div className={spacing.blokkS}>
                <BodyShort className={spacing.mb1}>
                    {manueltRegistrertAv ? 'NAV' : 'Du'} registrerte deg som permittert arbeidssøker{' '}
                    {prettyPrintDato(startDato)}.
                    <br />
                </BodyShort>
                <BodyShort className={`${spacing.mb1} ${spacing.mt1}`}>
                    <Button variant="primary" onClick={handleModalOpen}>
                        Jobbsituasjonen min har endret seg
                    </Button>
                </BodyShort>
                <PermittertModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    besvarelse={besvarelse}
                    amplitudeData={amplitudeData}
                />
                <BodyShort>
                    Om andre forhold i situasjonen din har endret seg må du{' '}
                    <a href={dialogLenke} onClick={handleDialogClick}>
                        gi beskjed til NAV
                    </a>
                    .
                </BodyShort>
            </div>
        </div>
    );
};

export default Sammendrag;
