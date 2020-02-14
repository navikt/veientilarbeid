import * as React from 'react';
import { Power2, TweenLite } from 'gsap';

interface DialogFillProps {
    messagesCount: number;
}

class DialogFill extends React.Component<DialogFillProps> {

    componentDidMount() {
        const messagesCount = this.props.messagesCount;

        if (messagesCount > 0) {
            const notification = document.querySelector('.notification circle');
            const text = document.querySelector('.notification text');
            TweenLite.to(notification, 0.8, {attr: {r: '10', fill: '#c30000'}, delay: 0.5, ease: Power2.easeInOut});
            TweenLite.to(text, 0.8, {opacity: 1, delay: 0.7, ease: Power2.easeInOut});
        }
    }

    render() {
        const messagesCount = this.props.messagesCount;

        const xPos = messagesCount > 9 ? 23.6 : 26.8;
        return (
            <div className="notification">
                <svg version="1.1" id="Filled_Version" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px"
                    y="0px" width="40px" height="32px" viewBox="0 0 40 32" enableBackground="new 0 0 40 32" xmlSpace="preserve">
                    <svg x="0" y="8">
                        <path fill="#0067C5" d="M16.5,8.75c0.476,0,0.941,0.045,1.399,0.115C17.964,8.486,18,8.094,18,7.685c0-4.1-4.038-7.435-9-7.435
                            c-4.963,0-9,3.335-9,7.435c0,1.962,0.855,3.826,2.36,5.178l-1.794,3.14c-0.105,0.185-0.083,0.416,0.057,0.576
                            C0.72,16.689,0.858,16.75,1,16.75c0.062,0,0.125-0.012,0.186-0.035l4.839-1.937c0.435,0.124,0.887,0.218,1.348,0.281
                            c0.022,0.002,0.065-0.005,0.075,0.004c0.075,0,0.319-0.002,0.678-0.022C8.805,11.527,12.359,8.75,16.5,8.75z"/>
                        <path fill="#0067C5" d="M16.5,9.75c-4.065,0-7.5,2.977-7.5,6.5c0,3.355,2.878,6.224,6.434,6.572c0.001,0,0.004,0,0.006,0.002
                            c1.296,0.123,2.572-0.116,3.572-0.536c0.314,0.118,3.496,1.312,3.813,1.43c0.184,0.071,0.405,0.024,0.547-0.134
                            c0.138-0.152,0.167-0.373,0.076-0.557c-0.276-0.554-1.069-2.137-1.325-2.65C23.327,19.289,24,17.868,24,16.25
                            C24,12.727,20.565,9.75,16.5,9.75z"/>
                    </svg>
                    <circle fill="#ffffff" cx="30.0" cy="10.0" r="3"/>
                    <text x={xPos} y="14.4" fill="#ffffff" opacity="1">{messagesCount > 99 ? 99 : messagesCount}</text>
                </svg>
            </div>
        );
    }
}

export default DialogFill;
