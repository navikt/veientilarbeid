import * as React from 'react';
import './lenkepanel-med-ikon.less';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import tekster from '../../tekster/tekster';

interface Props {
    href: string;
    alt: string;
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
    overskrift: string;
    ingress?: string;
}

class LenkepanelMedIkon extends React.Component<Props> {
    render() {
        const { href, onClick, className, overskrift, ingress, children } = this.props;

        const linkCreator = (props: {}) => {
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            return <a onClick={onClick} {...props} />;
        };

        return (
            <LenkepanelBase
                className={className}
                href={href}
                tittelProps="undertittel"
                linkCreator={linkCreator}
                border={true}
            >
                <div className="lenkepanel__innhold">
                    <div className="lenkepanel__ikon">{children}</div>
                    <div>
                        <Undertittel>{tekster[overskrift]}</Undertittel>
                        {ingress ? <Normaltekst>{tekster[ingress]}</Normaltekst> : ''}
                    </div>
                </div>
            </LenkepanelBase>
        );
    }
}

export default LenkepanelMedIkon;
