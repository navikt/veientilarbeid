import * as React from 'react';
import styles from './innhold.module.css';
import spacingStyles from '../spacing.module.css';

const Rad: React.FunctionComponent = ({ children }) => {
    return (
        <div className={`${styles.rad} ${spacingStyles.blokkS}`}>
            <div className={styles.limit}>{children}</div>
        </div>
    );
};

export default Rad;
