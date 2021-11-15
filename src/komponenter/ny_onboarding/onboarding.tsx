/**
 * Komponent for onboarding
 *
 * Brukes ved at man sender inn et array med innhold (jsx-komponenter)
 * og så sørger denne komponenten for navigasjon gjennom listen av kort
 * header - overskriften som står øverst for hele onboardingen
 * id - brukes til logging
 * hoppOverPrestate - true = starter på kort nr 2 ellers kort 1
 * innhold - array av jsx-komponenter i den rekkefølgen du ønsker at de skal vises
 *
 */

import { useEffect, useState } from 'react';
import { Element } from 'nav-frontend-typografi';

import OnboardingFooter from './onboardingFooter';
import './onboarding.less';
import { fjernFraBrowserStorage, hentFraBrowserStorage, settIBrowserStorage } from '../../utils/browserStorage-utils';
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import { useAmplitudeData } from '../../contexts/amplitude-context';

interface OnboardingProps {
    header: string;
    id: string;
    hoppOverPreState: boolean;
    innhold: JSX.Element[];
}

const Onboarding = (props: OnboardingProps) => {
    const { header, hoppOverPreState, innhold, id } = props;

    const ONBOARDING_KEY = `onboarding_${id}`;
    const [harSettIntro, setHarSettIntro] = useState<boolean>(!!hentFraBrowserStorage(ONBOARDING_KEY));

    const startkort = harSettIntro ? (hoppOverPreState ? 1 : innhold.length - 1) : 0;
    const [gjeldendeKortIndex, setGjeldendeKortIndex] = useState(startkort);

    const amplitudeData = useAmplitudeData();

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
        setGjeldendeKortIndex(innhold.length);
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
        <div className="onboarding">
            <div className="onboarding-container">
                <div className="onboarding-header">
                    <Element tag={'h1'} className="kort-heading">
                        {header}
                    </Element>
                </div>
                <div className="onboarding-body">{innhold[gjeldendeKortIndex]}</div>
                <div className="onboarding-footer">
                    <OnboardingFooter
                        antallSider={innhold.length}
                        gjeldendeKortIndex={gjeldendeKortIndex}
                        forrigeKort={forrigeKort}
                        nesteKort={nesteKort}
                        hoppOverIntro={hoppOverIntro}
                        handleLesIntroPaaNytt={handleLesIntroPaaNytt}
                    />
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
