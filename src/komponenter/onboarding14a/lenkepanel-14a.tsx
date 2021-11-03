import * as React from 'react';
import { AmplitudeData, amplitudeLogger } from '../../metrics/amplitude-utils';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import './lenkepanel-14a.less';

interface Lenkepanel14AProps {
    amplitudeData: AmplitudeData;
    href: string;
    antallUlesteDialoger: number;
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

    function dialogTekst(antallUlesteDialoger: number) {
        if (antallUlesteDialoger === 0) return 'Ta kontakt om du ønsker hjelp';
        if (antallUlesteDialoger === 1) return `Du har ${antallUlesteDialoger} ulest melding`;
        return `Du har ${antallUlesteDialoger} uleste meldinger`;
    }

    return (
        <LenkepanelBase
            href={props.href}
            tittelProps="undertittel"
            linkCreator={linkCreator}
            border={true}
            className={'fjorten-A-send-inn-kort'}
        >
            <div className="lenkepanel__innhold">
                <div className="dialog__ikon">
                    {props.antallUlesteDialoger > 0 ? (
                        <span className="dialog__ulesteMeldinger">{Math.min(props.antallUlesteDialoger, 99)}</span>
                    ) : null}
                </div>
                <div className="ml-1">
                    <Element>Start dialogen med veileder</Element>
                    <Normaltekst>{dialogTekst(props.antallUlesteDialoger)}</Normaltekst>
                </div>
            </div>
        </LenkepanelBase>
    );
};

export default Lenkepanel14A;
