import * as React from 'react';
import styles from './innhold.module.css';
import spacingStyles from '../spacing.module.css';

type RadProps = {
    children?: React.ReactNode;
};

const Rad = (props: RadProps) => {
    return (
        <div className={`${styles.rad} ${spacingStyles.blokkS}`}>
            <div className={styles.limit}>{props.children}</div>
        </div>
    );
};

export default Rad;
