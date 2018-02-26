import * as React from 'react';
import {Component} from 'react';

export default class OverlaySide extends Component {
    render() {
        return (
            <div className='overlay__side'>
                {this.props.children}
            </div>
        );
    }
}
