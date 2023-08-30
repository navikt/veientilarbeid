import { fetchToJson } from '../../ducks/api-utils';
import { FULLFOER_REAKTIVERING_URL, requestConfig } from '../../ducks/api';
import { Alert, Button } from '@navikt/ds-react';
import { useState } from 'react';
import spacing from '../../spacing.module.css';

const ReaktiveringsKnapp = () => {
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const fullfoerReaktivering = async () => {
        setLoading(true);
        setShowError(false);
        try {
            await fetchToJson(FULLFOER_REAKTIVERING_URL, {
                ...requestConfig(),
                method: 'POST',
            });
            window.location.reload();
        } catch (e) {
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={fullfoerReaktivering} loading={loading}>
                Registrer deg som arbeidssøker
            </Button>
            {showError && (
                <Alert variant={'error'} className={spacing.mt1}>
                    Noe gikk dessverre galt. Prøv igjen.
                </Alert>
            )}
        </>
    );
};

export default ReaktiveringsKnapp;
