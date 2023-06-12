import { BodyShort, Checkbox, CheckboxGroup, Loader } from '@navikt/ds-react';

import { BesvarelseResponse, DinSituasjonTilleggsdata, useBesvarelse } from '../../contexts/besvarelse';
import prettyPrintDato from '../../utils/pretty-print-dato';
import { dokumentasjon_url } from '../../url';
import { useProfil } from '../../contexts/profil';
import { useState } from 'react';
import { Profil } from '../../profil';
import { PermittertSvar } from '../../models/endring-av-situasjon';

interface Props {
    verdi: string | null;
    tilleggsData: DinSituasjonTilleggsdata | null;
    visKnapper?: boolean;
}

interface TilleggsDataProps {
    tilleggsData: DinSituasjonTilleggsdata | null;
}

const harSendtInnNyDokumentasjon = (profil: Profil | null, besvarelse: BesvarelseResponse) => {
    const harSendtInnDokumentasjon = Boolean(profil?.aiaHarSendtInnDokumentasjonForEndring);
    if (!harSendtInnDokumentasjon) {
        return false;
    }

    if (besvarelse?.erBesvarelseEndret) {
        const endretDato = new Date(besvarelse.endretTidspunkt!);
        const innsendtDato = new Date(profil?.aiaHarSendtInnDokumentasjonForEndring!);
        return innsendtDato > endretDato;
    }

    return harSendtInnDokumentasjon;
};
function TilleggsData(props: Props) {
    const { verdi, tilleggsData, visKnapper } = props;

    const OPPSIGELSE = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;
        const { lagreProfil, profil } = useProfil();
        const { besvarelse } = useBesvarelse();

        const [visSpinner, settVisSpinner] = useState<boolean>(false);

        if (!tilleggsData) return null;

        const { oppsigelseDato, sisteArbeidsdagDato } = tilleggsData;
        const harSendtInnDokumentasjon = harSendtInnNyDokumentasjon(profil, besvarelse);

        const onChange = async (val: any[]) => {
            if (val.length > 0) {
                try {
                    settVisSpinner(true);
                    await lagreProfil({ aiaHarSendtInnDokumentasjonForEndring: new Date().toISOString() });
                } finally {
                    settVisSpinner(false);
                }
            }
        };
        return (
            <>
                <BodyShort>
                    Oppsigelsen ble mottatt {oppsigelseDato ? prettyPrintDato(oppsigelseDato) : 'på ikke oppgitt dato'}
                </BodyShort>
                <BodyShort>
                    Siste arbeidsdag med lønn {sisteArbeidsdagDato ? prettyPrintDato(sisteArbeidsdagDato) : 'er ukjent'}
                </BodyShort>
                {harSendtInnDokumentasjon && (
                    <BodyShort>
                        Sendte inn dokumentasjon {prettyPrintDato(profil!.aiaHarSendtInnDokumentasjonForEndring!)}
                    </BodyShort>
                )}
                {visKnapper && !harSendtInnDokumentasjon && (
                    <p>
                        Du må dokumentere oppsigelsen.
                        <br />
                        <a className={'navds-button navds-button--primary'} href={dokumentasjon_url}>
                            Gå til opplasting
                        </a>
                        <br />
                        <CheckboxGroup legend={''} onChange={onChange}>
                            {visSpinner ? (
                                <Loader />
                            ) : (
                                <Checkbox checked={harSendtInnDokumentasjon} disabled={harSendtInnDokumentasjon}>
                                    Jeg har sendt inn dokumentasjon
                                </Checkbox>
                            )}
                        </CheckboxGroup>
                    </p>
                )}
            </>
        );
    };

    const ENDRET_PERMITTERINGSPROSENT = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;

        if (!tilleggsData) return null;

        const { permitteringsProsent, gjelderFraDato } = tilleggsData;

        return (
            <>
                <BodyShort>
                    Ny permitteringsprosent er{' '}
                    {permitteringsProsent ? `${permitteringsProsent} prosent` : 'er ikke oppgitt'}
                </BodyShort>
                <BodyShort>
                    Permitteringsprosenten gjelder fra{' '}
                    {gjelderFraDato ? prettyPrintDato(gjelderFraDato) : 'ikke oppgitt dato'}
                </BodyShort>
            </>
        );
    };

    const TILBAKE_TIL_JOBB = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;

        if (!tilleggsData) return null;

        const { forsteArbeidsdagDato } = tilleggsData;

        return (
            <>
                <BodyShort>
                    Du er tilbake på jobb fra{' '}
                    {forsteArbeidsdagDato ? prettyPrintDato(forsteArbeidsdagDato) : 'ikke oppgitt dato'}
                </BodyShort>
            </>
        );
    };

    const NY_JOBB = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;

        if (!tilleggsData) return null;

        const { forsteArbeidsdagDato, sisteArbeidsdagDato } = tilleggsData;

        return (
            <>
                <BodyShort>
                    Første arbeidsdag i ny jobb er{' '}
                    {forsteArbeidsdagDato ? prettyPrintDato(forsteArbeidsdagDato) : 'ikke oppgitt'}
                </BodyShort>
                <BodyShort>
                    Siste arbeidsdag med lønn{' '}
                    {sisteArbeidsdagDato ? prettyPrintDato(sisteArbeidsdagDato) : 'ikke oppgitt'}
                </BodyShort>
            </>
        );
    };

    const MIDLERTIDIG_JOBB = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;

        if (!tilleggsData) return null;

        const { forsteArbeidsdagDato, sisteArbeidsdagDato } = tilleggsData;

        return (
            <>
                <BodyShort>
                    Første arbeidsdag i ny jobb er{' '}
                    {forsteArbeidsdagDato ? prettyPrintDato(forsteArbeidsdagDato) : 'ikke oppgitt'}
                </BodyShort>
                <BodyShort>
                    Siste arbeidsdag med lønn{' '}
                    {sisteArbeidsdagDato ? prettyPrintDato(sisteArbeidsdagDato) : 'ikke oppgitt'}
                </BodyShort>
            </>
        );
    };

    const KONKURS = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;

        if (!tilleggsData) return null;

        const { sisteArbeidsdagDato } = tilleggsData;

        return (
            <>
                <BodyShort>
                    Siste arbeidsdag er {sisteArbeidsdagDato ? prettyPrintDato(sisteArbeidsdagDato) : 'ikke oppgitt'}
                </BodyShort>
            </>
        );
    };

    const SAGT_OPP = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;

        if (!tilleggsData) return null;

        const { oppsigelseDato, sisteArbeidsdagDato } = tilleggsData;

        return (
            <>
                <BodyShort>
                    Du sa opp {oppsigelseDato ? prettyPrintDato(oppsigelseDato) : 'på ikke oppgitt dato'}
                </BodyShort>
                <BodyShort>
                    Siste arbeidsdag med lønn {sisteArbeidsdagDato ? prettyPrintDato(sisteArbeidsdagDato) : 'er ukjent'}
                </BodyShort>
            </>
        );
    };

    const ANNET = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;

        if (!tilleggsData) return null;

        return <BodyShort>{JSON.stringify(tilleggsData)}</BodyShort>;
    };

    if (!tilleggsData || !verdi) return null;

    if (verdi === PermittertSvar.OPPSIGELSE) {
        return <OPPSIGELSE tilleggsData={tilleggsData} />;
    } else if (verdi === PermittertSvar.ENDRET_PERMITTERINGSPROSENT) {
        return <ENDRET_PERMITTERINGSPROSENT tilleggsData={tilleggsData} />;
    } else if (verdi === PermittertSvar.TILBAKE_TIL_JOBB) {
        return <TILBAKE_TIL_JOBB tilleggsData={tilleggsData} />;
    } else if (verdi === PermittertSvar.NY_JOBB) {
        return <NY_JOBB tilleggsData={tilleggsData} />;
    } else if (verdi === PermittertSvar.MIDLERTIDIG_JOBB) {
        return <MIDLERTIDIG_JOBB tilleggsData={tilleggsData} />;
    } else if (verdi === PermittertSvar.KONKURS) {
        return <KONKURS tilleggsData={tilleggsData} />;
    } else if (verdi === PermittertSvar.SAGT_OPP) {
        return <SAGT_OPP tilleggsData={tilleggsData} />;
    } else if (verdi === PermittertSvar.ANNET) {
        return <ANNET tilleggsData={tilleggsData} />;
    }

    return null;
}

export default TilleggsData;
