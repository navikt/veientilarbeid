import { BodyShort } from '@navikt/ds-react';

import { DinSituasjonTilleggsdata } from '../../contexts/besvarelse';
import prettyPrintDato from '../../utils/pretty-print-dato';

interface Props {
    verdi: string | null;
    tilleggsData: DinSituasjonTilleggsdata | null;
}

interface TilleggsDataProps {
    tilleggsData: DinSituasjonTilleggsdata | null;
}

function TilleggsData(props: Props) {
    const { verdi, tilleggsData } = props;

    const OPPSIGELSE = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;

        if (!tilleggsData) return null;

        const { oppsigelseDato, sisteArbeidsdagDato } = tilleggsData;

        return (
            <>
                <BodyShort>
                    Du mottok oppsigelsen {oppsigelseDato ? prettyPrintDato(oppsigelseDato) : 'på ikke oppgitt dato'}
                </BodyShort>
                <BodyShort>
                    Siste arbeidsdag med lønn {sisteArbeidsdagDato ? prettyPrintDato(sisteArbeidsdagDato) : 'er ukjent'}
                </BodyShort>
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
                    Siste arbeidsdag {sisteArbeidsdagDato ? prettyPrintDato(sisteArbeidsdagDato) : 'ikke oppgitt'}
                </BodyShort>
            </>
        );
    };

    const UAVKLART = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;

        if (!tilleggsData) return null;

        return <BodyShort>{JSON.stringify(tilleggsData)}</BodyShort>;
    };

    const ANNET = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;

        if (!tilleggsData) return null;

        return <BodyShort>{JSON.stringify(tilleggsData)}</BodyShort>;
    };

    if (!tilleggsData || !verdi) return null;

    if (verdi === 'OPPSIGELSE') {
        return <OPPSIGELSE tilleggsData={tilleggsData} />;
    } else if (verdi === 'ENDRET_PERMITTERINGSPROSENT') {
        return <ENDRET_PERMITTERINGSPROSENT tilleggsData={tilleggsData} />;
    } else if (verdi === 'TILBAKE_TIL_JOBB') {
        return <TILBAKE_TIL_JOBB tilleggsData={tilleggsData} />;
    } else if (verdi === 'NY_JOBB') {
        return <NY_JOBB tilleggsData={tilleggsData} />;
    } else if (verdi === 'MIDLERTIDIG_JOBB') {
        return <MIDLERTIDIG_JOBB tilleggsData={tilleggsData} />;
    } else if (verdi === 'KONKURS') {
        return <KONKURS tilleggsData={tilleggsData} />;
    } else if (verdi === 'UAVKLART') {
        return <UAVKLART tilleggsData={tilleggsData} />;
    } else if (verdi === 'ANNET') {
        return <ANNET tilleggsData={tilleggsData} />;
    }

    return null;
}

export default TilleggsData;
