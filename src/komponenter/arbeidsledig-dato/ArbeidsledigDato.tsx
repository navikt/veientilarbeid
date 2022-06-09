import { fjernQueryParam, hentQueryParam } from '../../utils/query-param-utils';
import { DemoData } from '../../demo/demo-state';
import { BodyShort, Button, Heading, Link, Modal } from '@navikt/ds-react';
import { useCallback, useState } from 'react';

function ArbeidsledigDato(): JSX.Element | null {
    const visKomponent = hentQueryParam(DemoData.VIS_ARBEIDSLEDIG_DATO) === 'true';
    const [visModal, settVisModal] = useState<boolean>(visKomponent);

    const onClose = useCallback(() => {
        fjernQueryParam(DemoData.VIS_ARBEIDSLEDIG_DATO);
        settVisModal(false);
    }, [settVisModal]);

    if (!visKomponent) {
        return null;
    }

    return (
        <Modal open={visModal} onClose={onClose} shouldCloseOnOverlayClick={false}>
            <Modal.Content>
                <Heading spacing={true} size={'medium'} style={{ marginRight: '2em' }}>
                    Når mistet du eller kommer du til å miste jobben?
                </Heading>
                <BodyShort spacing={true}>
                    <input
                        type="date"
                        className="navds-text-field__input"
                        onChange={(e) => console.log('onChange', e.target.value)}
                    />
                </BodyShort>
                <BodyShort spacing={true}>
                    <Link
                        href={'#'}
                        onClick={(e) => {
                            e.preventDefault();
                            onClose();
                        }}
                    >
                        Ønsker ikke å oppgi/vet ikke
                    </Link>
                </BodyShort>
                <Button variant={'secondary'} onClick={onClose}>
                    Lukk
                </Button>
            </Modal.Content>
        </Modal>
    );
}

export default ArbeidsledigDato;
