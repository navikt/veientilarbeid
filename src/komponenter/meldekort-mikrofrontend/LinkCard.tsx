import { ChevronRightIcon } from '@navikt/aksel-icons';
import styles from './LinkCard.module.css';
import { ReactElement } from 'react';

interface Props {
    href: string;
    children: ReactElement;
}

const LinkCard = ({ href, children }: Props) => {
    return (
        <a id={styles.linkcard} className={`tabsPanel navds-link-panel`} href={href}>
            <div className="navds-link-panel__content">{children}</div>
            <ChevronRightIcon id={styles.linkcardChevron} className="navds-link-panel__chevron" />
        </a>
    );
};

export default LinkCard;
