import { BodyShort, Button } from '@navikt/ds-react';
import { useState } from 'react';

import { useUnderOppfolging } from '../../contexts/arbeidssoker';
import { loggAktivitet } from '../../metrics/metrics';
import { dialogLenke } from '../../innhold/lenker';
import TilleggsData from '../innsyn/tilleggsdata';
import { svarMap } from '../../models/sporsmal-og-svar';
import PermittertModal from './permittert-modal';
import LesIgjenModal from './les-igjen-modal';

import spacing from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

const Sammendrag = (props: any) => {
    const [openEndreModal, setOpenEndreModal] = useState(false);
    const [openLesIgjenModal, setOpenLesIgjenModal] = useState(false);
    const { amplitudeData, besvarelse, erBesvarelseEndret } = props;
    const underoppfolging = useUnderOppfolging()?.underoppfolging;
    const kanViseKomponent = underoppfolging;

    const handleDialogClick = () => {
        loggAktivitet({
            aktivitet: 'Går til endre andre opplysninger',
            komponent: 'Min situasjon',
            ...amplitudeData,
        });
    };

    const handleEndreModalOpen = (event: any) => {
        event.preventDefault();
        loggAktivitet({
            aktivitet: 'Åpner modal for å endre jobbsituasjon',
            komponent: 'Min situasjon',
            ...amplitudeData,
        });
        setOpenEndreModal(true);
    };

    const handleLesIgjenModalOpen = (event: any) => {
        event.preventDefault();
        loggAktivitet({
            aktivitet: 'Åpner modal for å lese veiledning igjen',
            komponent: 'Min situasjon',
            ...amplitudeData,
        });
        setOpenLesIgjenModal(true);
    };

    return !kanViseKomponent ? null : (
        <div className={`${flexStyles.flex} ${flexStyles.flexColumn}`}>
            <div className={spacing.blokkS}>
                <div className={spacing.mb1}>
                    Din jobbsituasjon: {besvarelse ? svarMap.dinSituasjon[besvarelse.dinSituasjon.verdi] : 'Ukjent'}
                    <br />
                    <TilleggsData
                        verdi={besvarelse ? besvarelse.dinSituasjon.verdi : null}
                        tilleggsData={besvarelse ? besvarelse.dinSituasjon.tilleggsData : null}
                        visKnapper={true}
                    />
                </div>
                <BodyShort className={`${spacing.mb1} ${spacing.mt1}`}>
                    <Button variant={erBesvarelseEndret ? 'secondary' : 'primary'} onClick={handleEndreModalOpen}>
                        Jobbsituasjonen min har endret seg
                    </Button>
                </BodyShort>
                <PermittertModal
                    openModal={openEndreModal}
                    setOpenModal={setOpenEndreModal}
                    besvarelse={besvarelse}
                    amplitudeData={amplitudeData}
                />
                <LesIgjenModal
                    openModal={openLesIgjenModal}
                    setOpenModal={setOpenLesIgjenModal}
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
                {erBesvarelseEndret && (
                    <BodyShort className={`${spacing.mb1} ${spacing.mt1}`}>
                        <a href={''} onClick={handleLesIgjenModalOpen}>
                            Les om igjen hva denne endringen betyr for deg
                        </a>
                        .
                    </BodyShort>
                )}
            </div>
        </div>
    );
};

export default Sammendrag;
