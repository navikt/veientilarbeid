import { Innholdstittel, Undertekst, Element } from 'nav-frontend-typografi';
import { ClockFilled, Next } from '@navikt/ds-icons/cjs';
import { Hovedknapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import * as React from 'react';

import InViewport from '../in-viewport/in-viewport';

interface PreStateProps {
    tittel: string;
    lesetid: string;
    viewportTekst: string;
    tematag: string;
    startIntroCB: () => void;
    hoppOverIntroCB: (element: React.SyntheticEvent) => void;
}

function PreState(props: PreStateProps) {
    return (
        <div className={'kortflate'}>
            <div>
                <Element tag="h1">{props.tematag}</Element>
                <Innholdstittel className={'blokk-xs'}>{props.tittel}</Innholdstittel>
                <div className={'lesetid mb-2'}>
                    <ClockFilled className={'mr-05'} />
                    <Undertekst>{props.lesetid} minutter lesetid</Undertekst>
                </div>
                <Hovedknapp className={'mb-2'} mini onClick={props.startIntroCB}>
                    <span>Start introduksjonen</span>
                    <Next />
                </Hovedknapp>
            </div>
            <Lenke onClick={props.hoppOverIntroCB} href={''} className="tracking-wide">
                Hopp over introduksjonen for nå
            </Lenke>
            <InViewport loggTekst={props.viewportTekst} />
        </div>
    );
}

export default PreState;
