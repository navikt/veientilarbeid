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
 *
 */

import { useEffect, useState } from 'react';
import { Element } from 'nav-frontend-typografi';
import OnboardingFooter from './onboardingFooter';
import { fjernFraBrowserStorage, hentFraBrowserStorage, settIBrowserStorage } from '../../utils/browserStorage-utils';
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';

import './onboarding.less';
interface OnboardingProps {
    header: string;
    id: string;
    hoppOverPreState: boolean;
    hoppRettTilSluttkort?: boolean;
    innhold: JSX.Element[];
    hoppOverLenkeTekst?: string;
    lesPaaNyttLnkeTekst?: string;
}

const Onboarding = (props: OnboardingProps) => {
    const { header, hoppOverPreState, hoppRettTilSluttkort, innhold, id, hoppOverLenkeTekst, lesPaaNyttLnkeTekst } =
        props;
    const ONBOARDING_KEY = id;
    const amplitudeData = useAmplitudeData();
    const featuretoggleData = useFeatureToggleData();
    const [harSettIntro, setHarSettIntro] = useState<boolean>(!!hentFraBrowserStorage(ONBOARDING_KEY));
    const startkort = harSettIntro || hoppRettTilSluttkort ? innhold.length - 1 : hoppOverPreState ? 1 : 0;
    const [gjeldendeKortIndex, setGjeldendeKortIndex] = useState(startkort);

    const stylingFeaturetoggle = featuretoggleData && featuretoggleData['veientilarbeid.vis-oppdatert-styling'];

    const forrigeKort = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: id,
            handling: `Går fra ${gjeldendeKortIndex} til ${gjeldendeKortIndex - 1}`,
            amplitudeData,
        });
        setGjeldendeKortIndex(gjeldendeKortIndex - 1);
    };

    const nesteKort = () => {
        let handling = '';
        if (gjeldendeKortIndex === 0) {
            handling = `Starter onboardingen`;
        } else if (gjeldendeKortIndex + 1 === innhold.length - 1) {
            setHarSettIntro(true);
            handling = 'Fullfører onboardingen';
        } else {
            handling = `Går fra ${gjeldendeKortIndex === 0 ? 'introkort' : gjeldendeKortIndex} til ${
                gjeldendeKortIndex + 1
            }`;
        }
        amplitudeLogger('veientilarbeid.onboarding', {
            intro: id,
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
        amplitudeLogger('veientilarbeid.onboarding', {
            intro: id,
            handling: 'Hopper over onboardingen',
            ...amplitudeData,
        });
    };

    const handleLesIntroPaaNytt = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        amplitudeLogger('veientilarbeid.onboarding', {
            intro: id,
            handling: 'Leser onboardingen på nytt',
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
        <div className={stylingFeaturetoggle ? 'ny_onboarding' : 'onboarding'}>
            <ErRendret loggTekst={`Rendrer onboarding: ${id}`} />
            <div className="onboarding-container">
                <div className="onboarding-header">
                    <Element tag={'h1'} className="kort-heading">
                        {header}
                    </Element>
                </div>
                <div className="onboarding-panel">
                    <div className="onboarding-body">{innhold[gjeldendeKortIndex]}</div>
                    {innhold.length > 1 && (
                        <div className="onboarding-footer">
                            <OnboardingFooter
                                antallSider={innhold.length}
                                gjeldendeKortIndex={gjeldendeKortIndex}
                                forrigeKort={forrigeKort}
                                nesteKort={nesteKort}
                                hoppOverIntro={hoppOverIntro}
                                handleLesIntroPaaNytt={handleLesIntroPaaNytt}
                                hoppOverLenkeTekst={hoppOverLenkeTekst}
                                lesPaaNyttLnkeTekst={lesPaaNyttLnkeTekst}
                            />
                        </div>
                    )}
                </div>
            </div>
            <InViewport loggTekst={`Viser onboarding i viewport: ${id}`} />
        </div>
    );
};

export default Onboarding;
