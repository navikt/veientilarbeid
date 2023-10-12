import styles from '../../innhold/innhold.module.css';
import { Skeleton } from '@navikt/ds-react';
import spacing from '../../spacing.module.css';

const StandardSkeletons = () => {
    return (
        <div className={`${styles.limit} ${spacing.pa1}`}>
            <Skeleton variant="rounded" height={74} className={`${styles.skeletonWidth}`} />
            <Skeleton variant="rounded" height={270} className={`${styles.skeletonWidth} ${spacing.mt1}`} />
        </div>
    );
};

export default StandardSkeletons;
