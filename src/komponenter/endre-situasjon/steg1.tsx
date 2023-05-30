import React from 'react';
import { Button, Select } from '@navikt/ds-react';

import { DinSituasjonSvar, PermittertSvar, permittertTekster } from './permittert-modal';

import spacing from '../../spacing.module.css';
import flex from '../../flex.module.css';

interface Steg1Props {
    valgtSituasjon: PermittertSvar | DinSituasjonSvar;
    settValgtSituasjon: React.Dispatch<React.SetStateAction<PermittertSvar | DinSituasjonSvar>>;
    onClick: () => void;
}
const Steg1 = (props: Steg1Props) => {
    const { valgtSituasjon, settValgtSituasjon, onClick } = props;
    return (
        <>
            <Select
                className={spacing.mb1}
                label={'Velg den nye situasjonen som passer deg best'}
                onChange={(e) => settValgtSituasjon(e.target.value as PermittertSvar)}
                value={valgtSituasjon}
            >
                {Object.keys(permittertTekster).map((situasjon) => (
                    <option key={situasjon} value={situasjon}>
                        {permittertTekster[situasjon]}
                    </option>
                ))}
            </Select>
            <div className={`${flex.flex} ${flex.flexEnd}`}>
                <Button variant={'primary'} onClick={onClick}>
                    Neste
                </Button>
            </div>
        </>
    );
};

export default Steg1;
