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
    ekstraInnhold?: JSX.Element[];
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
        ekstraInnhold,
    } = props;

    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    if (antallSider <= 1 && !ekstraInnhold) return null;
    if (antallSider >= 2) {
        if (gjeldendeKortIndex === 0) {
            return (
                <>
                    <div>
                        <Link onClick={hoppOverIntro} href={'#'} className="tracking-wide">
                            {hoppOverLenkeTekst ?? tekst('skip')}
                        </Link>
                    </div>
                    {ekstraInnhold && ekstraInnhold[0]}
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
                    {ekstraInnhold && ekstraInnhold[0]}
                </>
            );
        }
    }
    return <>{ekstraInnhold && ekstraInnhold[0]}</>;
};

export default Fotnoter;
