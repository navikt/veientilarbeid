import { useUnderOppfolging } from '../contexts/arbeidssoker';
import { InnloggingsNiva, useAutentiseringData } from '../contexts/autentisering';
import React from 'react';
import InnholdStandard from './innhold-standard';
import InnholdIkkeStandard from './innhold-ikke-standard';

function ArbeidssokerInnhold() {
    const underOppfolging = useUnderOppfolging()?.underoppfolging;
    const innloggingsnivaa = useAutentiseringData().securityLevel;
    const [erStandard, setErStandard] = React.useState(false);
    //TODO: Erstatte med erStandard-kall:
    setErStandard(false);

    if (underOppfolging && innloggingsnivaa === InnloggingsNiva.LEVEL_4 && erStandard) {
        return <InnholdStandard />;
    }
    return <InnholdIkkeStandard />;
}

export default ArbeidssokerInnhold;
