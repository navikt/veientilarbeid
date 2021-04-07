import { Innholdstittel, Undertekst } from 'nav-frontend-typografi';
import { Next, ClockFilled } from '@navikt/ds-icons/cjs';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import React from 'react';

interface PreStateProps {
    tittel: string;
    lesetid: string;
    startIntroCB: () => void;
    hoppOverIntroCB: (element: React.SyntheticEvent) => void;
}

function PreState(props: PreStateProps) {
    return (
        <div className={'kortflate'}>
            <div>
                <Innholdstittel className={'blokk-xs'}>{props.tittel}</Innholdstittel>
                <div className={'lesetid mb-2'}>
                    <ClockFilled className={'mr-05'} />
                    <Undertekst>{props.lesetid} minutter lesetid</Undertekst>
                </div>
                <Hovedknapp mini onClick={props.startIntroCB}>
                    <span>Gå i gang</span>
                    <Next />
                </Hovedknapp>
            </div>
            <Lenke onClick={props.hoppOverIntroCB} href={''}>
                Hopp over intro
            </Lenke>
        </div>
    );
}

export default PreState;
