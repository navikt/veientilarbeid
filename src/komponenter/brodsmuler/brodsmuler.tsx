import * as React from 'react';
import { FormattedMessage } from 'react-intl';
const DITTNAVN_PATH = '/dittnav/';

import personSvg from './person.svg';
import './brodsmuler.less';

interface OwnProps {
    tittelId: string;
}

function Brodsmuler({tittelId}: OwnProps) {
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
                    <FormattedMessage id={tittelId}/>
                </li>
            </ol>
        </div>
    );
}

export default Brodsmuler;
