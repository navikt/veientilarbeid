import * as React from 'react';
import { AmplitudeData, amplitudeLogger } from '../../metrics/amplitude-utils';
import { BodyShort, LinkPanel } from '@navikt/ds-react';
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

    function dialogTekst(antallUlesteDialoger: number) {
        if (antallUlesteDialoger === 0) return 'om du ønsker hjelp';
        return (
            <>
                Du har <span className="dialog__ulesteMeldinger">{antallUlesteDialoger}</span>{' '}
                {antallUlesteDialoger === 1 ? 'ulest melding' : 'uleste meldinger'}
            </>
        );
    }

    return (
        <LinkPanel href={props.href} onClick={handleClickInnsending} className={'blokk-xs'}>
            <LinkPanel.Title>Start en dialog</LinkPanel.Title>
            <LinkPanel.Description>
                <BodyShort>{dialogTekst(props.antallUlesteDialoger)}</BodyShort>
            </LinkPanel.Description>
        </LinkPanel>
    );
};

export default Lenkepanel14A;
