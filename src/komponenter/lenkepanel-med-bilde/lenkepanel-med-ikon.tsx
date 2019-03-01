import * as React from 'react';
import './lenkepanel-med-bilde.less';
import { Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { klikkPaSokLedigeStillinger } from '../../metrics';
import LenkepanelBase from 'nav-frontend-lenkepanel';

interface Props {
    href: string;
    alt: string;
    onClick?: () => void; // tslint:disable-line:no-any
    className?: string;

    ikon: any; // tslint:disable-line:no-any
}

class LenkepanelMedBilde extends React.Component<Props> {
    render() {
        const {href, alt, onClick, className, onClick} = this.props;

        const linkCreator = (props: {}) => {
            return <a onClick={klikkPaSokLedigeStillinger} {...props}/>;
        };

        return (
            <LenkepanelBase
                href={href}
                tittelProps="undertittel"
                linkCreator={() => linkCreator}
                border={true}
            >
                <div className="lenkepanel__innhold">
                    <img
                        src={ikon}
                        className="lenkepanel__ikon"
                        alt="stillingsok-ikon"
                    />
                    <Systemtittel className="lenkepanel__tittel">
                        <FormattedMessage id="stillingsok-overskrift"/>
                    </Systemtittel>
                </div>
            </LenkepanelBase>
        );
    }
}

export default LenkepanelMedBilde;
