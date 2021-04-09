import React from 'react';
import { Dialog } from '@navikt/ds-icons/cjs';
import { AmplitudeData, amplitudeLogger } from '../../metrics/amplitude-utils';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import LenkepanelBase from 'nav-frontend-lenkepanel';

interface Lenkepanel14AProps {
    amplitudeData: AmplitudeData;
    href: string;
    children: React.ReactNode;
}

const Lenkepanel14A: React.FC<Lenkepanel14AProps> = (props) => {
    const handleClickInnsending = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling: 'Går til dialogen',
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
            className={'fjorten-A-send-inn-kort'}
        >
            <div className="lenkepanel__innhold">
                <Dialog width="2rem" height="2rem" viewBox="0 0 24 24" />
                <div className="ml-1">
                    <Element>Start en dialog med veileder</Element>
                    <Normaltekst>{props.children}</Normaltekst>
                </div>
            </div>
        </LenkepanelBase>
    );
};

export default Lenkepanel14A;
