import styles from '../../innhold/innhold.module.css';
import { Skeleton } from '@navikt/ds-react';
import spacing from '../../spacing.module.css';

const StandardSkeletons = () => {
    return (
        <div className={styles.limit}>
            <Skeleton variant="rounded" height={74} width="60%" className={spacing.mt1} />
            <Skeleton variant="rounded" height={270} width="60%" className={spacing.mt1} />
        </div>
    );
};

export default StandardSkeletons;
