import { BodyShort, Link } from '@navikt/ds-react';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import React from 'react';

interface FotnoterProps {
    antallSider: number;
    gjeldendeKortIndex: number;
    hoppOverIntro: (e: React.MouseEvent) => void;
    handleLesIntroPaaNytt: (e: React.MouseEvent) => void;
    hoppOverLenkeTekst?: string;
    lesPaaNyttLenkeTekst?: string;
    EkstraInnhold?: React.ElementType;
}

const TEKSTER: Tekster<string> = {
    nb: {
        skip: 'Hopp over introduksjonen',
        vis: 'Vis introduksjon',
    },
    en: {
        skip: 'Skip the introduction',
        vis: 'Show introduction',
    },
};

const Fotnoter = (props: FotnoterProps) => {
    const {
        antallSider,
        gjeldendeKortIndex,
        hoppOverIntro,
        handleLesIntroPaaNytt,
        hoppOverLenkeTekst,
        lesPaaNyttLenkeTekst,
        EkstraInnhold,
    } = props;

    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    if (antallSider <= 1) return null;
    if (antallSider >= 2) {
        if (gjeldendeKortIndex === 0) {
            return (
                <>
                    <div>
                        <Link onClick={hoppOverIntro} href={'#'} className="tracking-wide">
                            {hoppOverLenkeTekst ?? tekst('skip')}
                        </Link>
                    </div>
                    {EkstraInnhold && <EkstraInnhold />}
                </>
            );
        }
        if (gjeldendeKortIndex === antallSider - 1) {
            return (
                <>
                    <BodyShort>
                        <Link onClick={handleLesIntroPaaNytt} href={'#'}>
                            {lesPaaNyttLenkeTekst || tekst('vis')}
                        </Link>
                    </BodyShort>
                    {EkstraInnhold && <EkstraInnhold />}
                </>
            );
        }
    }
    return <></>;
};

export default Fotnoter;
