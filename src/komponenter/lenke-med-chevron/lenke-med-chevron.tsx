import * as React from 'react';
import { HoyreChevron } from 'nav-frontend-chevron';
import * as classnames from 'classnames';

import './lenke-med-chevron.less';

interface Props {
    path: string;
    className?: string;
}

export default class LenkeMedChevron extends React.Component<Props> {
    render() {
        return (
            <div className={classnames('nav-frontend-lenker', this.props.className)}>
                <a href={this.props.path} className="lenke">
                    {this.props.children}
                </a>
                <HoyreChevron />
            </div>
        );
    }
}
