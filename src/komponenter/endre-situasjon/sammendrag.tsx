import { BodyLong, BodyShort, Button, Heading, ReadMore } from '@navikt/ds-react';
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

const Sammendrag = (props: any) => {
    const [openEndreModal, setOpenEndreModal] = useState(false);
    const [harLestOmEndringer, setHarLestOmEndringer] = useState<boolean>(false);

    const { amplitudeData, besvarelse } = props;
    const underoppfolging = useUnderOppfolging()?.underoppfolging;
    const kanViseKomponent = underoppfolging;

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

    return !kanViseKomponent ? null : (
        <div className={`${flexStyles.flex} ${flexStyles.flexColumn}`}>
            <div className={spacing.blokkS}>
                <div className={spacing.mb1}>
                    <Heading size="medium">
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
                    <BodyLong>
                        Hvis det skjer endringer i situasjonen din, kan det påvirke oppfølgingen eller utbetalingen du
                        får fra NAV. Det er derfor viktig å gi beskjed om endringen.
                        <br />
                        Det kan være endringer i din inntekt, familiesituasjon, jobbsituasjon, og så videre.
                    </BodyLong>
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
