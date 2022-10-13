import { useCallback, useEffect, useState } from 'react';
import { BodyShort, Button, Heading, Link, Modal } from '@navikt/ds-react';

import { useGjelderFraDatoModal } from '../../contexts/gjelder-fra-dato-modal';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useBrukerregistreringData, DinSituasjonSvar } from '../../contexts/brukerregistrering';
import { plussDager } from '../../utils/date-utils';
import { loggAktivitet } from '../../metrics/metrics';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useGjelderFraDato } from '../../contexts/gjelder-fra-dato';

function GjelderFraDato(): JSX.Element | null {
    const { amplitudeData } = useAmplitudeData();
    const { visModal, settLukkModal } = useGjelderFraDatoModal();
    const featureToggleData = useFeatureToggleData();
    const registreringData = useBrukerregistreringData();
    const brukerregistreringData = registreringData?.registrering ?? null;
    const dinSituasjon = brukerregistreringData?.besvarelse.dinSituasjon || DinSituasjonSvar.INGEN_VERDI;
    const harMistetJobben = dinSituasjon === DinSituasjonSvar.MISTET_JOBBEN;

    const visKomponent = featureToggleData['veientilarbeid.vis-gjelder-fra-dato'] && harMistetJobben;

    const [gjelderFraDato, settGjelderFraDato] = useState<string | null>(null);
    const [lagrerDato, settLagrerDato] = useState<boolean>(false);
    const { dato: lagretGjelderFraDato, lagreGjelderFraDato } = useGjelderFraDato();

    const onSubmit = useCallback(async () => {
        gjelderFraDato == null
            ? loggAktivitet({ aktivitet: 'Setter dato for siste dag med lønn', ...amplitudeData })
            : loggAktivitet({ aktivitet: 'Endrer dato for siste dag med lønn', ...amplitudeData });
        try {
            settLagrerDato(true);
            await lagreGjelderFraDato(gjelderFraDato);
        } catch (error) {
            console.error(error);
        } finally {
            settLagrerDato(false);
            settLukkModal();
        }
    }, [gjelderFraDato, amplitudeData, lagreGjelderFraDato, settLukkModal]);

    useEffect(() => {
        if (visModal) {
            settGjelderFraDato(lagretGjelderFraDato);
        }
    }, [visModal, lagretGjelderFraDato]);

    if (!visKomponent || !visModal) {
        return null;
    }

    return (
        <Modal open={visModal} onClose={settLukkModal} shouldCloseOnOverlayClick={false}>
            <Modal.Content>
                <Heading spacing={true} size={'medium'} style={{ marginRight: '2em' }}>
                    Hvilken dag er den siste dagen med lønn?
                </Heading>
                <BodyShort spacing={true}>
                    <input
                        style={{ width: 'initial' }}
                        type="date"
                        value={gjelderFraDato || ''}
                        className="navds-text-field__input"
                        min={plussDager(new Date(), -365).toISOString().substring(0, 10)}
                        max={plussDager(new Date(), 365).toISOString().substring(0, 10)}
                        onChange={(e) => settGjelderFraDato(e.target.value)}
                    />
                </BodyShort>
                <BodyShort spacing={true}>
                    <Link
                        href={'#'}
                        onClick={(event) => {
                            event.preventDefault();
                            loggAktivitet({
                                aktivitet: 'Ønsker ikke oppgi dato for siste dag med lønn',
                                ...amplitudeData,
                            });
                            settLukkModal();
                        }}
                    >
                        Ønsker ikke å oppgi/vet ikke
                    </Link>
                </BodyShort>
                <Button variant={'secondary'} onClick={onSubmit} loading={lagrerDato}>
                    Lagre
                </Button>
            </Modal.Content>
        </Modal>
    );
}

export default GjelderFraDato;
