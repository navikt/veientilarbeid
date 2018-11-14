import * as React from 'react';
import * as classnames from 'classnames';

import './lenkepanel-med-bilde.less';

interface Props {
    src: string;
    alt: string;
    href: string;
    className?: string;
}

class LenkepanelMedBilde extends React.Component<Props> {
    render() {
        const {src, href, children, alt, className} = this.props;
        return (
            <a href={href} className={classnames('lenkepanel-med-bilde', className)}>
                <div className="lenkepanel-med-bilde__innhold">
                    {children}
                </div>
                <img src={src} alt={alt} className="lenkepanel-med-bilde__bilde" />
            </a>
        );
    }
}

export default LenkepanelMedBilde;
