import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import personSvg from './person.svg';
import './brodsmuler.less';
import tekster from '../../tekster/tekster';

const DITTNAV_PATH = '/dittnav/';

interface BrodsmulerProps {
    brodsmuleId: string;
}

const Brodsmuler: React.FunctionComponent<BrodsmulerProps> = (props: BrodsmulerProps) => {
    return (
        <div className="brodsmuler">
            <img src={personSvg} alt="person-illustrasjon" className="brodsmuler__illustrasjon"/>
            <ol className="brodsmuler__list">
                <li className="brodsmuler__item typo-normal">
                    <Lenke href={DITTNAV_PATH}>
                        Ditt NAV
                    </Lenke>
                </li>
                <li className="brodsmuler__item typo-normal">
                    {tekster[props.brodsmuleId]}
                </li>
            </ol>
        </div>
    );
};

export default Brodsmuler;
