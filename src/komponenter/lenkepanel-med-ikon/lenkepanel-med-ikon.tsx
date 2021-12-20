import * as React from 'react';
import './lenkepanel-med-ikon.less';
import tekster from '../../tekster/tekster';
import { LinkPanel } from '@navikt/ds-react';

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
        const { href, onClick, overskrift, ingress, children } = this.props;

        return (
            <LinkPanel href={href} onClick={onClick} className="blokk-xs">
                <div
                    style={{
                        display: 'grid',
                        gridAutoFlow: 'column',
                        gap: 'var(--navds-spacing-8)',
                        alignItems: 'center',
                    }}
                >
                    {children}
                    <div>
                        <LinkPanel.Title>{tekster[overskrift]}</LinkPanel.Title>
                        {ingress ? <LinkPanel.Description>{tekster[ingress]}</LinkPanel.Description> : ''}
                    </div>
                </div>
            </LinkPanel>
        );
    }
}

export default LenkepanelMedIkon;
