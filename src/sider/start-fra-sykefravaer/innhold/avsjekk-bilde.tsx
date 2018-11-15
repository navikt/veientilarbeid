import * as React from 'react';
import { erIE } from '../../../utils/ie-test';

import './avsjekk-bilde.less';

export default class AvsjekkBilde extends React.Component {

    render() {
        return (
            <svg
                role="img"
                className={`avsjekk__bilde ${erIE() && 'erIE'}`}
                aria-label="Laster innhold"
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 128"
            >
                <polyline
                    className={erIE() ? '' : 'hake'}
                    stroke="#ccdee6"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="27.9,57.8 60.9,90.7 121.6,11.1 "
                />
                <path
                    className={erIE() ? '' : 'sirkel'}
                    stroke="#ccdee6"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    d="M91.88,12.56A59,59,0,1,0,120.4,48.4"
                />
            </svg>
        );
    }
}
