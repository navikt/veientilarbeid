import * as React from 'react';
const DITTNAVN_PATH = '/dittnav/';

import personSvg from './person.svg';
import './brodsmuler.less';

function Brodsmuler() {
    return (
        <div className="brodsmuler">
            <img src={personSvg} alt="person-illustrasjon" className="brodsmuler__illustrasjon"/>
            <ol className="brodsmuler__list">
                <li className="brodsmuler__item typo-normal">
                    <a href={DITTNAVN_PATH} className="lenke">
                        Ditt NAV
                    </a>
                </li>
                <li className="brodsmuler__item typo-normal">
                    Veien til arbeid
                </li>
            </ol>
        </div>
    );
}

export default Brodsmuler;
