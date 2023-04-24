import flexStyles from '../../flex.module.css';
import spacing from '../../spacing.module.css';
import { BodyShort, Button, Select } from '@navikt/ds-react';
import prettyPrintDato from '../../utils/pretty-print-dato';
import { DinSituasjonSvar } from '../../contexts/brukerregistrering';
import { useState } from 'react';

interface Props {
    startDato: string;
    manueltRegistrertAv?: object | null;
}

const dinSituasjonTekster = {
    [DinSituasjonSvar.MISTET_JOBBEN]: 'Har mistet eller kommer til å miste jobben',
    [DinSituasjonSvar.HAR_SAGT_OPP]: 'Har sagt opp eller kommer til å si opp',
    [DinSituasjonSvar.DELTIDSJOBB_VIL_MER]: 'Har deltidsjobb, men vil jobbe mer',
    [DinSituasjonSvar.ALDRI_HATT_JOBB]: 'Har aldri vært i jobb',
    [DinSituasjonSvar.VIL_BYTTE_JOBB]: 'Har jobb, men vil bytte',
    [DinSituasjonSvar.JOBB_OVER_2_AAR]: 'Har ikke vært i jobb de siste 2 årene',
    [DinSituasjonSvar.ER_PERMITTERT]: 'Er permittert eller kommer til å bli permittert',
    [DinSituasjonSvar.USIKKER_JOBBSITUASJON]: 'Er usikker på jobbsituasjonen min',
    [DinSituasjonSvar.AKKURAT_FULLFORT_UTDANNING]: 'Har akkurat fullført utdanning, militærtjeneste eller annet',
    [DinSituasjonSvar.VIL_FORTSETTE_I_JOBB]: 'Har jobb og ønsker å fortsette i den jobben jeg er i',
};

function EndreSituasjon(props: Props) {
    const { startDato, manueltRegistrertAv } = props;
    const [valgtSituasjon, settValgtSituasjon] = useState<string>(DinSituasjonSvar.ER_PERMITTERT);

    return (
        <div className={`${flexStyles.flex} ${flexStyles.flexColumn}`}>
            <div className={spacing.blokkS}>
                <BodyShort className={spacing.mb1}>
                    {manueltRegistrertAv ? 'NAV' : 'Du'} registrerte deg som permitert arbeidssøker{' '}
                    {prettyPrintDato(startDato)}.
                    <br />
                    Dersom du ikke lengre er permitert kan du endre det her.
                </BodyShort>
                <BodyShort>
                    <Select
                        className={spacing.mb1}
                        label={'Velg situasjonen som passer deg best'}
                        defaultValue={DinSituasjonSvar.ER_PERMITTERT}
                        onChange={(e) => settValgtSituasjon(e.target.value)}
                    >
                        {Object.keys(dinSituasjonTekster).map((situasjon) => (
                            <option key={situasjon} value={situasjon}>
                                {dinSituasjonTekster[situasjon]}
                            </option>
                        ))}
                    </Select>
                    <Button variant={'primary'} onClick={() => console.log('Valgt situasjon', valgtSituasjon)}>
                        Lagre endring i situasjon
                    </Button>
                </BodyShort>
            </div>
        </div>
    );
}

export default EndreSituasjon;
