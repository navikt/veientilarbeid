import { BodyShort, Button, Heading, ReadMore } from '@navikt/ds-react';
import { useState } from 'react';

import { useUnderOppfolging } from '../../contexts/arbeidssoker';
import { loggAktivitet } from '../../metrics/metrics';
import TilleggsData from '../innsyn/tilleggsdata';
import { svarMap } from '../../models/sporsmal-og-svar';
import PermittertModal from './permittert-modal';

import spacing from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';
import BesvarelseLesMer from '../innsyn/besvarelse-les-mer';
import SendInnDokumentasjon from './send-inn-dokumentasjon';
import { dialogLenke } from '../../innhold/lenker';

const Sammendrag = (props: any) => {
    const [openEndreModal, setOpenEndreModal] = useState(false);
    const [harLestOmEndringer, setHarLestOmEndringer] = useState<boolean>(false);

    const { amplitudeData, besvarelse } = props;
    const kanViseKomponent = useUnderOppfolging()?.underoppfolging;

    const handleEndreModalOpen = (event: any) => {
        event.preventDefault();
        loggAktivitet({
            aktivitet: 'Åpner modal for å endre jobbsituasjon',
            komponent: 'Min situasjon',
            ...amplitudeData,
        });
        setOpenEndreModal(true);
    };

    const handleLesOmEndringer = () => {
        if (!harLestOmEndringer) {
            loggAktivitet({
                aktivitet: 'Leser om hvorfor gjøre endringer',
                komponent: 'Min situasjon',
                ...amplitudeData,
            });
            setHarLestOmEndringer(true);
        }
    };

    const handleDialogClick = () => {
        loggAktivitet({
            aktivitet: 'Går til endre andre opplysninger',
            komponent: 'Min situasjon',
            ...amplitudeData,
        });
    };

    return !kanViseKomponent ? null : (
        <div className={`${flexStyles.flex} ${flexStyles.flexColumn}`}>
            <div className={spacing.blokkS}>
                <div className={spacing.mb1}>
                    <Heading size="small">
                        {besvarelse ? svarMap.dinSituasjon[besvarelse.dinSituasjon.verdi] : 'Min jobbsituasjon: ukjent'}
                    </Heading>
                    <TilleggsData
                        verdi={besvarelse ? besvarelse.dinSituasjon.verdi : null}
                        tilleggsData={besvarelse ? besvarelse.dinSituasjon.tilleggsData : null}
                    />
                    <BesvarelseLesMer />
                </div>
                {besvarelse && <SendInnDokumentasjon aktuellSituasjon={besvarelse.dinSituasjon.verdi} />}
                <BodyShort className={`${spacing.mb1} ${spacing.mt1}`}>
                    <Button variant={'secondary'} onClick={handleEndreModalOpen}>
                        Jobbsituasjonen min har endret seg
                    </Button>
                </BodyShort>
                <ReadMore
                    header={'Når og hvorfor skal jeg si ifra om endringer?'}
                    className={spacing.mb1}
                    onClick={handleLesOmEndringer}
                >
                    <BodyShort className={spacing.mb1}>
                        Hvis det skjer endringer i jobbsituasjonen din, kan det påvirke oppfølgingen eller utbetalingen
                        du får fra NAV.
                    </BodyShort>
                    <BodyShort className={spacing.mb1}>
                        Endringer i jobbsituasjonen kan eksempelvis være at du ikke lenger er permittert eller at
                        bedriften har gått konkurs.
                    </BodyShort>
                    <BodyShort>
                        Om andre forhold i situasjonen din endrer seg, som for eksempel inntekten din eller
                        familiesituasjonen, må du{' '}
                        <a href={dialogLenke} onClick={handleDialogClick}>
                            gi beskjed til NAV
                        </a>{' '}
                        og beskrive hva som har skjedd.
                    </BodyShort>
                </ReadMore>
                <PermittertModal
                    openModal={openEndreModal}
                    setOpenModal={setOpenEndreModal}
                    besvarelse={besvarelse}
                    amplitudeData={amplitudeData}
                />
            </div>
        </div>
    );
};

export default Sammendrag;
