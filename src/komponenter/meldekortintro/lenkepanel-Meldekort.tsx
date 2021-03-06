import React from 'react';
import { AmplitudeData, amplitudeLogger } from '../../metrics/amplitude-utils';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import LenkepanelBase from 'nav-frontend-lenkepanel';

interface LenkepanelMeldekortProps {
    amplitudeData: AmplitudeData;
    href: string;
    children: React.ReactNode;
}

const LenkepanelMeldekort: React.FC<LenkepanelMeldekortProps> = (props) => {
    const handleClickInnsending = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: 'meldekort',
            handling: 'Går til innsending av meldekort',
            ...props.amplitudeData,
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
            className={'meldekort-send-inn-kort'}
        >
            <div className="lenkepanel__innhold">
                <div>
                    <Element>Meldekort</Element>
                    <Normaltekst>{props.children}</Normaltekst>
                </div>
            </div>
        </LenkepanelBase>
    );
};

export default LenkepanelMeldekort;
