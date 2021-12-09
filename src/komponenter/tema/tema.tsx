/**
 * Komponent for onboarding
 *
 * Brukes ved at man sender inn et array med innhold (jsx-komponenter)
 * og så sørger denne komponenten for navigasjon gjennom listen av kort
 * header - overskriften som står øverst for hele onboardingen
 * id - brukes til logging
 * hoppOverPrestate - true = starter på kort nr 2 ellers kort 1
 * hoppRettTilSluttkort - true = tvinger visning av sluttkort, selvom onbordingen ikke allerede er vist.
 * innhold - array av jsx-komponenter i den rekkefølgen du ønsker at de skal vises
 * amplitudeTemaTag - tekst som brukes for å logge ting i amplitude
 */

import { useEffect, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import TemaFooter from './tema-footer';
import { fjernFraBrowserStorage, hentFraBrowserStorage, settIBrowserStorage } from '../../utils/browserStorage-utils';
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';

import './tema.less';
interface TemaProps {
    header: string;
    id: string;
    hoppOverPreState: boolean;
    amplitudeTemaTag: string;
    innhold: JSX.Element[];
    hoppRettTilSluttkort?: boolean;
    hoppOverLenkeTekst?: string;
    lesPaaNyttLenkeTekst?: string;
}

const Tema = (props: TemaProps) => {
    const {
        header,
        hoppOverPreState,
        hoppRettTilSluttkort,
        innhold,
        id,
        hoppOverLenkeTekst,
        lesPaaNyttLenkeTekst,
        amplitudeTemaTag,
    } = props;
    const ONBOARDING_KEY = id;
    const amplitudeData = useAmplitudeData();
    const [harSettIntro, setHarSettIntro] = useState<boolean>(!!hentFraBrowserStorage(ONBOARDING_KEY));

    const registrert12UkerEllerMer = amplitudeData.ukerRegistrert >= 11;

    const startkort = harSettIntro || hoppRettTilSluttkort ? innhold.length - 1 : hoppOverPreState ? 1 : 0;
    const [gjeldendeKortIndex, setGjeldendeKortIndex] = useState(startkort);

    const forrigeKort = () => {
        amplitudeLogger('veientilarbeid.tema', {
            tilstand: 'onboarding',
            tema: amplitudeTemaTag,
            handling: `Går fra ${gjeldendeKortIndex} til ${gjeldendeKortIndex - 1}`,
            amplitudeData,
        });
        setGjeldendeKortIndex(gjeldendeKortIndex - 1);
    };

    const nesteKort = () => {
        let handling = '';
        if (gjeldendeKortIndex === 0) {
            handling = `Starter onboarding`;
        } else if (gjeldendeKortIndex + 1 === innhold.length - 1) {
            setHarSettIntro(true);
            handling = 'Fullfører';
        } else {
            handling = `Går fra ${gjeldendeKortIndex} til ${gjeldendeKortIndex + 1}`;
        }
        amplitudeLogger('veientilarbeid.tema', {
            tilstand: gjeldendeKortIndex === 0 ? 'startkort' : 'onboarding',
            tema: amplitudeTemaTag,
            handling,
            ...amplitudeData,
        });
        setGjeldendeKortIndex((gjeldendeKortIndex + 1) % (innhold.length + 1));
    };

    const hoppOverIntro = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setHarSettIntro(true);
        setGjeldendeKortIndex(innhold.length - 1);
        amplitudeLogger('veientilarbeid.tema', {
            tilstand: 'startkort',
            tema: amplitudeTemaTag,
            handling: 'Hopper over',
            ...amplitudeData,
        });
    };

    const handleLesIntroPaaNytt = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        amplitudeLogger('veientilarbeid.tema', {
            tilstand: 'sluttkort',
            tema: amplitudeTemaTag,
            handling: 'Går til onboarding',
            ...amplitudeData,
        });
        setGjeldendeKortIndex(1);
    };

    useEffect(() => {
        if (harSettIntro) {
            settIBrowserStorage(ONBOARDING_KEY, 'true');
        } else {
            fjernFraBrowserStorage(ONBOARDING_KEY);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [harSettIntro]);

    return (
        <div className={`onboarding ${gjeldendeKortIndex === 0 && innhold.length > 1 ? 'onboarding_startkort' : ''}`}>
            <ErRendret loggTekst={`Rendrer tema: ${amplitudeTemaTag}`} />
            <div className="onboarding-container">
                <div className="onboarding-header">
                    <Element tag={'h1'} className="kort-heading">
                        {header}
                    </Element>
                </div>
                <div className="onboarding-panel">
                    <div className="onboarding-body">{innhold[gjeldendeKortIndex]}</div>
                    {innhold.length > 1 && !registrert12UkerEllerMer && (
                        <div className="onboarding-footer">
                            <TemaFooter
                                antallSider={innhold.length}
                                gjeldendeKortIndex={gjeldendeKortIndex}
                                forrigeKort={forrigeKort}
                                nesteKort={nesteKort}
                                hoppOverIntro={hoppOverIntro}
                                handleLesIntroPaaNytt={handleLesIntroPaaNytt}
                                hoppOverLenkeTekst={hoppOverLenkeTekst}
                                lesPaaNyttLenkeTekst={lesPaaNyttLenkeTekst}
                            />
                        </div>
                    )}
                </div>
            </div>
            <InViewport loggTekst={`Viser tema i viewport: ${amplitudeTemaTag}`} />
        </div>
    );
};

export default Tema;
