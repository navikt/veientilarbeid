import { useCallback, useEffect, useState } from 'react';
import { BodyShort, Button, Heading, Link, Modal } from '@navikt/ds-react';

import { useArbeidsledigDato } from '../../contexts/arbeidsledig-dato';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useBrukerregistreringData, DinSituasjonSvar } from '../../contexts/brukerregistrering';
import { fetchToJson } from '../../ducks/api-utils';
import { GJELDER_FRA_DATO_URL, requestConfig } from '../../ducks/api';
import { plussDager } from '../../utils/date-utils';
import { loggAktivitet } from '../../metrics/metrics';
import { useAmplitudeData } from '../../contexts/amplitude-context';

function ArbeidsledigDato(): JSX.Element | null {
    const amplitudeData = useAmplitudeData();
    const { visModal, settLukkModal } = useArbeidsledigDato();
    const featureToggleData = useFeatureToggleData();
    const registreringData = useBrukerregistreringData();
    const brukerregistreringData = registreringData?.registrering ?? null;
    const dinSituasjon = brukerregistreringData?.besvarelse.dinSituasjon || DinSituasjonSvar.INGEN_VERDI;
    const harMistetJobben = dinSituasjon === DinSituasjonSvar.MISTET_JOBBEN;

    const visKomponent = featureToggleData['veientilarbeid.vis-arbeidsledig-dato'] && harMistetJobben;

    const [gjelderFraDato, settGjelderFraDato] = useState<string | null>(null);
    const [lagrerDato, settLagrerDato] = useState<boolean>(false);

    const hentGjelderFraDato = async () => {
        try {
            const { dato } = await fetchToJson(GJELDER_FRA_DATO_URL, requestConfig());
            settGjelderFraDato(dato);
        } catch (err) {
            console.error(err);
        }
    };

    const onSubmit = useCallback(async () => {
        gjelderFraDato == null
            ? loggAktivitet({ aktivitet: 'Setter dato for siste dag med lønn', ...amplitudeData })
            : loggAktivitet({ aktivitet: 'Endrer dato for siste dag med lønn', ...amplitudeData });
        try {
            settLagrerDato(true);
            await fetchToJson(GJELDER_FRA_DATO_URL, {
                ...requestConfig(),
                method: 'POST',
                body: JSON.stringify({ dato: gjelderFraDato }),
            });
        } catch (error) {
            console.error(error);
        } finally {
            settLagrerDato(false);
            settLukkModal();
            //TODO: Sjekke hvordan vi oppdaterer parentkomponenten når dato blir endret
        }
    }, [gjelderFraDato, settLukkModal]);

    useEffect(() => {
        if (visModal) {
            hentGjelderFraDato();
        }
    }, [visModal]);

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

export default ArbeidsledigDato;
