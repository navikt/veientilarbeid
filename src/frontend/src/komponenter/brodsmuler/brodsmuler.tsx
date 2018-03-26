import * as React from 'react';
const personSvg = require('./person.svg');
const DITTNAVN_PATH = '/dittnav';

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