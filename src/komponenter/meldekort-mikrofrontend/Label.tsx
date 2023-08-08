import styles from './Label.module.css';
import { BodyShort } from '@navikt/ds-react';

interface Props {
    children?: React.ReactNode;
}

const Label = ({ children }: Props) => {
    return (
        <div className={styles.tag}>
            <BodyShort size="small" className={styles.tekst}>
                {children}
            </BodyShort>
        </div>
    );
};

export default Label;
