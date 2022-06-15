import { BodyShort, Button, Heading, Link, Modal } from '@navikt/ds-react';
import { useArbeidsledigDato } from '../../contexts/arbeidsledig-dato';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useCallback, useEffect, useState } from 'react';
import { fetchToJson } from '../../ducks/api-utils';
import { GJELDER_FRA_DATO_URL, requestConfig } from '../../ducks/api';
import { plussDager } from '../../utils/date-utils';

function ArbeidsledigDato(): JSX.Element | null {
    const { visModal, settLukkModal } = useArbeidsledigDato();
    const featureToggleData = useFeatureToggleData();

    const visKomponent = featureToggleData['veientilarbeid.vis-arbeidsledig-dato'];

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
        try {
            settLagrerDato(true);
            await fetchToJson(GJELDER_FRA_DATO_URL, {
                ...requestConfig(),
                method: 'POST',
                body: JSON.stringify({ dato: gjelderFraDato }),
            });
        } catch (err) {
            console.error(err);
        } finally {
            settLagrerDato(false);
            settLukkModal();
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
                    Når mistet du eller kommer du til å miste jobben?
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
                        onClick={(e) => {
                            e.preventDefault();
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
