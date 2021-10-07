import * as React from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { trackEvent } from '../utils/googleAnalytics';

type PropTypes = {
    overskrift: JSX.Element | string;
    ingress: JSX.Element | string | null;
    etikett?: string;
    gaCategory?: string;
    gaAction?: string;
    gaUrl?: string;
};

export const LenkepanelMedIkon: React.FC<PropTypes & React.HTMLProps<HTMLAnchorElement>> = ({
    href,
    onClick,
    className,
    overskrift,
    ingress,
    etikett,
    gaCategory,
    gaAction,
    gaUrl,
    children,
}) => {
    const linkCreator = (
        props: React.AnchorHTMLAttributes<HTMLAnchorElement> // eslint-disable-next-line
    ) => <a onClick={onClick} {...props} />;

    return (
        <LenkepanelBase
            className={className}
            href={href}
            onClick={() => trackEvent(gaCategory, gaAction, gaUrl || href)}
            linkCreator={linkCreator}
            border
        >
            <div className="lenkepanel__innhold">
                <div className="lenkepanel__ikon">{children}</div>
                <div>
                    {overskrift}
                    {ingress ? <Normaltekst>{ingress}</Normaltekst> : ''}
                    {etikett ? <Undertekst className="lenkepanel__etikett">{etikett}</Undertekst> : ''}
                </div>
            </div>
        </LenkepanelBase>
    );
};

export default LenkepanelMedIkon;
