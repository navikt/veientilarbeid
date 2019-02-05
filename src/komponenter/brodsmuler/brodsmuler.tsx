import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import personSvg from './person.svg';
import './brodsmuler.less';

const DITTNAV_PATH = '/dittnav/';

interface BrodsmulerProps {
    brodsmuleId: string;
}

const Brodsmuler: React.SFC<BrodsmulerProps> = (props: BrodsmulerProps) => {
    return (
        <div className="brodsmuler">
            <img src={personSvg} alt="person-illustrasjon" className="brodsmuler__illustrasjon"/>
            <ol className="brodsmuler__list">
                <li className="brodsmuler__item typo-normal">
                    <a href={DITTNAV_PATH} className="lenke">
                        Ditt NAV
                    </a>
                </li>
                <li className="brodsmuler__item typo-normal">
                    <FormattedMessage id={props.brodsmuleId}/>
                </li>
            </ol>
        </div>
    );
};

export default Brodsmuler;
