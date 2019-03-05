import * as React from 'react';
import './lenkepanel-med-ikon.less';
import { Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import LenkepanelBase from 'nav-frontend-lenkepanel';

interface Props {
    href: string;
    alt: string;
    onClick?: () => void;
    className?: string;
    ikon: any; // tslint:disable-line:no-any
    lenketekst: string;
}

class LenkepanelMedIkon extends React.Component<Props> {
    render() {
        const {href, alt, onClick, className, ikon, lenketekst} = this.props;

        const linkCreator = (props: {}) => {
            return <a onClick={onClick} {...props}/>;
        };

        return (
            <LenkepanelBase
                className={className}
                href={href}
                tittelProps="undertittel"
                linkCreator={linkCreator}
                border={true}
            >
                <div className="lenkepanel__innhold">
                    <div className="lenkepanel__ikon">
                        <img
                            src={ikon}
                            className="ikon"
                            alt={alt}
                        />
                    </div>
                    <Systemtittel className="lenkepanel__tittel">
                        <FormattedMessage id={lenketekst}/>
                    </Systemtittel>
                </div>
            </LenkepanelBase>
        );
    }
}
export default LenkepanelMedIkon;
