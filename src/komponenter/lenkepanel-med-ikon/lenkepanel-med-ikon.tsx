import * as React from 'react';
import './lenkepanel-med-ikon.less';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import LenkepanelBase from 'nav-frontend-lenkepanel';

interface Props {
    href: string;
    alt: string;
    onClick?: () => void;
    className?: string;
    ikon: any; // tslint:disable-line:no-any
    overskrift: string;
    ingress?: string;
}

class LenkepanelMedIkon extends React.Component<Props> {
    render() {
        const {href, alt, onClick, className, ikon, overskrift, ingress} = this.props;

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
                    <div>
                        <Undertittel>
                            <FormattedMessage id={overskrift}/>
                        </Undertittel>
                        {(ingress)
                            ?
                            <Normaltekst>
                                <FormattedMessage id={ingress}/>
                            </Normaltekst>
                            : ""
                        }
                    </div>
                </div>
            </LenkepanelBase>
        );
    }
}

export default LenkepanelMedIkon;
