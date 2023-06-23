import React from 'react';
import { Button, Select } from '@navikt/ds-react';

import { DinSituasjonSvar } from '../../contexts/brukerregistrering';
import { PermittertSvar, permittertTekster } from '../../models/endring-av-situasjon';

import spacing from '../../spacing.module.css';
import flex from '../../flex.module.css';

type SituasjonSvar = PermittertSvar | DinSituasjonSvar;

interface Steg1Props {
    valgtSituasjon: SituasjonSvar | undefined | '-1';
    opprinneligSituasjon: SituasjonSvar | undefined;
    settValgtSituasjon: React.Dispatch<React.SetStateAction<SituasjonSvar>>;
    onClick: () => void;
}

const standardSvarSomSkalFjernes: SituasjonSvar[] = [DinSituasjonSvar.HAR_SAGT_OPP, DinSituasjonSvar.MISTET_JOBBEN];

const Steg1 = (props: Steg1Props) => {
    const { valgtSituasjon, settValgtSituasjon, onClick } = props;

    const svarTekster = permittertTekster;
    return (
        <>
            <Select
                className={spacing.mb1}
                label={'Velg den nye situasjonen som passer deg best'}
                onChange={(e) => settValgtSituasjon(e.target.value as SituasjonSvar)}
                value={valgtSituasjon}
            >
                <option disabled={true} value={'-1'}>
                    Velg blant situasjonene nedenfor
                </option>
                {Object.keys(svarTekster).map((situasjon) => {
                    if (standardSvarSomSkalFjernes.includes(situasjon as SituasjonSvar)) return null;
                    return (
                        <option key={situasjon} value={situasjon}>
                            {svarTekster[situasjon]}
                        </option>
                    );
                })}
            </Select>
            <div className={`${flex.flex} ${flex.flexEnd}`}>
                <Button variant={'primary'} onClick={onClick} disabled={valgtSituasjon === '-1'}>
                    Neste
                </Button>
            </div>
        </>
    );
};

export default Steg1;
