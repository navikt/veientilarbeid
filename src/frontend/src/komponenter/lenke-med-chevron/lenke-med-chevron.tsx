import * as React from 'react';
import { HoyreChevron } from 'nav-frontend-chevron';

interface Props {
    path: string;
}

export default class LenkeMedChevron extends React.Component<Props> {
    render() {
        return (
            <div className="nav-frontend-lenker">
                <a href={this.props.path} className="lenke">
                    {this.props.children}
                </a>
                <HoyreChevron />
            </div>
        );
    }
}
