import { fetchToJson } from '../../ducks/api-utils';
import { FULLFOER_REAKTIVERING_URL, requestConfig } from '../../ducks/api';
import { Alert, Button, Link } from '@navikt/ds-react';
import { useState } from 'react';
import spacing from '../../spacing.module.css';
import { loggAktivitet } from '../../metrics/metrics';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';

interface Props {
    aktivitet: string;
}

const ReaktiveringsKnapp = ({ aktivitet }: Props) => {
    const { amplitudeData } = useAmplitudeData();
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const fullfoerReaktivering = async () => {
        setLoading(true);
        setShowError(false);
        loggAktivitet({ aktivitet, ...amplitudeData });
        try {
            await fetchToJson(FULLFOER_REAKTIVERING_URL, {
                ...requestConfig(),
                method: 'POST',
                body: JSON.stringify({}),
            });
            loggAktivitet({ aktivitet: 'Bruker ble reaktivert', ...amplitudeData });
            window.location.reload();
        } catch (e) {
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={fullfoerReaktivering} loading={loading} disabled={showError}>
                Registrer deg som arbeidssøker
            </Button>
            {showError && (
                <Alert variant={'error'} className={spacing.mt1}>
                    Noe gikk dessverre galt.
                    <br />
                    Prøv igjen litt senere, eller{' '}
                    <Link
                        href="https://www.nav.no/person/kontakt-oss/"
                        onClick={() =>
                            loggAktivitet({ aktivitet: 'Går til chat fra reaktivering feilmelding', ...amplitudeData })
                        }
                    >
                        kontakt oss
                    </Link>{' '}
                    hvis problemet vedvarer.
                </Alert>
            )}
        </>
    );
};

export default ReaktiveringsKnapp;
