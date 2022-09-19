import * as React from 'react';
import styles from './innhold.module.css';
const Rad: React.FunctionComponent = ({ children }) => {
    return (
        <div className={`${styles.rad} blokk-s`}>
            <div className={styles.limit}>{children}</div>
        </div>
    );
};

export default Rad;
