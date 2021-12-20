import * as React from 'react';
import { trackEvent } from '../utils/googleAnalytics';
import { LinkPanel } from '@navikt/ds-react';

type PropTypes = {
    overskrift: string;
    ingress: JSX.Element | string | null;
    etikett?: string;
    gaCategory?: string;
    gaAction?: string;
    gaUrl?: string;
    onClick?: () => void;
};

export const LenkepanelMedIkon: React.FC<PropTypes & React.HTMLProps<HTMLAnchorElement>> = ({
    href,
    onClick,
    overskrift,
    ingress,
    etikett,
    gaCategory,
    gaAction,
    gaUrl,
    children,
}) => {
    return (
        <LinkPanel
            className="blokk-xs"
            href={href}
            onClick={() => {
                trackEvent(gaCategory, gaAction, gaUrl || href);
                onClick && onClick();
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridAutoFlow: 'column',
                    gap: 'var(--navds-spacing-8)',
                    alignItems: 'center',
                }}
            >
                <div>{children}</div>
                <div>
                    <LinkPanel.Title>{overskrift}</LinkPanel.Title>
                    {ingress ? <LinkPanel.Description>{ingress}</LinkPanel.Description> : ''}
                    {etikett ? (
                        <LinkPanel.Description className="lenkepanel__etikett">{etikett}</LinkPanel.Description>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </LinkPanel>
    );
};

export default LenkepanelMedIkon;
