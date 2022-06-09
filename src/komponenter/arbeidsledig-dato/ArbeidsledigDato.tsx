import { BodyShort, Button, Heading, Link, Modal } from '@navikt/ds-react';
import { useArbeidsledigDato } from '../../contexts/arbeidsledig-dato';
import { useFeatureToggleData } from '../../contexts/feature-toggles';

function ArbeidsledigDato(): JSX.Element | null {
    const { visModal, settLukkModal } = useArbeidsledigDato();
    const featureToggleData = useFeatureToggleData();
    const visKomponent = featureToggleData['veientilarbeid.vis-arbeidsledig-dato'];

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
                            settLukkModal();
                        }}
                    >
                        Ønsker ikke å oppgi/vet ikke
                    </Link>
                </BodyShort>
                <Button variant={'secondary'} onClick={settLukkModal}>
                    Lukk
                </Button>
            </Modal.Content>
        </Modal>
    );
}

export default ArbeidsledigDato;
