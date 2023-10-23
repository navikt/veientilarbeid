import styles from '../../innhold/innhold.module.css';
import { Skeleton } from '@navikt/ds-react';
import spacing from '../../spacing.module.css';
import flex from '../../flex.module.css';

const StandardSkeletons = () => {
    return (
        <div className={`${flex.flex} ${flex.center}`}>
            <div className={`${styles.limitCenter} ${spacing.mt1} ${spacing.mb1}`}>
                <Skeleton variant="rounded" height={74} className={`${styles.skeletonLoader}`} />
                <Skeleton variant="rounded" height={270} className={`${styles.skeletonLoader} ${spacing.mt1}`} />
            </div>
        </div>
    );
};

export default StandardSkeletons;
