import React from 'react';
import { Button, Select } from '@navikt/ds-react';

import spacing from '../../spacing.module.css';
import flex from '../../flex.module.css';
import { DinSituasjonSvar } from '../../contexts/brukerregistrering';
import { dinSituasjonSvarTekster, PermittertSvar, permittertTekster } from '../../models/endring-av-situasjon';

type SituasjonSvar = PermittertSvar | DinSituasjonSvar;

interface Steg1Props {
    valgtSituasjon: SituasjonSvar | undefined;
    opprinneligSituasjon: SituasjonSvar | undefined;
    settValgtSituasjon: React.Dispatch<React.SetStateAction<SituasjonSvar>>;
    onClick: () => void;
}

const Steg1 = (props: Steg1Props) => {
    const { opprinneligSituasjon, valgtSituasjon, settValgtSituasjon, onClick } = props;
    const filterSituasjon = valgtSituasjon !== undefined ? valgtSituasjon : opprinneligSituasjon;
    const erPermittertSvar =
        (filterSituasjon !== undefined && filterSituasjon === DinSituasjonSvar.ER_PERMITTERT) ||
        (filterSituasjon !== undefined && Object.keys(permittertTekster).includes(filterSituasjon));
    const svarTekster = erPermittertSvar ? permittertTekster : dinSituasjonSvarTekster;

    return (
        <>
            <Select
                className={spacing.mb1}
                label={'Velg den nye situasjonen som passer deg best'}
                onChange={(e) => settValgtSituasjon(e.target.value as SituasjonSvar)}
                value={valgtSituasjon}
            >
                <option disabled={true} selected={true}></option>
                {Object.keys(svarTekster).map((situasjon) => (
                    <option key={situasjon} value={situasjon}>
                        {svarTekster[situasjon]}
                    </option>
                ))}
            </Select>
            <div className={`${flex.flex} ${flex.flexEnd}`}>
                <Button variant={'primary'} onClick={onClick} disabled={!valgtSituasjon}>
                    Neste
                </Button>
            </div>
        </>
    );
};

export default Steg1;
