import * as React from 'react';
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { Normaltekst } from 'nav-frontend-typografi';
import './tema-lenkepanel.less';
interface TemaLenkepanelProps {
    href: string;
    children: React.ReactNode;
}

const TemaLenkepanel: React.FC<TemaLenkepanelProps> = (props) => {
    const amplitudeData = useAmplitudeData();

    const handleClickInnsending = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: 'meldekort',
            handling: 'Går til innsending av meldekort',
            ...amplitudeData,
        });
    };

    const linkCreator = (props: {}) => {
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        return <a onClick={handleClickInnsending} {...props} />;
    };

    return (
        <LenkepanelBase
            href={props.href}
            tittelProps="undertittel"
            linkCreator={linkCreator}
            border={true}
            className={'tema-lenkepanel'}
        >
            <div className="ml-1">
                <Normaltekst>{props.children}</Normaltekst>
            </div>
        </LenkepanelBase>
    );
};

export default TemaLenkepanel;
