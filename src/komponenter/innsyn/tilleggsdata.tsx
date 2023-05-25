import { BodyShort } from '@navikt/ds-react';

import { DinSituasjonTilleggsdata } from '../../contexts/besvarelse';
// import prettyPrintDato from "../../utils/pretty-print-dato"

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
        return <BodyShort>{JSON.stringify(tilleggsData)}</BodyShort>;
    };

    const ENDRET_PERMITTERINGSPROSENT = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;
        return <BodyShort>{JSON.stringify(tilleggsData)}</BodyShort>;
    };

    const TILBAKE_TIL_JOBB = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;
        return <BodyShort>{JSON.stringify(tilleggsData)}</BodyShort>;
    };

    const NY_JOBB = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;
        return <BodyShort>{JSON.stringify(tilleggsData)}</BodyShort>;
    };

    const MIDLERTIDIG_JOBB = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;
        return <BodyShort>{JSON.stringify(tilleggsData)}</BodyShort>;
    };

    const UAVKLART = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;
        return <BodyShort>{JSON.stringify(tilleggsData)}</BodyShort>;
    };

    const ANNET = (props: TilleggsDataProps) => {
        const { tilleggsData } = props;
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
    } else if (verdi === 'UAVKLART') {
        return <UAVKLART tilleggsData={tilleggsData} />;
    } else if (verdi === 'ANNET') {
        return <ANNET tilleggsData={tilleggsData} />;
    }

    return null;
}

export default TilleggsData;
